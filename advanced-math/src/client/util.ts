import {
    Enum,
    Keypair,
} from '@solana/web3.js';
import fs from 'mz/fs';
import * as borsh from 'borsh';
import * as BufferLayout from  '@solana/buffer-layout';
import { Buffer } from 'buffer';
import { 
    CalculatorInstructions, 
    CalculatorInstructionsSchema, 
    Operation 
} from './calculator';
  
  
  
export async function createKeypairFromFile(
    filePath: string,
): Promise<Keypair> {
    const secretKeyString = await fs.readFile(filePath, {encoding: 'utf8'});
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    return Keypair.fromSecretKey(secretKey);
}


export async function createCalculatorInstructions(
    operation: number, operating_value: number): Promise<Buffer> {
    // const dataLayout = BufferLayout.struct(
    //     borsh.serialize(
    //         CalculatorInstructionsSchema,
    //         new CalculatorInstructions({
    //             operation: Operation.ADD,
    //             operating_value: operating_value,
    //         }),
    //       )
    // );
    const dataLayout: BufferLayout.Structure<any> = BufferLayout.struct(
        [
            BufferLayout.u32('operation'),
            BufferLayout.u32('operating_value'),
        ]
    );

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({
        operation: operation,
        operating_value: operating_value,
    }, data);

    return data;
}