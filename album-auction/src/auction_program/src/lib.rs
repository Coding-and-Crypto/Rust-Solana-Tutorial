use {
    solana_program::{
        account_info::{next_account_info, AccountInfo}, 
        entrypoint, 
        entrypoint::ProgramResult,
        msg, 
        program_error::ProgramError,
        pubkey::Pubkey,
    },
    crate::instruction::evaluate_instructions,
};

mod auction;
mod instruction;
mod reset;
mod schema;


entrypoint!(process_instruction);


fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    if account.owner != program_id {
        msg!("Account does not have the correct program id!");
        return Err(ProgramError::IncorrectProgramId)
    };

    evaluate_instructions(account, instruction_data)
}