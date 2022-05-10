import * as BufferLayout from  '@solana/buffer-layout';
import { Keypair, PublicKey } from '@solana/web3.js';
import { AuctionInstructionCommand } from './schema';
import fs from 'mz/fs';



export function sleep(seconds: number) {
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


export async function createAuctionInstructions(
    command: AuctionInstructionCommand,
    localPubkey: PublicKey): Promise<Buffer> {

    const bufferLayout: BufferLayout.Structure<any> = BufferLayout.struct(
        [
            BufferLayout.u32('command'),
            BufferLayout.u32('local_pubkey'),
        ]
    );

    const buffer = Buffer.alloc(bufferLayout.span);
    bufferLayout.encode({
        command: command,
        localPubkey: localPubkey,
    }, buffer);

    return buffer;
}