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


pub fn initialize_data(address: &Pubkey) -> ProgramResult {
    // Verify the address is the PubKey of the catalog account.
    //      Only the catalog account can run this method.
    // Write the Album Catalog to the catalog account with no winners.
    //      (Reset the simulation)
    Ok(())
}