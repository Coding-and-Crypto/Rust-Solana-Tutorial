import { Auction } from "./auction";


async function main() {
    let auction = new Auction();
    auction.setup();
    auction.resetSimulation();
    auction.simulateBidding();
}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
  );