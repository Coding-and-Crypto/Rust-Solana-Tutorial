import * as borsh from 'borsh';


/**
 * Album
 */
class Album {
    id: number;
    title: string;
    artist: string;
    winner: string;
    constructor(
        fields: {
            id: number,
            title: string,
            artist: string,
            winner: string,
        } | undefined = undefined
    )
    {
        this.id = fields.id;
        this.title = fields.title;
        this.artist = fields.artist;
        this.winner = fields.winner;
    }
}

const AlbumSchema = new Map([
    [Album, {
        kind: 'struct', fields: [
            ['id', 'u8'],
            ['title', 'string'],
            ['artist', 'string'],
            ['winner', 'string'],
        ]
    }],
]);
  
const ALBUM_SIZE = borsh.serialize(
    AlbumSchema,
    new Album(),
).length;



/**
 * Album
 */
 class Auction {
    catalog: Album[];
    constructor(
        fields: {
            catalog: Album[],
        } | undefined = undefined
    )
    {
        this.catalog = fields.catalog;
    }
}

const AuctionSchema = new Map([
    [Auction, {
        kind: 'struct', fields: [
            ['catalog', 'Vec<Album>'],
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
    INIT,
}

export class AuctionInstruction {
    command: AuctionInstructionCommand;
    constructor(
        fields: {
            command: AuctionInstructionCommand,
        } | undefined = undefined
    )
    {
        this.command = fields.command;
    }
}

export const AuctionInstructionSchema = new Map([
    [AuctionInstruction, {
        kind: 'struct', fields: [['command', 'enum']]
    }],
]);
  
export const AUCTION_INSTRUCTION_SIZE = borsh.serialize(
    AuctionInstructionSchema,
    new AuctionInstruction(),
).length;
