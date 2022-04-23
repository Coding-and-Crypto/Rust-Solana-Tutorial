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

    // Validate the account is owned by the program
    let account = next_account_info(&mut accounts.iter())?;
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // The room number is coming in via the instructions
    let room_number = i32::try_from_slice(&instruction_data)?;
    
    // Check in to the hotel
    let mut guests_list = GuestsList::try_from_slice(&account.data.borrow())?;
    if guests_list.guests_list.contains_key(&room_number) {
        *guests_list.guests_list.get_mut(&room_number).unwrap() += 1;
    }
    guests_list.serialize(&mut &mut account.data.borrow_mut()[..])?;
    
    msg!("Successfully checked into room: {}", room_number);
    msg!("Hotel Guests List:");
    for room in guests_list.guests_list.keys() {
        msg!("Room: {}: Guests: {:?}", room, guests_list.guests_list.get(room));
    };

    Ok(())
}