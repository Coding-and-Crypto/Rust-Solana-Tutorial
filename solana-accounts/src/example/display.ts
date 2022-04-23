import {
    PublicKey,
} from '@solana/web3.js';


const WELCOME = `

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Welcome to the Solana Hotel!

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`;

export function printWelcome() {
    console.log(WELCOME);
}

export function printCheckInRequest() {
    console.log("Let's check in some random people to the Solana hotel...");
    console.log("\n");
}

export function printGuestsListRequest() {
    console.log("Let's get the current guests list of the Solana hotel...");
    console.log("\n");

}

export function printSendingTransaction(programId: PublicKey, programName: String) {
    console.log("Sending transaction to program: " + programName);
    console.log(" Program ID: " + programId.toBase58());
    console.log("\n");
}

export function printSuccess() {
    console.log("Success.");
    console.log("\n");
}