use {
    borsh::BorshSerialize,
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
        pubkey::Pubkey,
        program_error::ProgramError,
        msg,
    },
    solana_sdk::signature::{
        Keypair,
        Signer,
    },
    crate::catalog::{
        Auction,
    },
    // crate::util::{
    //     DATA_ACCOUNT_SEED,
    //     get_local_keypair,
    //     get_data_account_key,
    // },
};


pub const DATA_ACCOUNT_SEED: &'static str = "data";


pub fn reset_data(account: &AccountInfo) -> ProgramResult {

    /*
     * Verify the address is the PubKey of the catalog account.
     * Only the catalog account can run this function.
     */
    let data_account_pubkey = Pubkey::create_with_seed(
        &get_local_keypair().pubkey(), 
        &DATA_ACCOUNT_SEED, 
        &get_data_account_key()
    )?;
    if account.key.eq(&data_account_pubkey) {
        msg!("Passed account's key does not match the data account's key!");
        return Err(ProgramError::IllegalOwner);
    };

    /*
     * Overwrite the catalog account's data with the default Auction Catalog.
     * (Reset the simulation)
     */
    let catalog = Auction::reset_catalog();

    catalog.serialize(&mut &mut account.data.borrow_mut()[..])?;
    msg!("The bidding has been reset!");

    Ok(())
}