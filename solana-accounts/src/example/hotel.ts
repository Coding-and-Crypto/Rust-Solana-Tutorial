import {
  Keypair,
  Connection,
} from '@solana/web3.js';
import {
  print_welcome,
} from './display';
import {
  airdrop,
  get_hotel_program_id,
  execute_program,
} from './util';

  

async function main() {

  let connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  let check_in_program_id = await get_hotel_program_id("check_in");
  let guests_report_program_id = await get_hotel_program_id("guests_report");

  const exampleKeypair = Keypair.generate();
  airdrop(exampleKeypair.publicKey, 1, connection);
  print_welcome();

  /*
  Print the guest report.
  */
  execute_program(exampleKeypair, 
                  guests_report_program_id,
                  connection);

  for (var _i = 0; _i < 4; _i++) {

    /*
    Print the guest report.
    */
    execute_program(exampleKeypair, 
                    check_in_program_id,
                    connection);

    /*
    Print the guest report.
    */
    execute_program(exampleKeypair, 
                    guests_report_program_id,
                    connection);
  }
}
  
  
main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);