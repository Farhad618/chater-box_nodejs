// printAll.js

import { user, client, tokens, chats } from '../connection.js'


user.find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
});