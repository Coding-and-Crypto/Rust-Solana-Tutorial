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