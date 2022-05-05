import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
    createKeypairFromFile,
} from './util';
import fs from 'mz/fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';



export class Auction {

    /**
     * Configs
     */
    SOLANA_NETWORK = "devnet";
    AUCTION_PROGRAM_NAME = "auction_program";
    AUCTION_DATA_ACCOUNT_SEED = "auction";
    CONFIG_FILE_PATH = path.resolve(
        os.homedir(),
        '.config',
        'solana',
        'cli',
        'config.yml',
    );
    PROGRAM_PATH = path.resolve(__dirname, '../../dist/program');

    /**
     * Attributes
     */
    connection: Connection;
    localKeypair: Keypair;
    auctionProgramKeypair: Keypair;
    auctionProgramId: PublicKey;


    /**
     * Setup: Connects to Solana network & loads local keypair.
     */
    async setup() {

        console.log(`Initializing...`);
        
        this.connection = new Connection(
            `https://api.${this.SOLANA_NETWORK}.solana.com`, 'confirmed'
        );
        console.log(`Successfully connected to Solana ${this.SOLANA_NETWORK}.`);
        
        this.localKeypair = await createKeypairFromFile(
            yaml.parse(
                await fs.readFile(this.CONFIG_FILE_PATH, {encoding: 'utf8'})
            ).keypair_path
        );
        console.log(`Successfully loaded local account:`);
        console.log(`   ${this.localKeypair.publicKey}`);

        // console.log(`Balance is too low in local account.`);
        // console.log(`Requesting airdrop...`);
        // this.connection.confirmTransaction(
        //     this.connection.requestAirdrop(
        //         this.localKeypair.publicKey,
        //         LAMPORTS_PER_SOL,
        //     )
        // )

        this.auctionProgramKeypair = await createKeypairFromFile(
            path.join(
                this.PROGRAM_PATH, 
                this.AUCTION_PROGRAM_NAME + '-keypair.json')
        );
        this.auctionProgramId = this.auctionProgramKeypair.publicKey;
    }


    /**
     * Resets the auction by removing any winners.
     */
    async resetSimulation() {

    }


    /**
     * Simulated bidding - conducted in `simulation.ts`.
     */
    async simulateBidding() {

    }    
}
