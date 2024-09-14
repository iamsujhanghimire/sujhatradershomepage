import React from "react";
import UnderConstruction from "../Components/UnderConstruction";
import { Helmet } from "react-helmet";

function Designs() {
  return (
    <>
      <Helmet>
        <title>Our Designs | Sujha Traders and Exports</title>
        <meta
          name="description"
          content="Learn about Sujha Traders and Exports, a leading garment manufacturer based in Nepal, committed to crafting quality garments with a global vision."
        />
      </Helmet>
      <h1 className="text-center font-titleFont text-5xl font-bold text-Secondary my-2">
        Our designs page is currently{" "}
      </h1>
      <UnderConstruction />
    </>
  );
}

export default Designs;
