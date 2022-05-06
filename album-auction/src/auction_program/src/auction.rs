use {
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
        pubkey::Pubkey,
    },
    crate::catalog::{
        Album,
    },
};


pub fn submit_bid(account: &AccountInfo) -> ProgramResult {
    
    // Submit a bid for an album!
    
    Ok(())
}