use borsh::{BorshDeserialize, BorshSerialize};


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CalculatorInstructions {
    operation: Operation,
    operating_value: u32,
}

impl CalculatorInstructions {
    pub fn evaluate(self, value: u32) -> u32 {
        match &self.operation {
            Operation::ADD => value + &self.operating_value,
            Operation::SUBTRACT => value - &self.operating_value,
            Operation::MULTIPLY => value * &self.operating_value,
            Operation::DIVIDE => value / &self.operating_value,
        }
    }
}


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum Operation {
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE,
}

impl Operation {
    pub fn get_operation(arg: &str) -> Option<Operation> {
        match arg {
            "add" => Some(Operation::ADD),
            "subtract" => Some(Operation::SUBTRACT),
            "multiply" => Some(Operation::MULTIPLY),
            "divide" => Some(Operation::DIVIDE),
            _ => None
        }
    }
}
