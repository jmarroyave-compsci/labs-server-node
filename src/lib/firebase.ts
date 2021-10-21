import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const add = function() {
  admin.initializeApp(functions.config().firebase);
  const db = admin.firestore();
  const collection = "guests"

  const guest = {
   n 
  }

  const newDoc = await db.collection(collection).add(guest);
}
