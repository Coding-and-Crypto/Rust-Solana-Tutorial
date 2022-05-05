use {
    borsh::{
        BorshDeserialize, 
        BorshSerialize
    },
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
    },
    crate::auction::submit_bid,
    crate::reset::reset_data,
};


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum AuctionInstructionCommand {
    BID,
    INIT,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct AuctionInstruction {
    pub command: AuctionInstructionCommand,
}


pub fn evaluate_instructions( 
    account: &AccountInfo, 
    instruction_data: &[u8]
) -> ProgramResult {

    let auction_instruction = AuctionInstruction::try_from_slice(&instruction_data)?;

    match auction_instruction.command {
        AuctionInstructionCommand::BID => {
            submit_bid(account)
        },
        AuctionInstructionCommand::INIT => {
            reset_data(account)
        },
    }
}
