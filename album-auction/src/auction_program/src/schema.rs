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
    ) -> Result<Album, Error> {
        
        let ALBUM_ACCOUNT_SEEDS = HashMap::from([
            (String::from("beatles"), 
                Album {
                    id: 1, 
                    title: String::from("Abbey Road"),
                    artist: String::from("The Beatles"),
                    winner: program_id.clone(),
                }
            ),
            (String::from("queen"), 
                Album {
                    id: 2, 
                    title: String::from("News of the World"),
                    artist: String::from("Queen"),
                    winner: program_id.clone(),
                }
            ),
            (String::from("halen"),
                Album {
                    id: 3, 
                    title: String::from("Van Halen"),
                    artist: String::from("Van Halen"),
                    winner: program_id.clone(),
                }
            ),
            (String::from("acdc"),
                Album {
                    id: 4, 
                    title: String::from("Back in Black"),
                    artist: String::from("AC/DC"),
                    winner: program_id.clone(),
                }
            ),
        ]);
        
        for seed in ALBUM_ACCOUNT_SEEDS.keys() {
            if Pubkey::create_with_seed(
                local_pubkey,
                seed,
                program_id,
            )?.eq(account_key) {
                return match ALBUM_ACCOUNT_SEEDS.get(seed) {
                    Some(album) => album.clone(),
                    None => Err(ProgramError::InvalidInstructionData),
                }
            }
        }
        return Err(ProgramError::InvalidInstructionData)
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