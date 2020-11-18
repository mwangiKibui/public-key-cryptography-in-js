
//import the libraries

const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

//First, generating the keys

const david = nacl.box.keyPair();
const viktoria = nacl.box.keyPair();

//coming up with shared key
const david_shared_key = nacl.box.before(viktoria.publicKey,david.secretKey);

//Encryption nonce

const nonce = nacl.randomBytes(24);

// Message from David

const message = `Hello Viktoria`;

// Encrypting the message

const cipher_text = nacl.box.after(
    nacl.util.decodeUTF8(message),//decoded message
    nonce,
    david_shared_key
);

let message_in_transit = {cipher_text,one_time_code:nonce}

//decrypting the message

//viktoria to also get a shared key
let viktoria_shared_key = nacl.box.before(david.publicKey,viktoria.secretKey);

//Get the decoded message. Uint8Array
let decoded_message = nacl.box.open.after(message_in_transit.cipher_text,message_in_transit.one_time_code,viktoria_shared_key);

//Get the human readable message
let plain_text = nacl.util.encodeUTF8(decoded_message)

//log the message
console.log(`Encoded message`,cipher_text);
console.log('Plain text',plain_text); 