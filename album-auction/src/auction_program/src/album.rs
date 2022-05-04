use borsh::{BorshDeserialize, BorshSerialize};


#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Auction {
    pub catalog: Vec<Album>,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Album<T: AsRef<str>> {
    pub id: u8,
    pub title: T,
    pub artist: T,
    pub winner: Option<String>,
}

impl Album<&str> {
    fn new<'a>(
        id: u8, 
        title: &'a str, 
        artist: &'a str
    ) -> Album<&'a str> {
        
        Album {
            id,
            title,
            artist,
            winner: None,
        }
    }
}

pub const ALBUM_CATALOG: [Album<&'static str>; 4] = [
    Album {
        id: 1, 
        title: "Abbey Road",
        artist: "The Beatles",
        winner: None,
    },
    Album {
        id: 2, 
        title: "News of the World",
        artist: "Queen",
        winner: None,
    },
    Album {
        id: 3, 
        title: "Van Halen",
        artist: "Van Halen",
        winner: None,
    },
    Album {
        id: 4, 
        title: "Back in Black",
        artist: "AC/DC",
        winner: None,
    },
];