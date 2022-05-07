import {
    auctionSetup,
    resetSimulation,
    simulateBidding,
} from "./auction";


async function main() {
    await auctionSetup();
    await resetSimulation();
    // await simulateBidding();
}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
  );