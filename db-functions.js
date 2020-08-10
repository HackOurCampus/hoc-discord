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
        // console.log(d.length);
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

const addEmail = (id, discordUsername, email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !re.test(String(email).toLowerCase())) throw new Error("IE");
  participantRef.doc(id).set({ discordUsername, email }, { merge: true });
};

// getAllData();
// addParticipantData("test1", "asdf", "dff");
addEmail("test2", "tesss", "assd@gmail.com");

module.exports = { addParticipantData, getAllData, addEmail };
