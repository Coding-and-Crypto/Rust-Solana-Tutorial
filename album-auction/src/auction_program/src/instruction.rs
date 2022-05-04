use {
    borsh::{
        BorshDeserialize, 
        BorshSerialize
    },
    solana_program::{
        pubkey::Pubkey,
        entrypoint::ProgramResult,
    },
    crate::auction::submit_bid,
    crate::init::initialize_data,
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
    address: &Pubkey, 
    instruction_data: &[u8]
) -> ProgramResult {

    let auction_instruction = AuctionInstruction::try_from_slice(&instruction_data)?;

    match auction_instruction.command {
        AuctionInstructionCommand::BID => submit_bid(address),
        AuctionInstructionCommand::INIT => initialize_data(address),
    }
}
