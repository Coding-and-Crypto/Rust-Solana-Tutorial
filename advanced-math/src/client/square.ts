import * as borsh from 'borsh';
import * as math from './math';


// --------------------------------------------------------

/*
Account Data
*/

class MathStuffSquare {
  sum = 0;
  constructor(fields: {sum: number} | undefined = undefined) {
    if (fields) {
      this.sum = fields.sum;
    }
  }
}

const MathStuffSquareSchema = new Map([
  [MathStuffSquare, {kind: 'struct', fields: [['square', 'u32']]}],
]);

const MATH_STUFF_SIZE = borsh.serialize(
  MathStuffSquareSchema,
  new MathStuffSquare(),
).length;


// --------------------------------------------------------

/*
Instruction Data
*/

export class SquareInstruction {
  power = 0;
  constructor(fields: {power: number} | undefined = undefined) {
    if (fields) {
      this.power = fields.power;
    }
  }
}

export const SquareInstructionSchema = new Map([
  [SquareInstruction, {kind: 'struct', fields: [['power', 'u32']]}],
]);
  

// --------------------------------------------------------

/*
Main
*/

async function main() {
  await math.example('square', MATH_STUFF_SIZE);
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);