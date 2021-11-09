//Hd wallet as specified by BIP-39 and BIP-32
const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')
const bip39 = require('bip39')
const fs = require('fs')
// which bitcoin network to use , regtest here 
const network = bitcoin.networks.regtest

//derivation paths contains information about key structure as well what child level there is 
const path = 'm/44\'/1\'/0\'/0'

let mnemonicWords = bip39.generateMnemonic()
 
let seed = bip39.mnemonicToSeedSync(mnemonicWords)
 

let root = bip32.fromSeed(seed,network)
 
let account = root.derivePath(path)
 
let node = account.derive(1).derive(0)
  

let address = bitcoin.payments.p2pkh({
    pubkey:node.publicKey,
    network:network
}).address

 

let fullWallet ={
    mnemonic: mnemonicWords,
    seed:seed.toString('hex'),
    pubkey:node.publicKey.toString('hex'),
    address:address
    

}
// write seed and mnemonic to a file as well as other info to a file 
fullWallet = JSON.stringify(fullWallet)
fs.writeFile("wallet.json",fullWallet,(err)=>{
    if(err){
        console.log(err)
    }
})

//TODO 
//Restore wallet from mnemonic code word
// const RestorWallet=(mnemonic)=>{}