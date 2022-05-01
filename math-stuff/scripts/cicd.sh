#! /bin/bash

SOLANA_PROGRAMS=("sum" "square")

case $1 in
    "reset")
        rm -rf ./node_modules
        for x in $(solana program show --programs | awk 'RP==0 {print $1}'); do 
            if [[ $x != "Program" ]]; 
            then 
                solana program close $x;
            fi
        done
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./src/$program/Cargo.toml
        done
        rm -rf dist/program
        ;;
    "clean")
        rm -rf ./node_modules
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./src/$program/Cargo.toml
        done;;
    "build")
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo build-bpf --manifest-path=./src/$program/Cargo.toml --bpf-out-dir=./dist/program
        done;;
    "deploy")
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo build-bpf --manifest-path=./src/$program/Cargo.toml --bpf-out-dir=./dist/program
            solana program deploy dist/program/$program.so
        done;;
    "reset-and-build")
        rm -rf ./node_modules
        for x in $(solana program show --programs | awk 'RP==0 {print $1}'); do 
            if [[ $x != "Program" ]]; 
            then 
                solana program close $x; 
            fi
        done
        rm -rf dist/program
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./src/$program/Cargo.toml
            cargo build-bpf --manifest-path=./src/$program/Cargo.toml --bpf-out-dir=./dist/program
            solana program deploy dist/program/$program.so
        done
        npm install
        solana program show --programs
        ;;
esac