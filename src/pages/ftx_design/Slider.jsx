export default function Slider() {
  const sliderData = [
    {
      slide: "/newimages/20525405.jpg",
      //title: "First slide label",
      //desc: "Some representative placeholder content for the first slide.",
    },
    {
      slide: "/newimages/20525427.jpg",
      //title: "First slide label",
      //desc: "Some representative placeholder content for the first slide.",
    },
    {
      slide: "/newimages/bitcoin-safety-and-security-Ment-Tech.jpeg",
      //title: "First slide label",
      //desc: "Some representative placeholder content for the first slide.",
    },
  ];
  return (
    <>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="false"
      >
        <div class="carousel-indicators">
          {sliderData.map((slide, index) => (
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              class={index == 0 ? "active": ""}
              aria-current={index == 0 ? true: false}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
          {/* <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button> */}
        </div>
        <div class="carousel-inner">
          {sliderData.map((slide, index) => (
            <div
              class={index == 0 ? "carousel-item active" : "carousel-item"}
              style={{ height: "500px", backgroundImage:`url(${slide.slide})`, backgroundPosition:"center", backgroundSize:"cover" }}
            >
              {/* <img src={slide.slide} class="d-block w-100" alt="..." /> */}
              {slide.title && slide.desc && (
                <div class="carousel-caption d-none d-md-block">
                  <h5>{slide.title}</h5>
                  <p>{slide.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
