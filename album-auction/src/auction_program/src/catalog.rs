use {
    borsh::{
        BorshDeserialize,
        BorshSerialize
    },
    solana_program::pubkey::Pubkey,
};


/*
 * Album
 */
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Album {
    pub id: u8,
    pub title: String,
    pub artist: String,
    pub winner: Option<Pubkey>,
}


/*
 * Auction
 */
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Auction {
    pub catalog: Vec<Album>,
}

impl Auction {
    pub fn new(catalog: Vec<Album>) -> Auction {
        Auction {
            catalog,
        }
    }
    
    pub fn reset_catalog() -> Auction {
        Auction::new(
            vec![
                Album {
                    id: 1, 
                    title: String::from("Abbey Road"),
                    artist: String::from("The Beatles"),
                    winner: None,
                },
                Album {
                    id: 2, 
                    title: String::from("News of the World"),
                    artist: String::from("Queen"),
                    winner: None,
                },
                Album {
                    id: 3, 
                    title: String::from("Van Halen"),
                    artist: String::from("Van Halen"),
                    winner: None,
                },
                Album {
                    id: 4, 
                    title: String::from("Back in Black"),
                    artist: String::from("AC/DC"),
                    winner: None,
                },
            ]
        )
    }
}


/**
 * Auction Instruction
 */
 #[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum AuctionInstructionCommand {
    BID,
    RESET,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct AuctionInstruction {
    pub command: AuctionInstructionCommand,
}