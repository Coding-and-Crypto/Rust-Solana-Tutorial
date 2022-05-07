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
    crate::catalog{
        AuctionInstruction,
        AuctionInstructionCommand
    },
    crate::reset::reset_data,
};


pub fn evaluate_instructions( 
    account: &AccountInfo, 
    instruction_data: &[u8]
) -> ProgramResult {

    let auction_instruction = AuctionInstruction::try_from_slice(&instruction_data)?;

    match auction_instruction.command {
        AuctionInstructionCommand::BID => {
            submit_bid(account)
        },
        AuctionInstructionCommand::RESET => {
            reset_data(account)
        },
    }
}
