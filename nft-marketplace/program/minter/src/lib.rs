use {
    solana_program::{
        account_info::{
            next_account_info, 
            AccountInfo,
        },
        entrypoint,
        entrypoint::ProgramResult,
        msg,
        native_token::LAMPORTS_PER_SOL,
        program::invoke,
        program_error::ProgramError,
        program_pack::Pack,
        pubkey::Pubkey,
        system_instruction,
    },
    // solana_sdk::transaction::Transaction,
    spl_token::{
        ID,
        instruction::{
            initialize_account,
            initialize_mint,
        },
        state::{
            Mint,
        },
    },
};


entrypoint!(process_instruction);


pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instructions: &[u8],
) -> ProgramResult {
    
    let accounts_iter = &mut accounts.iter();
    let minter = next_account_info(accounts_iter)?;

    msg!("Account {:?} is requesting to mint a new NFT!", 
        minter.key);

    msg!("  Processing...");

    // Create token
    let create_account_ix = solana_program::system_instruction::create_account(
        minter.key,
        &Pubkey::new_unique(),
        20000000,
        Mint::LEN as u64,
        &spl_token::ID,
    );
    
    // Mint token
    let mint_ix = spl_token::instruction::initialize_mint(
        &spl_token::ID, 
        minter.key, 
        minter.key, 
        None, 
        0
    )?;

    // let blockhash = client.get_latest_blockhash()?;
    // let mut tx = Transaction::new_signed_with_payer(
    //     &[create_account_ix, mint_ix],
    //     Some(&minter.key),
    //     &[minter],
    //     blockhash,
    // );
    // client.send_and_confirm_transaction(&tx)?;

    invoke(
        &create_account_ix,
        &[minter.clone()],
    )?;

    invoke(
        &mint_ix,
        &[minter.clone()],
    )?;

    // // Mint 1 token
    // msg!("  Processing mint...");
    // invoke(
    //     &spl_token::instruction::initialize_mint(
    //         &spl_token::ID, 
    //         minter.key, 
    //         minter.key, 
    //         None, 
    //         0
    //     )?,
    //     &[minter.clone()],
    // )?;

    // // Disable minting
    // msg!("  Disabling minting...");
    // invoke(
    //     &spl_token::instruction::initialize_mint(
    //         &spl_token::ID, 
    //         minter.key, 
    //         minter.key, 
    //         None, 
    //         0
    //     )?,
    //     &[minter.clone()],
    // )?;
    
    msg!("NFT minted!");
    Ok(())
}