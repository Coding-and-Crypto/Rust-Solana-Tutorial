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
    spl_token::{
        ID,
        instruction::transfer,
    },
};


entrypoint!(process_instruction);


pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instructions: &[u8],
) -> ProgramResult {
    
    let accounts_iter = &mut accounts.iter();
    let purchaser = next_account_info(accounts_iter)?;
    let owner = next_account_info(accounts_iter)?;
    let token_program = next_account_info(accounts_iter)?;

    let purchase_amount = instructions
        .get(..8)
        .and_then(|slice| slice.try_into().ok())
        .map(u64::from_le_bytes)
        .ok_or(ProgramError::InvalidInstructionData)?;

    msg!("Account {:?} has purchased NFT {:?} from account {:?} for {:?} lamports.", 
        purchaser.key, token_program.key, owner.key, purchase_amount);
    
    // Transfer lamports
    msg!("  Processing transfer of {:?} lamports...", purchase_amount);
    invoke(
        &system_instruction::transfer(purchaser.key, owner.key, purchase_amount),
        &[purchaser.clone(), owner.clone()],
    )?;
    msg!("  Success.");

    // Transfer NFT
    msg!("  Processing transfer of NFT {:?}...", token_program.key);
    invoke(
        &spl_token::instruction::transfer(
            &spl_token::ID, 
            owner.key, 
            purchaser.key, 
            owner.key, 
            &[owner.key], 
            1
        )?,
        &[purchaser.clone(), owner.clone()],
    )?;
    msg!("  Success.");
    msg!("  {:?} now owns the NFT.", purchaser.key);
    
    msg!("Transaction completed!");
    Ok(())
}