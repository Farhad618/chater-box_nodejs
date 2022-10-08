import { user, client, tokens } from "./connection.js"

export default function CreateUser(uname, upass, utoken){
	var query = { usr_id: uname }
	user.findOne(query, function(err, result) {
    	if (err) throw err;
    	if (result) {
    		console.log("User already exist.");
    		return null;
    	} else {
    		var tokenDeleteQuery = { token: utoken };
    		  tokens.deleteOne(tokenDeleteQuery, function(err, valTok) {
    		    if (err) throw err;
    		    if (valTok.deletedCount) {
		    		var newUserObj = { usr_id: uname, pass: upass };
		    		  user.insertOne(newUserObj, function(err, res) {
		    		    if (err) throw err;
		    		    console.log("user inserted");
		    		  });
		    		return newUserObj;    		    	
    		    } else {
    		    	console.log("invalid token");
    		    	return null;
    		    }
    		  });

    	}
  	});
	// console.log(find)
}