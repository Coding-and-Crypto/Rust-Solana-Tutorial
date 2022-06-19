import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { NftCollection } from "../target/types/nft_collection";

describe("nft-collection", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.NftCollection as Program<NftCollection>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
