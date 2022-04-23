use {
    borsh::{
        BorshDeserialize, 
        BorshSerialize,
    },
    solana_program::{
        account_info::{next_account_info, AccountInfo}, 
        entrypoint, 
        entrypoint::ProgramResult, 
        msg, 
        program_error::ProgramError, 
        pubkey::Pubkey,
    },
    std::collections::HashMap,
};


// This represents the state the account will store
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GuestsListReport {
    // pub guests_list: HashMap<i32, i32>, // Room #, # of people checked in
    pub test_num: i32,
}


entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {


    msg!("------- Raw Parameters -------");
    /// Program ID
    msg!("Program ID: {}", program_id);
    /// Accounts
    msg!("Accounts: {:#?}", accounts);
    /// Data
    msg!("Data: {:#?}", instruction_data);
    /// Data Deserialized
    msg!("Data: {:#?}", std::str::from_utf8(instruction_data).unwrap());


    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iter)?;

    msg!("------- Account Information -------");
    /// Public key of the account
    msg!("Key: {}", account.key);
    /// Was the transaction signed by this account's public key?
    msg!("Is Signer:{}", account.is_signer);
    /// Is the account writable?
    msg!("Is Writable: {}", account.is_writable);
    /// The lamports in the account.  Modifiable by programs.
    msg!("Lamports: {:#?}", account.lamports);
    /// The data held in this account.  Modifiable by programs.
    msg!("Data: {:#?}", account.data);
    /// Program that owns this account
    msg!("Owner (Program ID): {}", account.owner);
    /// This account's data contains a loaded program (and is now read-only)
    msg!("Is Executable: {}", account.executable);
    /// The epoch at which this account will next owe rent
    msg!("Rent Epoch: {}", account.rent_epoch);


    // let mut guests_list_report = GuestsListReport::try_from_slice(&account.data.borrow())?;
    // guests_list_report.guests_list.push(a, b) // Add guests to the list based on instruction data
    // guests_list_report.serialize(&mut &mut account.data.borrow_mut()[..])?;

    // msg!("Guests List: {:#?}", guests_list_report.guests_list);

    Ok(())
}