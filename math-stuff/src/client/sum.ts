import {
    connect,
    setKeypair,
    pingProgram,
} from './util';

async function main() {
    let connection = await connect();
    let clientKeypair = await setKeypair(connection);
    await pingProgram("sum", clientKeypair, connection);
}

main().then(
    () => process.exit(),
    err => {
      console.error(err);
      process.exit(-1);
    },
  );
  