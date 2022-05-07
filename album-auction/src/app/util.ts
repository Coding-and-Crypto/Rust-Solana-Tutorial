import * as BufferLayout from  '@solana/buffer-layout';
import { Keypair } from '@solana/web3.js';
import {
    AUCTION_INSTRUCTION_SIZE,
    AuctionInstruction,
    AuctionInstructionCommand,
    AuctionInstructionSchema,
} from './schema';
import fs from 'mz/fs';


export const DATA_ACCOUNT_SEED: string = "data";
export const DATA_ACCOUNT_KEYPAIR_FILE: string = "data/data-account-keypair.json";


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


export async function createAuctionInstructions(
    command: AuctionInstructionCommand): Promise<Buffer> {

    const bufferLayout: BufferLayout.Structure<any> = BufferLayout.struct(
        [
            BufferLayout.u8('command'),
        ]
    );

    const buffer = Buffer.alloc(bufferLayout.span);
    bufferLayout.encode({
        command: command,
    }, buffer);

    return buffer;
}