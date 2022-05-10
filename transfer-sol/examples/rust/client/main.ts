import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import {readFileSync} from "fs";
import path from 'path';

const lo = require("buffer-layout");
const BN = require("bn.js");



/**
 * Vars
 */

const SOLANA_NETWORK = "devnet";

let connection: Connection;
let programKeypair: Keypair;
let programId: PublicKey;

let ringoKeypair: Keypair;
let georgeKeypair: Keypair;
let paulKeypair: Keypair;
let johnKeypair: Keypair;



/**
 * Helper functions.
 */


function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    )
}


async function sendLamports(from: Keypair, to: PublicKey, amount: number) {

    // let amountString = amount.toString();
    // let amountSize = amountString.length;
    
    let data = Buffer.alloc(8)
    lo.ns64("value").encode(new BN(amount), data)

    let ins = new TransactionInstruction({
        keys: [
            {pubkey: from.publicKey, isSigner: true, isWritable: true},
            {pubkey: to, isSigner: false, isWritable: true},
            {pubkey: SystemProgram.programId, isSigner: false, isWritable: false},
        ],
        programId: programId,
        data: data,
    })

    await sendAndConfirmTransaction(
        connection, 
        new Transaction().add(ins), 
        [from]
    );
}



/**
 * Main
 */

async function main() {
    
    connection = new Connection(
        `https://api.${SOLANA_NETWORK}.solana.com`, 'confirmed'
    );

    programKeypair = createKeypairFromFile(
        path.join(
            path.resolve(__dirname, '../dist/program'), 
            'p2p_program-keypair.json'
        )
    );
    programId = programKeypair.publicKey;

    // Our sample members are Ringo, George, Paul & John.
    ringoKeypair = createKeypairFromFile(__dirname + "/../accounts/ringo.json");
    georgeKeypair = createKeypairFromFile(__dirname + "/../accounts/george.json");
    paulKeypair = createKeypairFromFile(__dirname + "/../accounts/paul.json");
    johnKeypair = createKeypairFromFile(__dirname + "/../accounts/john.json");
    
    // We'll start by airdropping some lamports to Paul & John.
    // await connection.confirmTransaction(
    //     await connection.requestAirdrop(
    //         paulKeypair.publicKey,
    //         LAMPORTS_PER_SOL*2,
    //     )
    // );
    // await connection.confirmTransaction(
    //     await connection.requestAirdrop(
    //         johnKeypair.publicKey,
    //         LAMPORTS_PER_SOL*2,
    //     )
    // );

    // John sends some SOL to Ringo.
    console.log("John sends some SOL to Ringo...");
    console.log(`   John public key: ${johnKeypair.publicKey}`);
    console.log(`   Ringo public key: ${ringoKeypair.publicKey}`);
    await sendLamports(johnKeypair, ringoKeypair.publicKey, 5000000);

    // Paul sends some SOL to George.
    console.log("Paul sends some SOL to George...");
    console.log(`   Paul public key: ${paulKeypair.publicKey}`);
    console.log(`   George public key: ${georgeKeypair.publicKey}`);
    await sendLamports(paulKeypair, georgeKeypair.publicKey, 4000000);

    // George sends some SOL over to John.
    console.log("George sends some SOL over to John...");
    console.log(`   George public key: ${georgeKeypair.publicKey}`);
    console.log(`   John public key: ${johnKeypair.publicKey}`);
    await sendLamports(georgeKeypair, johnKeypair.publicKey, 2000000);
}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
  );