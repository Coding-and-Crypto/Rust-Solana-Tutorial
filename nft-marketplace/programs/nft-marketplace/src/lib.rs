use {
    anchor_lang::{
        prelude::*,
        solana_program::program::invoke,
    },
    anchor_spl::{
        token,
        token::{MintTo, Token},
    },
    mpl_token_metadata::instruction::{
        create_master_edition_v3, create_metadata_accounts_v2
    },
};


// Our struct to mint an NFT
//  This is the struct we'll pass in as instructions

#[derive(Accounts)]
pub struct MintNFT<'info> {
    /// CHECK: Just testing
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
    /// CHECK: Just testing
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: Just testing
    #[account(mut)]
    pub mint: UncheckedAccount<'info>,
    /// CHECK: Just testing
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    /// CHECK: Just testing
    #[account(mut)]
    pub payer: AccountInfo<'info>,
    /// CHECK: Just testing
    pub rent: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: Just testing
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    /// CHECK: Just testing
    pub token_metadata_program: UncheckedAccount<'info>,
}


declare_id!("HUSrhAUYxgN3pPmm8z4y6y51jkGeZdkVLtKWrCo5aHJU");


#[program]
pub mod nft_marketplace {
    use super::*;

    // We'll pass the URI to our MetaData (picture) and the NFT's title into our program when we call it.

    pub fn mint_nft(
        context: Context<MintNFT>,
        creator_key: Pubkey,
        metadata_uri: String,
        metadata_title: String,
    ) -> Result<()> {
        
        msg!("Initializing Mint NFT program...");

        // Configure Cross-Program-Invokation (CPI) Context

        let token_mint = context.accounts.mint.to_account_info();
        let token_mint_id = token_mint.key;
        let cpi_accounts = MintTo {
            mint: token_mint,
            to: context.accounts.token_account.to_account_info(),
            authority: context.accounts.payer.to_account_info(),
        };
        let cpi_program = context.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_context, 1)?;
        msg!("Your NFT has been minted!");
        msg!("  Token ID: {}", token_mint_id);

        // Set up the associated MetaData for the NFT

        let creator = vec![
            mpl_token_metadata::state::Creator {
                address: creator_key,
                verified: false,
                share: 100,
            },
            mpl_token_metadata::state::Creator {
                address: context.accounts.mint_authority.key(),
                verified: false,
                share: 0,
            },
        ];
        let token_symbol = std::string::ToString::to_string("CODE");

        // Invoke the Solana programs to create the MetaData accounts
        //  Wrapped nicely in Anchor instructions!
        invoke(
            &create_metadata_accounts_v2(
                context.accounts.token_metadata_program.key(),
                context.accounts.metadata.key(),
                context.accounts.mint.key(),
                context.accounts.mint_authority.key(),
                context.accounts.payer.key(),
                context.accounts.payer.key(),
                metadata_title,
                token_symbol,
                metadata_uri,
                Some(creator),
                1,
                true,
                false,
                None,
                None,
            ),
            &[
                context.accounts.metadata.to_account_info(),
                context.accounts.mint.to_account_info(),
                context.accounts.mint_authority.to_account_info(),
                context.accounts.payer.to_account_info(),
                context.accounts.token_metadata_program.to_account_info(),
                context.accounts.token_program.to_account_info(),
                context.accounts.system_program.to_account_info(),
                context.accounts.rent.to_account_info(),
            ]
        )?;
        msg!("MetaData account created successfully.");

        // Invoke the Solana programs to mint the NFT to the reciever's account
        //  Wrapped nicely in Anchor instructions!

        invoke(
            &create_master_edition_v3(
                context.accounts.token_metadata_program.key(),
                context.accounts.master_edition.key(),
                context.accounts.mint.key(),
                context.accounts.payer.key(),
                context.accounts.mint_authority.key(),
                context.accounts.metadata.key(),
                context.accounts.payer.key(),
                Some(0),
            ),
            &[
                context.accounts.master_edition.to_account_info(),
                context.accounts.mint.to_account_info(),
                context.accounts.mint_authority.to_account_info(),
                context.accounts.payer.to_account_info(),
                context.accounts.metadata.to_account_info(),
                context.accounts.token_metadata_program.to_account_info(),
                context.accounts.token_program.to_account_info(),
                context.accounts.system_program.to_account_info(),
                context.accounts.rent.to_account_info(),
            ]
        )?;
        msg!("NFT delivered successfully. Check your wallet!");

        Ok(())
    }
}
