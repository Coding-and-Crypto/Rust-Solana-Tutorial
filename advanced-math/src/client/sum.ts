import * as borsh from 'borsh';
import * as math from './math';


// --------------------------------------------------------

/*
Account Data
*/

class MathStuffSum {
  sum = 0;
  constructor(fields: {sum: number} | undefined = undefined) {
    if (fields) {
      this.sum = fields.sum;
    }
  }
}

const MathStuffSumSchema = new Map([
  [MathStuffSum, {kind: 'struct', fields: [['sum', 'u32']]}],
]);

const MATH_STUFF_SIZE = borsh.serialize(
  MathStuffSumSchema,
  new MathStuffSum(),
).length;


// --------------------------------------------------------

/*
Instruction Data
*/

export class SumInstruction {
  adder = 0;
  constructor(fields: {adder: number} | undefined = undefined) {
    if (fields) {
      this.adder = fields.adder;
    }
  }
}

export const SumInstructionSchema = new Map([
  [SumInstruction, {kind: 'struct', fields: [['adder', 'u32']]}],
]);


// --------------------------------------------------------

/*
Main
*/

async function main() {
  await math.example('sum', MATH_STUFF_SIZE);
}


main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);