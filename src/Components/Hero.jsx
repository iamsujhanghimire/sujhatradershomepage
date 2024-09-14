import React from "react";

export default function Hero() {
  return (
    <section className="mx-auto w-full md:flex font-subtitleFont px-4 md:px-16 xl:px-40 items-center py-5">
      <div className="hero-text max-md:items-center max-md:text-center basis-1/2">
        <h3 className="hero-title text-xl sm:text-3xl md:text-4xl lg:text-5xl my-5 md:my-10 font-bold text-Primary uppercase md:w-11/12">
          Building a sustainable future, <br />
          <span className="text-Secondary">one garment at a time.</span>
        </h3>
        <h4 className="hero-subtitle text-sm sm:text-md md:text-lg font-medium uppercase my-5 md:my-10">
          Your Garment Manufacturing Solution
        </h4>
        <div className="cta text-sm lg:text-xl">
          <a
            href="/contact"
            className="bg-Primary hover:bg-Secondary text-White rounded-3xl px-10 py-3 max-md:hidden"
            aria-label="Manufacture with us"
          >
            Manufacture with us!
          </a>
        </div>
      </div>
      <div className="hero-img relative text-center basis-1/2">
        <img
          src="./assets/images/Fact7.jpeg"
          alt="Sustainable garment manufacturing"
          className="hero-img flex flex-col rounded-3xl shadow-xl"
          loading="lazy"
        />
        <a
          href="/contact"
          className="bg-Primary hover:bg-Secondary text-White text-lg font-subtitleFont rounded-3xl px-6 py-2 md:hidden"
          aria-label="Manufacture with us"
        >
          Manufacture with us!
        </a>
      </div>
    </section>
  );
}
