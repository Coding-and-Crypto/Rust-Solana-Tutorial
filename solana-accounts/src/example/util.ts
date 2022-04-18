import {
    Keypair,
    PublicKey,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    TransactionInstruction,
    Transaction,
    Connection,
  } from '@solana/web3.js';
import fs from 'mz/fs';
import path from 'path';



export async function airdrop(publicKey: PublicKey, 
                              amount_in_sol: number, 
                              connection: Connection) {
    const airdropRequest = await connection.requestAirdrop(
      publicKey,
      amount_in_sol * LAMPORTS_PER_SOL,
    );
    return connection.confirmTransaction(airdropRequest);
  }
  
  
export async function get_hotel_program_id(program: string): Promise<PublicKey> {
    const PROGRAM_KEYPAIR_PATH = path.join(
        path.resolve(__dirname, '../../dist/program'),
        program + '-keypair.json'
    );
    const secretKeyString = await fs.readFile(PROGRAM_KEYPAIR_PATH, {encoding: 'utf8'});
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const programKeypair = Keypair.fromSecretKey(secretKey);
    return programKeypair.publicKey;
}


export async function execute_program(keyPair: Keypair, 
                                      instruction: TransactionInstruction,
                                      connection: Connection) {
    return sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [keyPair],
    );
}


export async function get_guests_list(keyPair: Keypair, 
                                      programId: PublicKey,
                                      connection: Connection) {
    console.log("Sending transaction to Guests List Report program (id: {})", programId);
    console.log("   to view the Guests List...");
    let instruction = new TransactionInstruction({
        keys: [{pubkey: keyPair.publicKey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.alloc(0), // Not used.
    });
    execute_program(keyPair, instruction, connection);
}


export async function run_check_in_simulation(keyPair: Keypair, 
                                              programId: PublicKey, 
                                              connection: Connection) {
    
    console.log("Sending multiple transactions to Check-in program (id: {})", programId);
    console.log("   to simulate people checking in...");
    
    const numberOfSimulations = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    const roomNumber = Math.floor(Math.random() * (106 - 100 + 1) + 100);

    let instruction = new TransactionInstruction({
        keys: [{pubkey: keyPair.publicKey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.alloc(roomNumber),
    });

    for (let i = 0; i < numberOfSimulations; i++) {
        // TODO: Pass instructions
        execute_program(keyPair, instruction, connection);
    }
    console.log("Success");
}