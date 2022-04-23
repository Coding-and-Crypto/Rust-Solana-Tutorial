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
pub struct GuestsList {
    pub guests_list: HashMap<i32, i32>, // Room #, # of people checked in
}


entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    let mut i = 0;

    for a in accounts_iter {
        i += 1;
        msg!("------- Account #{} -------", i);
        /// Public key of the account
        msg!("Key: {}", a.key);
        /// Was the transaction signed by this account's public key?
        msg!("Is Signer:{}", a.is_signer);
        /// Is the account writable?
        msg!("Is Writable: {}", a.is_writable);
        /// The lamports in the account.  Modifiable by programs.
        msg!("Lamports: {:#?}", a.lamports);
        /// The data held in this account.  Modifiable by programs.
        msg!("Data: {:#?}", a.data);
        /// Program that owns this account
        msg!("Owner (Program ID): {}", a.owner);
        /// This account's data contains a loaded program (and is now read-only)
        msg!("Is Executable: {}", a.executable);
        /// The epoch at which this account will next owe rent
        msg!("Rent Epoch: {}", a.rent_epoch);
        msg!();
    };

    Ok(())
}