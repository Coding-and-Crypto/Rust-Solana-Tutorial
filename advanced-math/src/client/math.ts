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
    createKeypairFromFile,
} from './util';
import {
    SumInstruction,
    SumInstructionSchema,
} from './sum';
import {
    SquareInstruction,
    SquareInstructionSchema,
} from './square';
import borsh from 'borsh';
import fs from 'mz/fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';



/*
Path to Solana CLI config file.
*/
const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    '.config',
    'solana',
    'cli',
    'config.yml',
);


let connection: Connection;
let localKeypair: Keypair;
let programKeypair: Keypair;
let programId: PublicKey;
let clientPubKey: PublicKey;


const PROGRAM_PATH = path.resolve(__dirname, '../../dist/program');


/*
Connect to dev net.
*/
export async function connect() {
    connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    console.log(`Successfully connected to Solana dev net.`);
}


/*
Use local keypair for client.
*/
export async function getLocalAccount() {
    const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
    const keypairPath = await yaml.parse(configYml).keypair_path;
    localKeypair = await createKeypairFromFile(keypairPath);
    // const airdropRequest = await connection.requestAirdrop(
    //     localKeypair.publicKey,
    //     LAMPORTS_PER_SOL*2,
    // );
    // await connection.confirmTransaction(airdropRequest);

    console.log(`Local account loaded successfully.`);
    console.log(`Local account's address is:`);
    console.log(`   ${localKeypair.publicKey}`);
}


/*
Get the targeted program.
*/
export async function getProgram(programName: string) {
    programKeypair = await createKeypairFromFile(
        path.join(PROGRAM_PATH, programName + '-keypair.json')
    );
    programId = programKeypair.publicKey;

    console.log(`We're going to ping the ${programName} program.`);
    console.log(`It's Program ID is:`);
    console.log(`   ${programId.toBase58()}`)
}


/*
Configure client account.
*/
export async function configureClientAccount(accountSpaceSize: number) {
    const SEED = 'test1';
    clientPubKey = await PublicKey.createWithSeed(
        localKeypair.publicKey,
        SEED,
        programId,
    );

    console.log(`For simplicity's sake, we've created an address using a seed.`);
    console.log(`That seed is just the string "test(num)".`);
    console.log(`The generated address is:`);
    console.log(`   ${clientPubKey.toBase58()}`);

    // Make sure it doesn't exist already.
    const clientAccount = await connection.getAccountInfo(clientPubKey);
    if (clientAccount === null) {

        console.log(`Looks like that account does not exist. Let's create it.`);

        const transaction = new Transaction().add(
            SystemProgram.createAccountWithSeed({
                fromPubkey: localKeypair.publicKey,
                basePubkey: localKeypair.publicKey,
                seed: SEED,
                newAccountPubkey: clientPubKey,
                lamports: LAMPORTS_PER_SOL,
                space: accountSpaceSize,
                programId,
            }),
        );
        await sendAndConfirmTransaction(connection, transaction, [localKeypair]);

        console.log(`Client account created successfully.`);
    } else {
        console.log(`Looks like that account exists already. We can just use it.`);
    }
}


// --------------------------------------------------------


/*
Execute the sum program.
*/
export async function executeSum(sumInstruction: SumInstruction) {
    console.log(`All right, let's run it.`);
    console.log(`Pinging sum program with instructions!! ...`);

    const instruction = new TransactionInstruction({
        keys: [{pubkey: clientPubKey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.alloc(borsh.serialize(SumInstructionSchema, sumInstruction).length),
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [localKeypair],
    );

    console.log(`Ping successful.`);
}


/*
Execute the square program.
*/
export async function executeSquare(squareInstruction: SquareInstruction) {
    console.log(`All right, let's run it.`);
    console.log(`Pinging square program with instructions!! ...`);

    const instruction = new TransactionInstruction({
        keys: [{pubkey: clientPubKey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.alloc(borsh.serialize(SquareInstructionSchema, squareInstruction).length),
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [localKeypair],
    );

    console.log(`Ping successful.`);
}


// --------------------------------------------------------


/*
Run the example (main).
*/
export async function example(programName: string, accountSpaceSize: number) {
    await connect();
    await getLocalAccount();
    await getProgram(programName);
    await configureClientAccount(accountSpaceSize);
    if (programName == 'sum') {
        await executeSum(new SumInstruction({adder: 1}));
        await executeSum(new SumInstruction({adder: 5}));
        await executeSum(new SumInstruction({adder: 3}));
    } else if (programName == 'square') {
        await executeSquare(new SquareInstruction({power: 2}));
        await executeSquare(new SquareInstruction({power: 3}));
    } else {
        console.log(`Program: \"${programName}\" not found!`)
    };
}