
interface NftProps {
    title: string,
    type: string,
}

function Nft(props: NftProps) {
    return(
        <div className="nft">
            <p>{props.title}</p>
            <p>{props.type}</p>
        </div>
    );
};

export default Nft;