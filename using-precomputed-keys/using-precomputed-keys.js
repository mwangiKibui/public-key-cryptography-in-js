
//import the libraries

const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

//generating the key pairs
const david = nacl.box.keyPair();
const viktoria = nacl.box.keyPair();

function davidEncrypting(){
    //David computes a one time shared key
    const david_shared_key = nacl.box.before(viktoria.publicKey,david.secretKey);

    //David also computes a one time code.
    const one_time_code = nacl.randomBytes(24);

    //Davids message
    const plain_text = "Hey!!, our communication is now much secure";

    //Getting the cipher text
    const cipher_text = nacl.box.after(
        nacl.util.decodeUTF8(plain_text),
        one_time_code,
        david_shared_key 
    );

    //message to be transited.
    const message_in_transit = {cipher_text,one_time_code};

    return message_in_transit;
};

function viktoriaDecrypting(message){
    //Getting Viktoria's shared key
    const viktoria_shared_key = nacl.box.before(david.publicKey,viktoria.secretKey);

    //Get the decoded message
    let decoded_message = nacl.box.open.after(message.cipher_text,message.one_time_code,viktoria_shared_key);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //return the message
    return plain_text;
};

let ciphertext = davidEncrypting();
console.log(viktoriaDecrypting(ciphertext));