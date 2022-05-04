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
 * Auction Instruction
 */

enum AuctionInstructionCommand {
    BID,
    INIT,
}

class AuctionInstruction {
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

const AuctionInstructionSchema = new Map([
    [AuctionInstruction, {
        kind: 'struct', fields: [['command', 'enum']]
    }],
]);
  
const AUCTION_INSTRUCTION_SIZE = borsh.serialize(
    AuctionInstructionSchema,
    new AuctionInstruction(),
).length;
