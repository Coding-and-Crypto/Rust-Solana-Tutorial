import * as borsh from 'borsh';


/**
 * Album
 */
class Album {
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

const AlbumSchema = new Map([
    [Album, {
        kind: 'struct', fields: [
            ['id', 'u8'],
            ['title', 'u8'],
            ['artist', 'u8'],
            ['winner', 'u8'],
        ]
    }],
]);
  
const ALBUM_SIZE = borsh.serialize(
    AlbumSchema,
    new Album(),
).length;



/**
 * Auction
 */
 class Auction {
    catalog = [new Album()];
    constructor(
        fields: {
            catalog: Album[],
        } | undefined = undefined
    )
    {
        if (fields) {
            this.catalog = fields.catalog;
        }
    }
}

const AuctionSchema = new Map([
    [Auction, {
        kind: 'struct', fields: [
            ['catalog', 'u8'],
        ]
    }],
]);
  
export const AUCTION_SIZE = borsh.serialize(
    AuctionSchema,
    new Auction(),
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
    constructor(
        fields: {
            command: AuctionInstructionCommand,
        } | undefined = undefined
    )
    {
        if (fields) {
            this.command = fields.command;
        }
    }
}

export const AuctionInstructionSchema = new Map([
    [AuctionInstruction, {
        kind: 'struct', fields: [['command', 'u8']]
    }],
]);
  
export const AUCTION_INSTRUCTION_SIZE = borsh.serialize(
    AuctionInstructionSchema,
    new AuctionInstruction(),
).length;
