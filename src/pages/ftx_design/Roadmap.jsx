export default function Roadmap() {
  const cardImages = [
    "launchpad.png",
    "CRYPTOBANKING.png",
    "NFT_MARKETPLACE.png",
    "blockchain_explorer.png",
  ];
  return (
    <div
      className="container-fluid py-5"
      style={{
        /* backgroundColor: "lightgrey", */
        backgroundImage: "url(/newimages/f29c81a.webp)",
        backgroundPosition: "bottom",
        //backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row">
          {cardImages.map((cardImg) => (
            <div className="col col-12 col-md-6 col-lg-3">
              <div className="card">
                <img
                  src={`/newimages/${cardImg}`}
                  className="card-img-top card-img-bottom"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="mb-1" style={{ fontWeight: "500" }}>
              BITFLASH initiate in market with exchange and its own token BTEX.
              Future planning of BITFLASH is gathering of trading community in
              BITFLASH Exchange
            </p>
            <p className="mb-1" style={{ fontWeight: "500" }}>
              BITFLASH preparing own blockchain explorer that will launch mid
              feb 2022, with testnet and crypto wallet.
            </p>
            <p className="mb-1" style={{ fontWeight: "500" }}>
              BTEX NFT Market Place for art tokenization will coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
