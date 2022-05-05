use {
    borsh::BorshSerialize,
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
        pubkey::Pubkey,
        msg,
    },
    crate::album::{
        Auction,
    },
};


pub fn reset_data(account: &AccountInfo) -> ProgramResult {

    /*
     * Verify the address is the PubKey of the catalog account.
     * Only the catalog account can run this function.
     */
    Pubkey::create_with_seed(base: &Pubkey, seed: &str, owner: &Pubkey);

    /*
     * Overwrite the catalog account's data with the default Auction Catalog.
     * (Reset the simulation)
     */
    let catalog = Auction::reset_catalog();

    catalog.serialize(&mut &mut account.data.borrow_mut()[..])?;
    msg!("The bidding has been reset!");

    Ok(())
}