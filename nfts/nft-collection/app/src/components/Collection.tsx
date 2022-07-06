import { FC, useEffect, useState } from 'react';
import Nft from './Nft';
import * as rpc from '../util/rpc';

function Collection() {

    const [collection, setCollection] = useState([]);

    const loadCollection = async () => {
        setCollection(
            await rpc.getNftsMinted()
        );
    };

    useEffect(() => {
        loadCollection();
    }, []);

    return(
        <div className="collection">
            <h1>Test</h1>
            {/* {collection.map((nft, index) => { 
                return <Nft key={index} title={nft.title} type ={nft.type} /> 
            })} */}
        </div>
    )
};

export default Collection;