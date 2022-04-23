import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import fs from 'mz/fs';
import path from 'path';


const SUM_PROGRAM_KEYPAIR_PATH = path.join(
  path.resolve(__dirname, '../../dist/program'),
  'sum-keypair.json'
);

const SQUARE_PROGRAM_KEYPAIR_PATH = path.join(
  path.resolve(__dirname, '../../dist/program'),
  'square-keypair.json'
);


export async function connect(): Promise<Connection> {
  return new Connection('https://api.devnet.solana.com', 'confirmed');
}


export async function setKeypair(connection: Connection): Promise<Keypair> {
  const clientKeypair = Keypair.generate();
  const airdropRequest = await connection.requestAirdrop(
    clientKeypair.publicKey,
    LAMPORTS_PER_SOL,
  );
  await connection.confirmTransaction(airdropRequest);
  return clientKeypair;
}


export async function pingProgram(program: string,
                          clientKeypair: Keypair,
                          connection: Connection) {
  
  let keypairPath: string;
  if (program == "sum") {
    keypairPath = SUM_PROGRAM_KEYPAIR_PATH;
  } else if (program == "square") {
    keypairPath = SQUARE_PROGRAM_KEYPAIR_PATH;
  } else {
    throw new Error("Not a valid program.");
  }
  
  const secretKeyString = await fs.readFile(keypairPath, {encoding: 'utf8'});
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const programKeypair = Keypair.fromSecretKey(secretKey);
  let programId: PublicKey = programKeypair.publicKey;

  console.log('--Pinging Program: ', program);
  console.log('--Program ID: ', programId.toBase58());

  const instruction = new TransactionInstruction({
    keys: [{pubkey: clientKeypair.publicKey, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.alloc(0),
  });

  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [clientKeypair],
  );
}
