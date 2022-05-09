import { PublicKey } from '@solana/web3.js';
import * as borsh from 'borsh';


/**
 * Album
 */
export class Album {
    id = 0;
    title = "";
    artist = "";
    winner = "";
    constructor(
        fields: {
            id: number,
            title: string,
            artist: string,
            winner: string,
        } | undefined = undefined
    )
    {
        if (fields) {
            this.id = fields.id;
            this.title = fields.title;
            this.artist = fields.artist;
            this.winner = fields.winner;
        }
    }
}

export const AlbumSchema = new Map([
    [Album, {
        kind: 'struct', fields: [
            ['id', 'u32'],
            ['title', 'u32'],
            ['artist', 'u32'],
            ['winner', 'u32'],
        ]
    }],
]);
  
export const ALBUM_SIZE = borsh.serialize(
    AlbumSchema,
    new Album(),
).length;


/**
 * Auction Instruction
 */
export enum AuctionInstructionCommand {
    BID,
    RESET,
}

export class AuctionInstruction {
    command = AuctionInstructionCommand.BID;
    localPubkey = PublicKey.default;
    constructor(
        fields: {
            command: AuctionInstructionCommand,
            localPubkey: PublicKey,
        } | undefined = undefined
    )
    {
        if (fields) {
            this.command = fields.command;
            this.localPubkey = this.localPubkey;
        }
    }
}

export const AuctionInstructionSchema = new Map([
    [AuctionInstruction, {
        kind: 'struct', fields: [['command', 'u32']]
    }],
]);
  
export const AUCTION_INSTRUCTION_SIZE = borsh.serialize(
    AuctionInstructionSchema,
    new AuctionInstruction(),
).length;
