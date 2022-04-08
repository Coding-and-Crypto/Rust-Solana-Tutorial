# Hello Solana

Based on Solana Labs' Hello World example.

### Config

```shell
solana-keygen new --no-bip39-passphrase
solana config set --keypair /root/.config/solana/id.json
solana config set --url http://api.devnet.solana.com

solana airdrop 1

npm install
npm run build:program-rust
solana program deploy dist/program/hello_solana.so
npm run start

solana program show --programs

solana program close <id>
```

### Docker

Alpine Docker container with `glibc`. Installing a few libs including `node`, `npm`, & `rust`.   
Uses `npm install` to build the app and the `solana` CLI to deploy it on-chain from Docker!

```shell
network: devnet
```