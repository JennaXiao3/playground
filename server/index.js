const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const admin = require('firebase-admin'); // to add
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./playground-7e100-firebase-adminsdk-7tucq-8c7f70171e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// module.exports.db = db;


const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/hello", (req, res) => {
  let myName = req.body.name;
  let myLiking = req.body.like;

  res.json({ message: "I'm " + myName + " and I like " + myLiking });
})

//creates a new user with firstName, lastName, and email
app.post('/setUsers', async function (req, res) {
  try{
    console.log(req.body);
    await db.collection("users").doc(req.body.email).set(req.body);
    res.send(req.body)
  } catch (err){
    res.send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});