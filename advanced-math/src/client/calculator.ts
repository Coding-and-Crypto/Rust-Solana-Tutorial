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
  operation =  Operation.ADD;
  operating_value = 0;
  constructor(fields: {operation: Operation, operating_value: number} | undefined = undefined) {
    if (fields) {
      this.operation = fields.operation;
      this.operating_value = fields.operating_value;
    }
  }
}

export enum Operation {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
}

export const CalculatorInstructionsSchema = new Map([
  [CalculatorInstructions, {kind: 'struct', fields: [
    ['operation', 'Operation'], ['operating_value', 'u32']
  ]}],
]);


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