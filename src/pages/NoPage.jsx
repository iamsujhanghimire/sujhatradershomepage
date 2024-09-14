import React from "react";

function NoPage() {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="font-titleFont text-3xl font-bold">Are you lost?</h1>
      <div className="rounded-lg bg-white p-8 shadow-lg shadow-Accent1 text-center font-subtitleFont">
        <img
          src="./assets/images/404notfound.svg"
          alt="404 Page Not Found"
          className="mx-auto h-[300px]"
        />
        <p className="my-5">
          Oops! The page you are looking for could not be found.
        </p>
        <a
          href="/"
          className="rounded-3xl px-6 py-2 font-semibold text-White bg-Secondary hover:bg-Primary"
        >
          Go Home To your mom
        </a>
      </div>
    </div>
  );
}

export default NoPage;
