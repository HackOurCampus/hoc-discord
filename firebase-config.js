require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackourcampus.firebaseio.com",
});

module.exports = admin.firestore();
