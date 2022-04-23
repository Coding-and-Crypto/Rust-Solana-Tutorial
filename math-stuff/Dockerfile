FROM frolvlad/alpine-glibc

RUN apk update && apk upgrade -a &&\
    apk add --update bash build-base wget curl nodejs npm eudev-dev &&\
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y -q &&\
    mv root/.cargo $PWD/.cargo &&\
    wget -o solana-release.tar.bz2 https://github.com/solana-labs/solana/releases/download/v1.10.6/solana-release-x86_64-unknown-linux-gnu.tar.bz2 &&\
    tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2

ENV PATH=$PWD/.cargo/bin:$PWD/solana-release/bin:$PATH

RUN solana-keygen new --no-bip39-passphrase &&\
    solana config set --keypair /root/.config/solana/id.json &&\
    solana config set --url http://api.devnet.solana.com &&\
    solana airdrop 2

COPY src src
COPY package.json package.json

RUN npm install &&\
    npm run build:program &&\
    solana program deploy dist/program/hello_solana.so

ENTRYPOINT npm run start