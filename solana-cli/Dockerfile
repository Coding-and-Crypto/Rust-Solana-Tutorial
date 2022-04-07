FROM frolvlad/alpine-glibc

RUN apk update && apk upgrade -a &&\
    apk add --update bash build-base wget curl nodejs npm eudev-dev &&\
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y -q &&\
    mv root/.cargo $PWD/.cargo &&\
    wget -o solana-release.tar.bz2 https://github.com/solana-labs/solana/releases/download/v1.10.6/solana-release-x86_64-unknown-linux-gnu.tar.bz2 &&\
    tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2

ENV PATH=$PWD/.cargo/bin:$PWD/solana-release/bin:$PATH