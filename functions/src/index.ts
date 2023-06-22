/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp();

// const collection = "list";
const logger = functions.logger;
// const db = admin.firestore();


// export const list = functions.firestore
//   .document(`${collection}/{id}`)
//   .onCreate((snap, context) => {
//     const data = snap.data();
//     logger.info("New List", data)
//   })


// Saves a message to the Firebase Realtime Database but sanitizes the
// text by removing swearwords.
exports.getBrews = functions.https.onCall(
  (data, context) => {
    logger.info(data.text);
    logger.info("Hello", context);
    return context;
  });
