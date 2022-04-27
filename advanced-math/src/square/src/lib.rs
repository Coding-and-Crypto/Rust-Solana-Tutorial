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
pub struct MathStuffSquare {
    pub square: u32,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct SquareInstruction {
    pub power: u32,
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

    let mut math_stuff = MathStuffSquare::try_from_slice(&account.data.borrow())?;
    let square_instruction = SquareInstruction::try_from_slice(&instruction_data)?;

    msg!("Evaluating {} to the power of {}...",math_stuff.square, square_instruction.power);

    math_stuff.square = math_stuff.square.pow(square_instruction.power);
    math_stuff.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Current value is now: {}", math_stuff.square);

    Ok(())
}