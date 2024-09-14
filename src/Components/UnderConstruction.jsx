import React from "react";

function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="font-titleFont text-3xl font-bold">Under Maintenance</h1>
      <div className="rounded-lg bg-white p-8 shadow-lg shadow-Accent1 text-center font-subtitleFont">
        <img
          src="./assets/images/underconstruction.svg"
          alt="Page Under Construction"
          className="mx-auto h-[300px]"
        />
        <p className="my-5">
          Oops! The page you are looking for is currently under construction.{" "}
          <br />
          <span className="text-Secondary font-bold">
            Please check back later. Sorry for your inconvenience.
          </span>
        </p>
        <a
          href="/"
          className="rounded-3xl px-6 py-2 font-semibold text-White bg-Secondary hover:bg-Primary"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
}

export default UnderConstruction;
