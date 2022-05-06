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
    DATA_ACCOUNT_SEED,
    DATA_ACCOUNT_KEYPAIR_FILE,
} from './util';


/**
 * Resets the auction by removing any winners.
 */
export async function reset_simulation() {

}

/**
 * Simulated bidding.
 */
export async function auction_simulation() {
    
}