import * as borsh from 'borsh';
import * as math from './math';



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