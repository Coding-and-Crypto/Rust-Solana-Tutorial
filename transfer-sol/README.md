# Transfer SOL

Simple example of transferring lamports (SOL).

### Creating the example keypairs:

```shell
solana-keygen new --no-bip39-passphrase -o transfer-sol/accounts/ringo.json
```

### Viewing their public keys:

```shell
solana-keygen pubkey transfer-sol/accounts/george.json
```

```shell
Ringo:      3c5di8sz3rkag4LBLpjMxiMo7fAnPDMuyRQB6o4L4G1r
George:     FmLBYcNq1PYHsrtBVK4byrwjeqYtTFtLL6GjvYy4fpCM
Paul:       2dw4Ff2P9NfNqL2eCCMKmh4wNunhsvzNTGxMZJEVHtSA
John:       2AXzcKA3cXr1SMmGESTkP8pqx232njXQBCJJPJCb9vfJ
```

### Airdropping:

```shell
solana airdrop --keypair transfer-sol/accounts/john.json 2
```

### Viewing their balances:

```shell
solana account <pubkey> 
```

## Run the example:

In one terminal:
```shell
npm run reset-and-build
npm run simulation
```

In another terminal:
```shell
solana logs | grep "<program id> invoke" -A 7
```