import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import { readFileSync } from "fs";
import path from 'path';

const lo = require("buffer-layout");



/**
 * Vars
 */

const SOLANA_NETWORK = "devnet";
let connection: Connection;

let mintProgramKeypair: Keypair;
let transferProgramKeypair: Keypair;

let ringoKeypair: Keypair;
let georgeKeypair: Keypair;
let paulKeypair: Keypair;
let johnKeypair: Keypair;

let highestBidder: {
    publicKey: PublicKey,
    name: string,
    bid: number,
}



/**
 * Helper functions.
 */

function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    )
}


async function sleep(seconds: number) {
    await new Promise( resolve => setTimeout(resolve, seconds * 1000) );
}


async function processBid(publicKey: PublicKey, name: string, bid: number) {
    console.log(`   ${name} bids ${bid} lamports!`);
    if (highestBidder === null) {
        highestBidder = {
            publicKey: publicKey,
            name: name,
            bid: bid,
        };
    } else {
        if (bid > highestBidder.bid) {
            highestBidder = {
                publicKey: publicKey,
                name: name,
                bid: bid,
            };
            console.log("   New highest bidder!");
        };
    };
    console.log(`       Current highest bidder: ${highestBidder.name}`);
}


async function mintNft(minter: Keypair) {

    let ins = new TransactionInstruction({
        keys: [
            {pubkey: minter.publicKey, isSigner: false, isWritable: true},
            {pubkey: SystemProgram.programId, isSigner: false, isWritable: false},
        ],
        programId: mintProgramKeypair.publicKey,
        data: Buffer.alloc(0),
    })

    await sendAndConfirmTransaction(
        connection, 
        new Transaction().add(ins), 
        [minter]
    );
}


async function transferNft(owner: Keypair, purchaser: PublicKey, purchaseAmount: number) {
    
    let data = Buffer.alloc(8)
    lo.ns64("value").encode(purchaseAmount, data);

    let ins = new TransactionInstruction({
        keys: [
            {pubkey: owner.publicKey, isSigner: true, isWritable: true},
            {pubkey: purchaser, isSigner: false, isWritable: true},
            {pubkey: SystemProgram.programId, isSigner: false, isWritable: false},
        ],
        programId: transferProgramKeypair.publicKey,
        data: data,
    })

    await sendAndConfirmTransaction(
        connection, 
        new Transaction().add(ins), 
        [owner]
    );
}



/**
 * Main
 */

async function main() {
    
    connection = new Connection(
        `https://api.${SOLANA_NETWORK}.solana.com`, 'confirmed'
    );
    mintProgramKeypair = createKeypairFromFile(
        path.join(
            path.resolve(__dirname, '../_programs'), 
            'minter-keypair.json'
        )
    );
    // transferProgramKeypair = createKeypairFromFile(
    //     path.join(
    //         path.resolve(__dirname, '../_programs'), 
    //         'transfer-keypair.json'
    //     )
    // );

    ringoKeypair = createKeypairFromFile(__dirname + "/../_accounts/ringo.json");
    georgeKeypair = createKeypairFromFile(__dirname + "/../_accounts/george.json");
    paulKeypair = createKeypairFromFile(__dirname + "/../_accounts/paul.json");
    // johnKeypair = createKeypairFromFile(__dirname + "/../_accounts/john.json");
    johnKeypair = createKeypairFromFile(__dirname + "/../_accounts/test.json");

    console.log("Application initialized.");
    sleep(2);

    // John mints an NFT.
    console.log("John has requested to mint an NFT...");
    console.log(`   John's public key: ${johnKeypair.publicKey}`);
    await mintNft(johnKeypair);
    sleep(5);

    // Bidding begins
    console.log("Bidding has now opened for John's NFT!");
    sleep(2);

    processBid(ringoKeypair.publicKey, "Ringo", 10000000);
    sleep(1);
    processBid(georgeKeypair.publicKey, "George", 20000000);
    sleep(1);
    processBid(ringoKeypair.publicKey, "Ringo", 40000000);
    sleep(1);
    processBid(paulKeypair.publicKey, "Paul", 70000000);
    sleep(1);
    processBid(georgeKeypair.publicKey, "George", 90000000);
    sleep(1);

    console.log("Bidding has closed for John's NFT.");
    console.log(
        `The highest bidder is ${highestBidder.name} at ${highestBidder.bid} lamports.`
    );
    sleep(2);
    console.log(`Processing transfer of John's NFT to ${highestBidder.name}...`);
    // await transferNft(johnKeypair, highestBidder.publicKey, highestBidder.bid);
    console.log("Success.");
    console.log(`   Enjoy your new NFT, ${highestBidder.name}!`);
}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);