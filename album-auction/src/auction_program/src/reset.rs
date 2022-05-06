use {
    borsh::BorshSerialize,
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
        msg,
    },
    crate::catalog::{
        Auction,
    },
};


pub fn reset_data(account: &AccountInfo) -> ProgramResult {

    /*
     * Overwrite the catalog account's data with the default Auction Catalog.
     * (Reset the simulation)
     */
    let catalog = Auction::reset_catalog();

    catalog.serialize(&mut &mut account.data.borrow_mut()[..])?;
    msg!("The bidding has been reset!");

    Ok(())
}