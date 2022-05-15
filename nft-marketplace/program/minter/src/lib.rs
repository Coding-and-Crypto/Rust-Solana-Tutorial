use {
    solana_program::{
        account_info::{
            next_account_info, 
            AccountInfo,
        },
        entrypoint,
        entrypoint::ProgramResult,
        msg,
        program::invoke,
        program_error::ProgramError,
        pubkey::Pubkey,
        system_instruction,
    },
};


entrypoint!(process_instruction);


pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instructions: &[u8],
) -> ProgramResult {
    
    let accounts_iter = &mut accounts.iter();
    let minter = next_account_info(accounts_iter)?;

    msg!("Account {:?} is requesting to mint a new NFT!", 
        minter.key);
    msg!("  Processing mint...");

    // TODO: NFT mint
    invoke(
        &system_instruction::transfer(payer.key, payee.key, amount),
        &[payer.clone(), payee.clone()],
    )?;
    
    msg!("NFT minted!");
    msg!("  Token: {:?}", token);
    msg!("  Owner: {:?}", minter.key);
    Ok(())
}