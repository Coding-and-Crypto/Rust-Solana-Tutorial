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
    spl_token::instruction::initialize_mint,
};


entrypoint!(process_instruction);


pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instructions: &[u8],
) -> ProgramResult {
    
    let accounts_iter = &mut accounts.iter();
    let minter = next_account_info(accounts_iter)?;
    let token_program = next_account_info(accounts_iter)?;

    msg!("Account {:?} is requesting to mint a new NFT!", 
        minter.key);
    msg!("  Processing mint...");

    // Mint NFT
    invoke(
        &spl_token::instruction::initialize_mint(
            token_program.key, 
            minter.key, 
            minter.key, 
            None, 
            0
        )?,
        &[minter.clone()],
    )?;
    
    msg!("NFT minted!");
    msg!("  Token: {:?}", token_program.key);
    msg!("  Owner: {:?}", minter.key);
    Ok(())
}