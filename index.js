import promptSync from 'prompt-sync';
const prompt = promptSync();
import validator from 'validator';
import clear from 'console-clear';
import { colours } from 'cons-colours'
import { user, client, tokens, chats } from "./connection.js"

const maker = new colours({
	type: "fg" //background/bg, font/fg 
});


// import CreateUser from "./CreateUser.js"
// import LoginUser from "./LoginUser.js"



/*LoginUser("far5", "123").then(jj => {
	console.log(jj)
})*/

function dealKoken(){
	while(true){
		let koken = prompt(maker.bright(maker.green("koken: ")) + maker.reset(), {echo: '*'});
		if (validator.isLength(koken, {min:3, max: 10})) {
			return koken;
		} else {
			console.log(maker.red("invalid koken.") + maker.reset());
		}
	}
}

function dealToken(){
	while(true){
		let token = prompt(maker.bright(maker.green("token: ")) + maker.reset(), {echo: '*'});
		if (validator.isLength(token, {min:3, max: 10})) {
			return token;
		} else {
			console.log(maker.red("invalid token.") + maker.reset());
		}
	}
}
function dealUser(){
	while(true){
		let name = prompt(maker.bright(maker.green("user: ")) + maker.reset());
		name = name.trim();
		if (validator.isLength(name, {min:3, max: 10})) {
			return name;
		} else {
			console.log(maker.red("invalid username.") + maker.reset());
		}
	}
}
function dealPassword(){
	while(true){
		// let pass = prompt("pass: ", {echo: '*'});
		let pass = prompt(maker.bright(maker.green("pass: ")) + maker.reset(), {echo: '*'});
		if (validator.isLength(pass, {min:3, max: 10})) {
			return pass;
		} else {
			console.log(maker.red("invalid password.") + maker.reset());
		}
	}
}

async function chatNow(uname, ukoken){
	let chatContent = prompt(maker.bright(maker.cyan('/> ')) + maker.reset());
	if (!validator.isEmpty(chatContent)) {
		let chatQuery = { usr_id: uname, koken: ukoken, chat: chatContent };
		await chats.insertOne(chatQuery);
		// console.log("chat inserted. " + chatContent);
	}
}

async function chatShow(ukoken){
	let chatQuery = { koken: ukoken };

	const cursor = chats.find(chatQuery);

	// console.log(cursor)

	if ((await cursor.countDocuments) === 0) {
	  console.log(maker.red("No chats found!") + maker.reset());
	}
	await cursor.forEach(result => {
		// console.log(result);
		// console.log(`[ ${result.usr_id} ]: ${result.chat}`);
		console.log(`${maker.red('[')} ${maker.yellow(result.usr_id)} ${maker.red(']')}${maker.blue(':')} ${maker.green(result.chat)} ${maker.reset()}`);
	});
}

async function afterLogin(uname, ukoken){
	let choice = "V";
	while(true){
		switch(choice.toUpperCase()){
			case "S": case "SEND":
				await chatNow(uname, ukoken); break;
			case "V": case "VIEW":
				clear();
				await chatShow(ukoken); break;

			case "SV":
				await chatNow(uname, ukoken);
				clear();
				await chatShow(ukoken); break;
			case "VS":
				clear();
				await chatShow(ukoken);
				await chatNow(uname, ukoken); break;

			case "Q": case "QUIT":
				console.log(maker.red("quit.") + maker.reset());
				await client.close();
				return 0;
			default: console.log(maker.red("not a valid command.") + maker.reset());
				
		}
		choice = prompt(maker.bright(maker.magenta('> ')) + maker.reset());
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
		console.log(maker.red("invalid credentials.") + maker.reset())
	} else {
		utoken = dealToken();
		let tokenquery = { token: utoken }
		let tokenfind = await tokens.deleteOne(tokenquery);
		if (tokenfind.deletedCount) {
			await user.insertOne(userquery);
			console.log(maker.bright(maker.green("user created.")) + maker.reset());
			ukoken = dealKoken();
			afterLogin(uname, ukoken);

		} else {
			console.log(maker.red("invalid token.") + maker.reset());
		}
	}
} else {
	console.log(maker.bright(maker.green("user loggedin.")) + maker.reset());
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
