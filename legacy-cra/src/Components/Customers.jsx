import React from "react";

function Customers() {
  return (
    <div className="md:flex md:flex-col items-center px-4 md:px-16 xl:px-40 py-5">
      <header className="Title font-titleFont text-center basis-1/2 text-2xl md:text-3xl lg:text-4xl mb-5">
        Trusted By Our Valued Customers
      </header>
      <div className="logos bg-Accent2 w-full rounded-3xl pt-10 pb-5 md:py-10 px-5 md:flex md:justify-around items-center">
        <img
          src="./assets/images/avatar.png"
          alt="Avatar Clothing - Sujha Traders and Exports"
          className="h-8 lg:h-12 mx-auto mb-5 md:mb-0"
        />
        <img
          src="./assets/images/mexBlues.png"
          alt="MexBlues - Sujha Traders and Exports"
          className="h-8 lg:h-12 mx-auto mb-5 md:mb-0"
        />
        <img
          src="./assets/images/namaste.png"
          alt="Namaste Clothing - Sujha Traders and Exports"
          className="h-8 lg:h-12 mx-auto mb-5 md:mb-0"
        />
        <img
          src="./assets/images/gypsyrose.png"
          alt="Gypsy Rose - Sujha Traders and Exports"
          className="h-8 lg:h-12 mx-auto mb-5 md:mb-0"
        />
      </div>
      <div className="text-center tracking-wider font-light mt-5">
        Your company could be featured here <span className="text-2xl">👆🏼</span>
      </div>
      <div className="button mt-5 text-center">
        <a
          href="/contact"
          className="bg-Primary hover:bg-Secondary text-White font-subtitleFont rounded-3xl px-6 py-2"
        >
          Contact Us Now!
        </a>
      </div>
    </div>
  );
}

export default Customers;
