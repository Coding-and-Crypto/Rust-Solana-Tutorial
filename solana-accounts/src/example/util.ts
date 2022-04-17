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
    await connection.confirmTransaction(airdropRequest);
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
                                      programId: PublicKey, 
                                      connection: Connection) {
  const instruction = new TransactionInstruction({
    keys: [{pubkey: keyPair.publicKey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.alloc(0),
  });
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [keyPair],
  );
}