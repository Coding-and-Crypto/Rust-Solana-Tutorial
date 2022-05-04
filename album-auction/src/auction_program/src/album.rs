use borsh::{BorshDeserialize, BorshSerialize};


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Album<T: AsRef<str>> {
    pub id: u8,
    pub name: T,
    pub artist: T,
    pub winner: Option<String>,
}

impl Album<&str> {
    fn new<'a>(
        id: u8, 
        name: &'a str, 
        artist: &'a str
    ) -> Album<&'a str> {
        
        Album {
            id,
            name,
            artist,
            winner: None,
        }
    }
}

pub const ALBUM_CATALOG: [Album<&'static str>; 4] = [
    Album {
        id: 1, 
        name: "Abbey Road",
        artist: "The Beatles",
        winner: None,
    },
    Album {
        id: 2, 
        name: "News of the World",
        artist: "Queen",
        winner: None,
    },
    Album {
        id: 3, 
        name: "Van Halen",
        artist: "Van Halen",
        winner: None,
    },
    Album {
        id: 4, 
        name: "Back in Black",
        artist: "AC/DC",
        winner: None,
    },
];