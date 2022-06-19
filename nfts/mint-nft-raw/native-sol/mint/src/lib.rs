use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo}, 
    entrypoint, 
    entrypoint::ProgramResult, 
    msg, 
    program_error::ProgramError,
    pubkey::Pubkey,
};


entrypoint!(process_instruction);


fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    let accounts_iter = &mut accounts.iter();

    let metadata = next_account_info(accounts_iter)?;
    let master_edition = next_account_info(accounts_iter)?;
    let mint = next_account_info(accounts_iter)?;
    let token_account = next_account_info(accounts_iter)?;
    let mint_authority = next_account_info(accounts_iter)?;
    let rent = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;
    let token_program = next_account_info(accounts_iter)?;
    let associated_token_program = next_account_info(accounts_iter)?;
    let token_metadata_program = next_account_info(accounts_iter)?;

    let mint_instructions = MintNftInstruction::try_from_slice(&instruction_data)?;

    let metadata_title = mint_instructions.metadata_title;
    let metadata_symbol = mint_instructions.metadata_symbol;
    let metadata_uri = mint_instructions.metadata_uri;

    msg!("BARF:");
    msg!("metadata : {}", metadata.key);
    msg!("master_edition : {}", master_edition.key);
    msg!("mint : {}", mint.key);
    msg!("token_account : {}", token_account.key);
    msg!("mint_authority : {}", mint_authority.key);
    msg!("rent : {}", rent.key);
    msg!("system_program : {}", system_program.key);
    msg!("token_program : {}", token_program.key);
    msg!("associated_token_program : {}", associated_token_program.key);
    msg!("token_metadata_program : {}", token_metadata_program.key);
    msg!("metadata_title : {}", metadata_title.key);
    msg!("metadata_symbol : {}", metadata_symbol.key);
    msg!("metadata_uri : {}", metadata_uri.key);
    
    msg!("Creating mint account...");
    msg!("Mint: {}", mint.key);
    // invoke()?;

    msg!("Initializing mint account...");
    msg!("Mint: {}", mint.key);
    // invoke()?;

    msg!("Creating token account...");
    msg!("Token Address: {}", token_account.key);    
    // invoke()?;

    msg!("Minting token to token account...");
    msg!("Mint: {}", mint.key);   
    msg!("Token Address: {}", token_account.key);
    // invoke()?;

    msg!("Creating metadata account...");
    msg!("Metadata account address: {}", metadata.key);
    // invoke()?;

    msg!("Creating master edition metadata account...");
    msg!("Master edition metadata account address: {}", master_edition.key);
    // invoke()?;

    msg!("Token mint process completed successfully.");

    Ok(())
}


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MintNftInstruction {
    pub metadata_title: String,
    pub metadata_symbol: String,
    pub metadata_uri: String,
}