use {
    borsh::{
        BorshDeserialize, 
        BorshSerialize
    },
    solana_program::{
        account_info::AccountInfo,
        entrypoint::ProgramResult,
        msg,
    },
    crate::auction::submit_bid,
    crate::schema::{
        AuctionInstruction,
        AuctionInstructionCommand
    },
    crate::reset::reset_data,
};


pub fn evaluate_instructions( 
    account: &AccountInfo, 
    instruction_data: &[u8]
) -> ProgramResult {

    msg!("Attempting to deserialize instruction data...");

    let auction_instruction = AuctionInstruction::try_from_slice(&instruction_data)?;

    msg!("Instruction data deserialized.");

    match auction_instruction.command {
        AuctionInstructionCommand::BID => {
            submit_bid(account)
        },
        AuctionInstructionCommand::RESET => {
            reset_data(account, auction_instruction)
        },
    }
}
