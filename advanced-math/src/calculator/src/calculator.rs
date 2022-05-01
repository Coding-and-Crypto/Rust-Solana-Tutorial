use borsh::{BorshDeserialize, BorshSerialize};



#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CalculatorInstructions {
    operation: u32,
    operating_value: u32,
}

impl CalculatorInstructions {
    pub fn evaluate(self, value: u32) -> u32 {
        match &self.operation {
            1 => value + &self.operating_value,
            2 => value - &self.operating_value,
            3 => value * &self.operating_value,
            _ => value * 0,
        }
    }
}