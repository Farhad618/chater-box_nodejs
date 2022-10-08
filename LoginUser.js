// LoginUser.js
import { user, client } from "./connection.js"


const LoginUser = async (uname, upass) => {
	var query = { usr_id: uname, pass: upass }
	 user.findOne(query).then(result => {
	 	if (result) {
	 		console.log(result);
	 		return result.usr_id;
	 	} else {
	 		console.log("invalid user")
	 		return null;
	 	}
	 });
}
export default LoginUser