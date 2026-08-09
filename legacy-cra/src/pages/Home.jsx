import React from "react";
import Hero from "../Components/Hero";
import WhyUs from "../Components/WhyUs";
import MissonValues from "../Components/MissonValues";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Sujha Traders and Exports</title>
        <meta
          name="description"
          content="Welcome to Sujha Traders and Exports - Your Garment Manufacturing Solution. Crafting quality garments with integrity and innovation. Learn why we are trusted by customers worldwide."
        />
      </Helmet>
      <Hero />
      <WhyUs />
      <MissonValues />
    </>
  );
}

export default Home;
