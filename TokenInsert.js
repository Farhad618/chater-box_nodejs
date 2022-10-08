// TokenInsert.js
import { tokens } from "./connection.js"

var newTokenObj = { token: "123456789" };
  tokens.insertOne(newTokenObj, function(err, res) {
    if (err) throw err;
    console.log("token inserted");
  });
