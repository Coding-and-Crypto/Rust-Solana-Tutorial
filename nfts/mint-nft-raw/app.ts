import * as BufferLayout from  '@solana/buffer-layout';
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
    createKeypairFromFile,
} from './util';
import fs from 'mz/fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';


// Path to local Solana CLI config file.
const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    '.config',
    'solana',
    'cli',
    'config.yml',
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );


export async function main() {

    const testNftTitle = "Native SOL Test";
    const testNftSymbol = "NATIVE";
    const testNftUri = "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json";

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    console.log(`Successfully connected to Solana dev net.`);

    const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
    const keypairPath = await yaml.parse(configYml).keypair_path;
    const wallet = await createKeypairFromFile(keypairPath);
    console.log(`Local account loaded successfully.`);

    const programKeypair = await createKeypairFromFile(
        path.join(
            path.resolve(__dirname, './dist/program'), 
            'mint-keypair.json'
    ));
    const programId = programKeypair.publicKey;
    console.log(`Program ID: ${programId.toBase58()}`);

    // Derive the mint address and the associated token account address

    const mintKeypair: Keypair = Keypair.generate();
    const tokenAddress = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      wallet.publicKey
    );
    console.log(`New token: ${mintKeypair.publicKey}`);

    // Derive the metadata and master edition addresses

    const metadataAddress = (await PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      ))[0];
      console.log("Metadata initialized");
      const masterEditionAddress = (await PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
          Buffer.from("edition"),
        ],
        TOKEN_METADATA_PROGRAM_ID
      ))[0];
      console.log("Master edition metadata initialized");

    // Create the instruction struct

    let bufferLayout: BufferLayout.Structure<any> = BufferLayout.struct(
        [
            BufferLayout.u32('metadata_title'),
            BufferLayout.u32('metadata_symbol'),
            BufferLayout.u32('metadata_uri'),
        ]
    );
    let instructionBuffer = Buffer.alloc(bufferLayout.span);
    bufferLayout.encode({
        metadata_title: testNftTitle,
        metadata_symbol: testNftSymbol,
        metadata_uri: testNftUri,
    }, instructionBuffer);

    // Transact with our program

    const instruction = new TransactionInstruction({
        keys: [
            // Mint account
            {
                pubkey: mintKeypair.publicKey,
                isSigner: true,
                isWritable: true,
            },
            // Token account
            {
                pubkey: tokenAddress,
                isSigner: false,
                isWritable: true,
            },
            // Mint Authority
            {
                pubkey: wallet.publicKey,
                isSigner: true,
                isWritable: false,
            },
            // Rent account
            {
                pubkey: SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
            // System program
            {
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            // Token program
            {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
            // Associated token program
            {
                pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
        ],
        programId: programId,
        data: instructionBuffer,
    })
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [wallet, mintKeypair],
    )
}

main().then(
    () => process.exit(),
    err => {
      console.error(err);
      process.exit(-1);
    },
  );