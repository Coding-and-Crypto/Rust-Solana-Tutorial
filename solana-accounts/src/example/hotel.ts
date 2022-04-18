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
  get_guests_list,
  run_check_in_simulation,
} from './util';

  

async function main() {

  let connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  let check_in_program_id = await get_hotel_program_id("check_in");
  let guests_report_program_id = await get_hotel_program_id("guests_report");

  const exampleKeypair = Keypair.generate();
  await airdrop(exampleKeypair.publicKey, 1, connection);
  print_welcome();

  /*
  Print the guest report.
  */
  await get_guests_list(exampleKeypair, 
                  guests_report_program_id,
                  connection);

  for (var _i = 0; _i < 4; _i++) {

    /*
    Check in some people to the hotel.
    */
    await run_check_in_simulation(exampleKeypair, 
                    check_in_program_id,
                    connection);

    /*
    Print the guest report.
    */
    await get_guests_list(exampleKeypair, 
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