import { Keypair } from '@solana/web3.js';
import fs from 'mz/fs';



function sleep(seconds: number) {
    return new Promise(
        resolve => setTimeout(resolve, seconds * 1000)
    );
}


export async function createKeypairFromFile(
    filePath: string,
): Promise<Keypair> {

    return Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(
            await fs.readFile(filePath, {encoding: 'utf8'})
        ))
    );
}