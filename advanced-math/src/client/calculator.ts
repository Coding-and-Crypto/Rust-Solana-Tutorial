import * as borsh from 'borsh';
import * as math from './math';



// --------------------------------------------------------

/*
Account Data
*/

class Calculator {
  value = 0;
  constructor(fields: {value: number} | undefined = undefined) {
    if (fields) {
      this.value = fields.value;
    }
  }
}

const CalculatorSchema = new Map([
  [Calculator, {kind: 'struct', fields: [['value', 'u32']]}],
]);

const CALCULATOR_SIZE = borsh.serialize(
  CalculatorSchema,
  new Calculator(),
).length;


// --------------------------------------------------------

/*
Instruction Data
*/

export class CalculatorInstructions {
  operation = 0;
  operating_value = 0;
  constructor(fields: {operation: number, operating_value: number} | undefined = undefined) {
    if (fields) {
      this.operation = fields.operation;
      this.operating_value = fields.operating_value;
    }
  }
}

export const CalculatorInstructionsSchema = new Map([
  [CalculatorInstructions, {kind: 'struct', fields: [
    ['operation', 'u32'], ['operating_value', 'u32']
  ]}],
]);

export const CALCULATOR_INSTRUCTIONS_SIZE = borsh.serialize(
  CalculatorInstructionsSchema,
  new CalculatorInstructions(),
).length;



// --------------------------------------------------------

/*
Main
*/

async function main() {
  await math.example('calculator', CALCULATOR_SIZE);
}


main().then(
    () => process.exit(),
    err => {
      console.error(err);
      process.exit(-1);
    },
  );