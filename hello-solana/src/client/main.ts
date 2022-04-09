import {
  establishConnection,
  createAccount,
  checkProgram,
  sayHello,
} from './hello_world';


async function main() {
  console.log("Launching client...");
  await establishConnection();
  await createAccount();
  await checkProgram();
  await sayHello();
}


main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
