/**
 * Hello world
 */

import {
  establishConnection,
  // establishPayer,
  // checkProgram,
  sayHello,
} from './hello_world';

async function main() {
  console.log("Let's hit our Hello Solana program.");

  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  // await establishPayer();

  // Check if the program has been deployed
  // await checkProgram();

  await sayHello();
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
