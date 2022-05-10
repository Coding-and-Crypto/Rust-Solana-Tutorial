#! /bin/bash

SOLANA_PROGRAMS=("program")

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
            cargo clean --manifest-path=./$program/Cargo.toml
        done
        rm -rf _dist/program
        ;;
    "clean")
        rm -rf ./node_modules
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./$program/Cargo.toml
        done;;
    "build")
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo build-bpf --manifest-path=./$program/Cargo.toml --bpf-out-dir=./_dist/program
        done;;
    "deploy")
        for program in "${SOLANA_PROGRAMS[@]}"; do
            solana program deploy _dist/program/$program.so
        done;;
    "reset-and-build")
        rm -rf ./node_modules
        for x in $(solana program show --programs | awk 'RP==0 {print $1}'); do 
            if [[ $x != "Program" ]]; 
            then 
                solana program close $x; 
            fi
        done
        rm -rf _dist/program
        for program in "${SOLANA_PROGRAMS[@]}"; do
            cargo clean --manifest-path=./$program/Cargo.toml
            cargo build-bpf --manifest-path=./$program/Cargo.toml --bpf-out-dir=./_dist/program
            solana program deploy _dist/program/$program.so
        done
        npm install
        solana program show --programs
        ;;
esac