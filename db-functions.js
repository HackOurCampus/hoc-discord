const db = require("./firebase-config");
const admin = require("firebase-admin");

const participantRef = db.collection("participants");

const addParticipantData = (discordId, discordUsername, githubId) => {
  return new Promise((resolve, reject) => {
    participantRef
      .doc(discordId)
      .set(
        {
          discordUsername,
          githubId,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => resolve(true))
      .catch((err) => {
        console.log(err);
        reject(
          new Error(
            "Something went wrong when updating your entries on the database."
          )
        );
      });
  });
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    participantRef
      .get()
      .then((querySnapshot) => {
        const d = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        //console.log(d)
        //console.log(d.length);
        resolve(d);
      })
      .catch((err) => {
        console.log(err);
        reject(
          new Error(
            "Something went wrong when fetching entries from the database."
          )
        );
      });
  });
};

//getAllData();
// addParticipantData("test1", "asdf", "dff");

module.exports = { addParticipantData, getAllData };
