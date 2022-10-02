## My Non-Fungible Garment

See: [demo](https://mynonfungiblegarment.vercel.app/)

This web app takes in an Ethereum Address and shows the NFTs owned by the address.
Selecting an NFT from the image gallery will render the NFT image on a dress model.

### Under The Hood

A simple Next.js app.

Two services are used in order to get NFTs owned by an address:

- [Moralis](https://moralis.io/) - Although I hate their service as it is slow to update, it is a very easy to use resource to get NFT data. Alternatively, one could use [Etherscan](https://etherscan.io/) to fetch NFT ownerships over time but will result in a bit more calls and parsing of the data.
- [Opensea](https://opensea.io/) - I used the Opensea API in order to get data about collections and optimized images for NFTs. Relying on images coming directly from NFT contract metadata may result in slow performance as there is no control on what people decide to upload there. Opensea already did the grunt work.

Therefore, two API keys are needed for this project if you plan to run it locally:
MORALIS_API_KEY=''
OPENSEA_API_KEY=''

[React Three/Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) is used to render 3D with Three.js.
