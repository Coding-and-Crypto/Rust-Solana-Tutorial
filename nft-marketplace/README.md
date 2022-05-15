# NFTs!

### Links:

```text
https://spl.solana.com/token#example-create-a-non-fungible-token
```

### CLI Steps:

To begin the CLI demonstration, we created a brand new keypair using the steps from Video #1 (Solana CLI).   
You can find those commands in this repository at `solana-cli/README.md`.   
Once you've set up a keypair, you can import your wallet to Phantom and also query it on Solana Explorer.   
```text
https://phantom.app/download
https://explorer.solana.com/
```

Now follow these steps to mint an NFT!

```shell
spl-token create-token --decimals 0
spl-token create-account "Example NFT"
spl-token mint "Example NFT" 1
spl-token authorize "Example NFT" mint --disable
```


### Rust Demo:


### Diagram:

![](how-nfts-work.jpg)