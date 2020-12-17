//import the libraries

const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

//generating the key pairs
const david = nacl.box.keyPair();
const viktoria = nacl.box.keyPair();

function davidEncrypting(){
    const one_time_code = nacl.randomBytes(24);

    //Get the message from david
    const plain_text = "Hello there Viktoria";

    //Get the cipher text
    const cipher_text = nacl.box(
        nacl.util.decodeUTF8(plain_text),
        one_time_code,
        viktoria.publicKey,
        david.secretKey
    );

    //message to be sent to Viktoria
    const message_in_transit = {cipher_text,one_time_code};

    return message_in_transit;
};

function viktoriaDecrypting(message){
    //Get the decoded message
    let decoded_message = nacl.box.open(message.cipher_text,message.one_time_code,david.publicKey,viktoria.secretKey);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //return the plaintext
    return plain_text;
};

let ciphertext = davidEncrypting();
console.log(viktoriaDecrypting(ciphertext));