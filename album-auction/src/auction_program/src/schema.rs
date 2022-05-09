use {
    borsh::{
        BorshDeserialize,
        BorshSerialize
    },
    solana_program::{
        pubkey::Pubkey,
        program_error::ProgramError,
    },
    std::collections::HashMap,
};


pub const ALBUM_ACCOUNT_SEEDS: [&'static str; 4] = [
    "beatles", "queen", "halen", "acdc"
];


/*
 * Album
 */
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Album {
    pub id: u8,
    pub title: String,
    pub artist: String,
    pub winner: Pubkey,
}


impl Album {

    pub fn match_album(
        account_key: &Pubkey, 
        program_id: &Pubkey,
        local_pubkey: &Pubkey,
    ) -> Result<Album, ProgramError> {
        
        for seed in ALBUM_ACCOUNT_SEEDS.iter() {
            if Pubkey::create_with_seed(
                local_pubkey,
                seed,
                program_id,
            )?.eq(account_key) {
                return Album::get_album_from_seed(seed, *program_id)
            }
        }
        return Err(ProgramError::InvalidInstructionData)
    }


    pub fn get_album_from_seed(
        seed: &str, 
        program_id: Pubkey
    ) -> Result<Album, ProgramError> {
        
        match seed {
            "beatles" => {
                Ok(Album {
                    id: 1, 
                    title: String::from("Abbey Road"),
                    artist: String::from("The Beatles"),
                    winner: program_id,
                })
            },
            "queen" => {
                Ok(Album {
                    id: 2, 
                    title: String::from("News of the World"),
                    artist: String::from("Queen"),
                    winner: program_id,
                })
            },
            "halen" => {
                Ok(Album {
                    id: 3, 
                    title: String::from("Van Halen"),
                    artist: String::from("Van Halen"),
                    winner: program_id,
                })
            },
            "acdc" => {
                Ok(Album {
                    id: 4, 
                    title: String::from("Back in Black"),
                    artist: String::from("AC/DC"),
                    winner: program_id,
                })
            },
            _ => Err(ProgramError::InvalidInstructionData),
        }
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
    pub local_pubkey: Pubkey,
}