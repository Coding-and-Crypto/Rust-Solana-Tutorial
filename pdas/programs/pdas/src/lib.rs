use anchor_lang::prelude::*;

declare_id!("BtSZDMEWUNjHi38dqbxf1qxBahf4vtUn8HurZxSE85px");

#[program]
pub mod pdas {
    use super::*;

    pub fn create_ledger(
        ctx: Context<CreateLedger>,
        color: String,
    ) -> Result<()> {

        let ledger_account = &mut ctx.accounts.ledger_account;
        ledger_account.color = color;
        ledger_account.balance = 0;
        
        Ok(())
    }

    pub fn modify_ledger(
        ctx: Context<ModifyLedger>,
        new_balance: u32,
    ) -> Result<()> {

        let ledger_account = &mut ctx.accounts.ledger_account;
        ledger_account.balance = new_balance;
        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(color: String)]
pub struct CreateLedger<'info> {
    #[account(
        init,
        payer = wallet,
        space = 82,
        seeds = [
            wallet.key().as_ref(),
            b"_",
            color.as_ref(),
        ],
        bump
    )]
    pub ledger_account: Account<'info, Ledger>,
    #[account(mut)]
    pub wallet: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ModifyLedger<'info> {
    #[account(mut)]
    pub ledger_account: Account<'info, Ledger>,
    #[account(mut)]
    pub wallet: Signer<'info>,
}

#[account]
pub struct Ledger {
    pub color: String,
    pub balance: u32,
}