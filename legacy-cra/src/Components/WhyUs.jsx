import React from "react";

function WhyUs() {
  return (
    <section className="md:flex md:flex-col items-center font-subtitleFont font-light px-4 md:px-16 xl:px-40 py-5">
      <header className="why-us-header md:flex md:items-center basis-1/2 w-full">
        <h1 className="title font-titleFont text-center md:text-left basis-1/2 text-2xl md:text-3xl lg:text-4xl">
          Why Work With Us?
        </h1>
        <div className="certification md:flex md:items-center basis-1/2 w-full justify-center">
          <img
            src="./assets/images/ftgn.png"
            alt="Fair Trade Group of Nepal"
            className="h-20 md:h-24 max-md:mx-auto"
            loading="lazy"
          />
          <h3 className="font-titleFont text-Secondary font-bold text-center text-xl md:text-2xl">
            Certified
          </h3>
        </div>
      </header>
      <article className="why-us-description md:flex md:items-center max-md:pt-5">
        <div className="main-text basis-1/2 pb-5">
          <p className="text-sm md:text-lg lg:text-xl md:pr-10">
            Partner with{" "}
            <span className="font-bold text-Secondary">
              Sujha Traders and Exports
            </span>
            , a{" "}
            <span className="text-Secondary">
              Fair Trade certified garment manufacturer
            </span>
            . We have cultivated family-like relationships, prioritized ethical
            production, and delivered the highest quality garments for more than
            25 years. Choose{" "}
            <span className="text-Secondary font-bold">Sujha</span> and
            experience the difference of working with a company that values both
            quality and social responsibility.
          </p>
        </div>
        <div className="image-container basis-1/2">
          <img
            src="./assets/images/Fact4.jpeg"
            alt="Sujha Traders and Exports Factory"
            className="mx-auto rounded-3xl shadow-lg lg:w-1/2"
            loading="lazy"
          />
        </div>
      </article>
      <div className="stats w-full bg-Accent2 rounded-3xl py-5 px-5 mt-5">
        <div className="stat-text my-10 flex flex-col md:flex-row justify-around items-center font-titleFont text-xl text-center w-2/3 md:w-full mx-auto">
          <div className="stat">Fair Trade Certified</div>
          <div className="divider h-0.5 md:h-16 w-5/6 md:w-0.5 rounded-3xl bg-Primary md:mx-2 my-2 md:my-0"></div>
          <div className="stat">25+ Years of Excellence</div>
          <div className="divider h-0.5 md:h-16 w-5/6 md:w-0.5 rounded-3xl bg-Primary md:mx-2 my-2 md:my-0"></div>
          <div className="stat">50+ Satisfied Customers</div>
          <div className="divider h-0.5 md:h-16 w-5/6 md:w-0.5 rounded-3xl bg-Primary md:mx-2 my-2 md:my-0"></div>
          <div className="stat">10+ Countries Delivered To</div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
