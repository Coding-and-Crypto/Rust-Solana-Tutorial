use {
    solana_program::{
        pubkey::Pubkey,
        entrypoint::ProgramResult,
    },
    crate::album::{
        Album,
        ALBUM_CATALOG,
    },
};


pub fn submit_bid(address: &Pubkey) -> ProgramResult {
    // Submit a bid for an album!
    Ok(())
}