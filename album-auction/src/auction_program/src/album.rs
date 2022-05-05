use {
    borsh::{
        BorshDeserialize,
        BorshSerialize
    },
    solana_program::pubkey::Pubkey,
};


// #[derive(BorshSerialize, BorshDeserialize, Debug)]
// pub struct Album<T: AsRef<str>> {
//     pub id: u8,
//     pub title: T,
//     pub artist: T,
//     pub winner: Option<String>,
// }

// impl Album<&str> {
//     pub fn new<'a>(
//         id: u8, 
//         title: &'a str, 
//         artist: &'a str
//     ) -> Album<&'a str> {
        
//         Album {
//             id,
//             title,
//             artist,
//             winner: None,
//         }
//     }
// }

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Album {
    pub id: u8,
    pub title: String,
    pub artist: String,
    pub winner: Option<Pubkey>,
}

// impl Album {
//     pub fn new(
//         id: u8, 
//         title: String, 
//         artist: String
//     ) -> Album {
        
//         Album {
//             id,
//             title,
//             artist,
//             winner: None,
//         }
//     }
// }


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Auction {
    pub catalog: Vec<Album>,
}

impl Auction {
    pub fn new(catalog: Vec<Album>) -> Auction {
        Auction {
            catalog,
        }
    }
    
    pub fn reset_catalog() -> Auction {
        Auction::new(
            vec![
                Album {
                    id: 1, 
                    title: String::from("Abbey Road"),
                    artist: String::from("The Beatles"),
                    winner: None,
                },
                Album {
                    id: 2, 
                    title: String::from("News of the World"),
                    artist: String::from("Queen"),
                    winner: None,
                },
                Album {
                    id: 3, 
                    title: String::from("Van Halen"),
                    artist: String::from("Van Halen"),
                    winner: None,
                },
                Album {
                    id: 4, 
                    title: String::from("Back in Black"),
                    artist: String::from("AC/DC"),
                    winner: None,
                },
            ]
        )
    }
}

// pub const ALBUM_CATALOG: [Album<&'static str>; 4] = [
//     Album {
//         id: 1, 
//         title: "Abbey Road",
//         artist: "The Beatles",
//         winner: None,
//     },
//     Album {
//         id: 2, 
//         title: "News of the World",
//         artist: "Queen",
//         winner: None,
//     },
//     Album {
//         id: 3, 
//         title: "Van Halen",
//         artist: "Van Halen",
//         winner: None,
//     },
//     Album {
//         id: 4, 
//         title: "Back in Black",
//         artist: "AC/DC",
//         winner: None,
//     },
// ];