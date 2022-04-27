use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo}, 
    entrypoint, 
    entrypoint::ProgramResult, 
    msg, 
    program_error::ProgramError,
    pubkey::Pubkey,
};



#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MathStuffSum {
    pub sum: u32,
}


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct SumInstruction {
    pub adder: u32,
}


entrypoint!(process_instruction);


fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut math_stuff = MathStuffSum::try_from_slice(&account.data.borrow())?;
    let sum_instruction = SumInstruction::try_from_slice(&instruction_data)?;

    msg!("Adding {} to {}...", math_stuff.sum, sum_instruction.adder);

    math_stuff.sum += sum_instruction.adder;
    math_stuff.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Current sum is now: {}", math_stuff.sum);

    Ok(())
}