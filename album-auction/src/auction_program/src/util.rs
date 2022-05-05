use {
    anyhow::anyhow,
    home::home_dir,
    solana_cli_config::{CONFIG_FILE, Config}
    solana_program::pubkey::Pubkey,
    serde::{Serialize, Deserialize},
    std::fs,
    std::path::Path,
};


#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct SolanaConfigYaml {
    keypair_path: String,
}


pub fn get_local_keypair() -> Pubkey {

    let config_file = solana_cli_config::CONFIG_FILE.as_ref()
        .ok_or_else(|| anyhow!("Unable to get config file path."))
        .expect("Unable to get config file path.");
    let cli_config = Config::load(&config_file).expect("Error parsing config.");
    // let config_path = match home::home_dir() {
    //     Some(path) => {
    //         path.into_os_string().into_string().unwrap()
    //             + ".config/solana/cli/config.yml"
    //     },
    //     None => panic!("Could not find local Solana config YAML!"),
    // };
    // let config_yaml: SolanaConfigYaml = serde_yaml::from_str(
    //     fs::read_to_string(config_path).expect("Could not read YAML file.")
    // );

    // let config_yaml_str = match home_dir() {
    //     Some(path) => {
    //         match fs::read_to_string(
    //             path.into_os_string().into_string().unwrap()
    //             + ".config/solana/cli/config.yml"
    //         ) {
    //             Ok(raw) => match raw.parse() {
    //                 Ok(content) => content,
    //                 Err(_) => panic!(),
    //             },
    //             Err(_) => panic!(),
    //         }
    //     },
    //     None => panic!()
    // };
    

}