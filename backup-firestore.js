/**
 * backup-firestore.js
 * Salva tutte le collection Firestore in un file JSON locale.
 *
 * Uso:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node backup-firestore.js
 *
 * Oppure dalla cartella functions (dove firebase-admin è già installato):
 *   GOOGLE_APPLICATION_CREDENTIALS=../serviceAccount.json node ../backup-firestore.js
 */

const { initializeApp, getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp, GeoPoint, DocumentReference } = require('firebase-admin/firestore');
const fs = require('fs');

if (!getApps().length) initializeApp();
const db = getFirestore();

const ROOT_COLLECTIONS      = ['utenti', 'societa', 'configCategorie', 'configPrivacy', 'consensiPrivacy'];
const SOCIETA_SUBCOLLECTIONS = ['iscrizioni', 'avvisi', 'relazioni', 'notificheAdmin'];

function serialize(val) {
  if (val instanceof Timestamp) {
    return { _type: 'timestamp', seconds: val.seconds, nanoseconds: val.nanoseconds };
  }
  if (val instanceof GeoPoint) {
    return { _type: 'geopoint', latitude: val.latitude, longitude: val.longitude };
  }
  if (val instanceof DocumentReference) {
    return { _type: 'reference', path: val.path };
  }
  if (Array.isArray(val))            return val.map(serialize);
  if (val !== null && typeof val === 'object') {
    const out = {};
    for (const k of Object.keys(val)) out[k] = serialize(val[k]);
    return out;
  }
  return val;
}

async function backupColl(ref) {
  const snap = await ref.get();
  const out  = {};
  for (const d of snap.docs) out[d.id] = serialize(d.data());
  return out;
}

async function main() {
  console.log('Inizio backup Firestore...\n');
  const backup = {};

  for (const coll of ROOT_COLLECTIONS) {
    process.stdout.write(`  ${coll}... `);
    backup[coll] = await backupColl(db.collection(coll));
    console.log(`${Object.keys(backup[coll]).length} doc`);
  }

  backup._subcollections = {};
  const societaSnap = await db.collection('societa').get();
  for (const sDoc of societaSnap.docs) {
    const sid = sDoc.id;
    backup._subcollections[sid] = {};
    for (const sub of SOCIETA_SUBCOLLECTIONS) {
      process.stdout.write(`  societa/${sid}/${sub}... `);
      backup._subcollections[sid][sub] = await backupColl(
        db.collection('societa').doc(sid).collection(sub)
      );
      console.log(`${Object.keys(backup._subcollections[sid][sub]).length} doc`);
    }
  }

  const ts       = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `backup-${ts}.json`;
  fs.writeFileSync(filename, JSON.stringify(backup, null, 2));
  console.log(`\nBackup salvato in: ${filename}`);
}

main().catch(e => { console.error(e); process.exit(1); });
