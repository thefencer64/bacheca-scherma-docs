/**
 * restore-firestore.js
 * Ripristina i dati Firestore da un file JSON generato da backup-firestore.js.
 * ATTENZIONE: sovrascrive i documenti esistenti con gli stessi ID.
 *
 * Uso:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node restore-firestore.js backup-2026-06-05T10-00-00.json
 */

const { initializeApp, getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp, GeoPoint } = require('firebase-admin/firestore');
const fs = require('fs');

if (!getApps().length) initializeApp();
const db = getFirestore();

const SOCIETA_SUBCOLLECTIONS = ['iscrizioni', 'avvisi', 'relazioni', 'notificheAdmin'];

function deserialize(val) {
  if (val === null || val === undefined) return val;
  if (typeof val === 'object' && val._type === 'timestamp') {
    return new Timestamp(val.seconds, val.nanoseconds);
  }
  if (typeof val === 'object' && val._type === 'geopoint') {
    return new GeoPoint(val.latitude, val.longitude);
  }
  if (typeof val === 'object' && val._type === 'reference') {
    return db.doc(val.path);
  }
  if (Array.isArray(val))            return val.map(deserialize);
  if (typeof val === 'object') {
    const out = {};
    for (const k of Object.keys(val)) out[k] = deserialize(val[k]);
    return out;
  }
  return val;
}

async function restoreColl(ref, docs) {
  const entries = Object.entries(docs);
  if (entries.length === 0) return 0;
  const CHUNK = 400;
  let count   = 0;
  for (let i = 0; i < entries.length; i += CHUNK) {
    const batch = db.batch();
    for (const [id, data] of entries.slice(i, i + CHUNK)) {
      batch.set(ref.doc(id), deserialize(data));
      count++;
    }
    await batch.commit();
  }
  return count;
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Uso: node restore-firestore.js <file-backup.json>');
    process.exit(1);
  }
  if (!fs.existsSync(file)) {
    console.error(`File non trovato: ${file}`);
    process.exit(1);
  }

  console.log(`Ripristino da: ${file}\n`);
  const backup = JSON.parse(fs.readFileSync(file, 'utf8'));

  const ROOT_COLLECTIONS = ['utenti', 'societa', 'configCategorie', 'configPrivacy', 'consensiPrivacy'];

  for (const coll of ROOT_COLLECTIONS) {
    if (!backup[coll]) continue;
    process.stdout.write(`  ${coll}... `);
    const n = await restoreColl(db.collection(coll), backup[coll]);
    console.log(`${n} doc`);
  }

  if (backup._subcollections) {
    for (const [sid, subs] of Object.entries(backup._subcollections)) {
      for (const sub of SOCIETA_SUBCOLLECTIONS) {
        if (!subs[sub]) continue;
        process.stdout.write(`  societa/${sid}/${sub}... `);
        const n = await restoreColl(
          db.collection('societa').doc(sid).collection(sub),
          subs[sub]
        );
        console.log(`${n} doc`);
      }
    }
  }

  console.log('\nRipristino completato.');
}

main().catch(e => { console.error(e); process.exit(1); });
