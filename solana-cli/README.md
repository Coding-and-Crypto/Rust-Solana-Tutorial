# Solana CLI

## Getting started with the Solana CLI:

### 1. Download the Solana Tool Suite (CLI)

Install the Solana Tool Suite by following [these instructions](https://docs.solana.com/cli/install-solana-cli-tools).

### 2. Configure an account for your device/application

Once the CLI is installed, we must create an account. We do this by generating a new **public/private key pair**.
```shell
solana-keygen new
```

Once we do that, we have to configure our Solana CLI client to use our new account.
```shell
solana config set --keypair /root/.config/solana/id.json
```

And now we just need to bind our client to a Solana network.
```shell
solana config set --url <network_url>
```
```shell
(dev net -- development)        https://api.devnet.solana.com
(test net -- staging)           https://api.testnet.solana.com
(main net -- production)        https://api.mainnet-beta.solana.com
```

### 3. Build a smart contract program

### 4. Deploy it!

## The Dockerfile:

Provided is a Dockerfile used to create the following image: [jpcaulfi/solana-alpine](https://hub.docker.com/repository/docker/jpcaulfi/solana-alpine).   

You can leverage this image to create a Docker container to conduct Solana business out of - such as deploying and even hosting/running an application.