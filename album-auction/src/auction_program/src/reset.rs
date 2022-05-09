use {
    borsh::{
        BorshDeserialize, 
        BorshSerialize
    },
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
        msg,
    },
    crate::schema::{
        Album,
        AuctionInstruction,
    },
};


pub fn reset_data(account: &AccountInfo,
    auction_instruction: AuctionInstruction) -> ProgramResult {

    /*
     * Overwrite the album account's data with the default.
     * (Reset the simulation)
     */
    
    msg!("Attempting to deserialize account data...");
    
    let mut album = Album::try_from_slice(&account.data.borrow())?;

    msg!("Account data deserialized.");

    msg!("Account data:");
    msg!("{:#?}", account.data);
    
    album = Album::match_album(
        account.key, 
        account.owner,
        &auction_instruction.local_pubkey,
    );

    msg!("Album data:");
    msg!("{:#?}", album);

    msg!("Attempting to serialize account data...");

    album.serialize(&mut &mut account.data.borrow_mut()[..])?;
    msg!("The bidding has been reset!");

    msg!("Account data after reset:");
    msg!("{:#?}", account.data);

    Ok(())
}