export default function FeatureCards() {
  const featureData = [
    {
      title: "Features",
      desc: "Over 250 perpetual and quarterly futures markets.",
    },
    {
      title: "Spot",
      desc: "Over 100 spot markets",
    },
    {
      title: "Leveraged Tokens",
      desc: "ERC20 assets that can give you leveraged exposure to cryptocurrency markets.",
    },
    {
      title: "Volatility",
      desc: "Daily, weekly, and quarterly MOVE contracts, plus BVOL/IBVOL volatility tokens.",
    },
    {
      title: "Prediction Markets",
      desc: "Markets on the outcome of real-world events.",
    },
    {
      title: "Fiat",
      desc: "USD, EUR, GBP, AUD; 11 fiat currencies in total.",
    },
    {
      title: "Stake",
      desc: "Earn rewards by staking digital assets.",
    },
    {
      title: "BTXX Pay",
      desc: "Receive payments with our fast, secure, and low-fee payment processor.",
    },
  ];
  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#0A0E17" }}
    >
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
          {featureData.map((feature) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card card-body text-center border-0 h-100 bg-dark" style={{borderRadius: "20px"}}>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-light">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
