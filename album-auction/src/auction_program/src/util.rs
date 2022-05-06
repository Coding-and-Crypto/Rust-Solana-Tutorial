use {
    // anyhow::anyhow,
    core::str::FromStr,
    // solana_cli_config::{CONFIG_FILE, Config},
    serde::{Serialize, Deserialize},
    solana_program::pubkey::Pubkey,
    solana_sdk::signature::Keypair,
    std::fs,
};


pub const DATA_ACCOUNT_SEED: &'static str = "data";
pub const DATA_ACCOUNT_KEY_FILE: &'static str = "data/data-account-keypair.json";

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct SolanaConfig {
    pub keypair_path: String,
}


pub fn get_local_keypair() -> Keypair {

    // let config_file = solana_cli_config::CONFIG_FILE.as_ref()
        // .ok_or_else(|| anyhow!("Unable to get config file path."))
        // .expect("Unable to get config file path.");
    
    // let cli_config = Config::load(&config_file).expect("Error parsing config.");

    let cli_config: SolanaConfig = serde_yaml::from_str(
        &fs::read_to_string(
            "~/.config/solana/cli/config.yml"
        ).expect("Solana config path not found.")
    ).expect("Could not read config YAML file.");
    
    Keypair::from_base58_string(
        &fs::read_to_string(
            &cli_config.keypair_path
        ).expect("Could not read keypair JSON file.")
    )
}


pub fn get_data_account_key() -> Pubkey {

    Pubkey::from_str(
        &fs::read_to_string(&DATA_ACCOUNT_KEY_FILE).expect("Could not read key file.")
    ).expect("Could not parse key from key file.")
}