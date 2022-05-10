import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
    AuctionInstructionCommand,
    ALBUM_SIZE,
} from './schema';
import {
    createKeypairFromFile,
    createAuctionInstructions,
} from './util';
import fs from 'mz/fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';



/**
 * Configs
 */
const SOLANA_NETWORK = "devnet";
const AUCTION_PROGRAM_NAME = "auction_program";

const ALBUM_ACCOUNT_SEEDS = ["beatles", "queen", "halen", "acdc"];

const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    '.config',
    'solana',
    'cli',
    'config.yml',
);
const PROGRAM_PATH = path.resolve(__dirname, '../../dist/program');

/**
 * Attributes
 */
let connection: Connection;
let localKeypair: Keypair;
let auctionProgramKeypair: Keypair;
let auctionProgramId: PublicKey;
let dataAccountKey: PublicKey;


/**
 * Setup: Connects to Solana network & loads local keypair.
 */
export async function auctionSetup() {

    console.log(`Initializing...`);
    
    connection = new Connection(
        `https://api.${SOLANA_NETWORK}.solana.com`, 'confirmed'
    );
    console.log(`Successfully connected to Solana ${SOLANA_NETWORK}.`);
    
    localKeypair = await createKeypairFromFile(
        await yaml.parse(
            await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'})
        ).keypair_path
    );
    console.log(`Successfully loaded local account:`);
    console.log(`   ${localKeypair.publicKey}`);

    // console.log(`Balance is too low in local account.`);
    // console.log(`Requesting airdrop...`);
    // await connection.confirmTransaction(
    //     await connection.requestAirdrop(
    //         localKeypair.publicKey,
    //         LAMPORTS_PER_SOL,
    //     )
    // )

    auctionProgramKeypair = await createKeypairFromFile(
        path.join(
            PROGRAM_PATH, 
            AUCTION_PROGRAM_NAME + '-keypair.json')
    );
    auctionProgramId = auctionProgramKeypair.publicKey;
}


/**
 * Resets the auction by removing any winners.
 */
async function resetAlbum(seed: string) {

    console.log(`   Resetting album with seed [\"${seed}\"] ...`);

    dataAccountKey = await PublicKey.createWithSeed(
        localKeypair.publicKey,
        seed,
        auctionProgramId,
    );

    // Make sure it doesn't exist already.
    const clientAccount = await connection.getAccountInfo(dataAccountKey);
    if (clientAccount === null) {
        const transaction = new Transaction().add(
            SystemProgram.createAccountWithSeed({
                fromPubkey: localKeypair.publicKey,
                basePubkey: localKeypair.publicKey,
                seed: seed,
                newAccountPubkey: dataAccountKey,
                lamports: LAMPORTS_PER_SOL,
                space: ALBUM_SIZE,
                programId: auctionProgramId,
            }),
        );
        await sendAndConfirmTransaction(connection, transaction, [localKeypair]);
        // await fs.writeFile(AUCTION_DATA_ACCOUNT_KEYPAIR_FILE, dataAccountKey.toString())
    }

    let resetInstructions = await createAuctionInstructions(
        AuctionInstructionCommand.RESET, localKeypair.publicKey
    )

    const instruction = new TransactionInstruction({
        keys: [{pubkey: dataAccountKey, isSigner: false, isWritable: true}],
        programId: auctionProgramId,
        data: resetInstructions,
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [localKeypair],
    );

    console.log(`   Album with seed [\"${seed}\"] reset.`);
}


export async function resetSimulation() {
    console.log("Resetting auction simulation...");
    
    for (var seed of ALBUM_ACCOUNT_SEEDS) {
        await resetAlbum(seed);
    }
    
    console.log("Simulation reset.");
}


/**
 * Simulated bidding.
 */
export async function simulateBidding() {
    
}
