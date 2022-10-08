import promptSync from 'prompt-sync';
const prompt = promptSync();
import validator from 'validator';
import clear from 'console-clear';
import { user, client, tokens, chats } from "./connection.js"
// import CreateUser from "./CreateUser.js"
// import LoginUser from "./LoginUser.js"



/*LoginUser("far5", "123").then(jj => {
	console.log(jj)
})*/

function dealKoken(){
	while(true){
		let koken = prompt("koken: ", {echo: '*'});
		if (validator.isLength(koken, {min:3, max: 10})) {
			return koken;
		} else {
			console.log("invalid koken.");
		}
	}
}

function dealToken(){
	while(true){
		let token = prompt("token: ", {echo: '*'});
		if (validator.isLength(token, {min:3, max: 10})) {
			return token;
		} else {
			console.log("invalid koken.");
		}
	}
}
function dealUser(){
	while(true){
		let name = prompt("user: ");
		name = name.trim();
		if (validator.isLength(name, {min:3, max: 10})) {
			return name;
		} else {
			console.log("invalid username.");
		}
	}
}
function dealPassword(){
	while(true){
		let pass = prompt("pass: ", {echo: '*'});
		if (validator.isLength(pass, {min:3, max: 10})) {
			return pass;
		} else {
			console.log("invalid password.");
		}
	}
}

async function chatNow(uname, ukoken){
	let chatContent = prompt('/> ');
	if (!validator.isEmpty(chatContent)) {
		let chatQuery = { usr_id: uname, koken: ukoken, chat: chatContent };
		await chats.insertOne(chatQuery);
		// console.log("chat inserted. " + chatContent);
	}
}

async function chatShow(ukoken){
	let chatQuery = { koken: ukoken };

	const cursor = chats.find(chatQuery);

	if ((await cursor.countDocuments) === 0) {
	  console.log("No documents found!");
	}
	await cursor.forEach(result => {
		// console.log(result);
		console.log(`[ ${result.usr_id} ]: ${result.chat}`);
	});
}

async function afterLogin(uname, ukoken){
	while(true){
		let choice = prompt('> ');
		switch(choice.toUpperCase()){
			case "S": case "SEND":
				await chatNow(uname, ukoken); break;
			case "V": case "VIEW":
				clear();
				await chatShow(ukoken); break;
			case "Q": case "QUIT":
				console.log("quit.");
				await client.close();
				return 0;
			default: console.log("not a valid command.");
				
		}
	}
}

var uname = dealUser();
// var uname = "far";
var upass = dealPassword();
// var upass = "123";
var utoken = null;
var ukoken = null;

var userquery = { usr_id: uname, pass: upass };
var loginFind = await user.findOne(userquery);

if (!loginFind) {
	var Createquery = { usr_id: uname };
	var createFind = await user.findOne(Createquery);
	if (createFind) {
		console.log("invalid credentials")
	} else {
		utoken = dealToken();
		let tokenquery = { token: utoken }
		let tokenfind = await tokens.deleteOne(tokenquery);
		if (tokenfind.deletedCount) {
			await user.insertOne(userquery);
			console.log("user created");
			ukoken = dealKoken();

		} else {
			console.log("invalid token");
		}
	}
} else {
	console.log("user loggedin");
	ukoken = dealKoken();
	// ukoken = "123456789";

	// chatShow(ukoken);
	// chatNow(uname, ukoken);
	afterLogin(uname, ukoken);

}
	// afterLogin(uname, ukoken);

	/*while(true){
		let choice = prompt('> ');
		switch(choice.toUpperCase()){
			case "S": case "SEND":
				chatNow(unameg, ukokeng); break;
			case "V": case "VIEW":
				// chatShow(ukoken); break;
				chats.find({}).toArray(function(err, result) {
				    if (err) throw err;
				    console.log(result);
				    // db.close();
				  });
				break;
		}
	}*/
