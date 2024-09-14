import React from "react";
import { Helmet } from "react-helmet";

function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers | Sujha Traders and Exports</title>
        <meta
          name="description"
          content="Explore career opportunities at Sujha Traders and Exports. Join our dynamic team and help us shape the future of exports and trading."
        />
      </Helmet>

      <section className="py-10 px-4 md:px-16 xl:px-40">
        <div className="text-center mb-10">
          <h1 className="font-titleFont text-xl md:text-2xl lg:text-3xl mb-3 text-Secondary font-bold">
            Explore Careers at Sujha Traders and Exports
          </h1>
          <p className="md:text-lg">
            Join our growing team and be part of a company that values quality,
            customer relationships, and community impact.
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="text-xl md:text-2xl font-titleFont font-bold text-Secondary mb-3">
            Current Opportunities
          </p>
          <p className="md:text-lg mb-5">
            <span className="text-Error font-medium">
              {" "}
              We currently do not have any open positions.{" "}
            </span>
            <br />
            However, we're always looking for talented individuals to join our
            team. If you're passionate about contributing to the growth of Sujha
            Traders and Exports, feel free to send us your resume.
          </p>
          <a
            href="mailto:jhaindra@sujhatraders.com"
            className="bg-Primary hover:bg-Secondary text-White font-bold py-3 px-6 rounded-3xl"
          >
            Send Resume
          </a>
        </div>

        <div className="text-center">
          <h2 className="font-titleFont text-2xl md:text-3xl text-Secondary font-bold mb-5">
            Why work at Sujha?
          </h2>
          <ul className="text-left w-fit mx-auto">
            <li className="md:text-lg mb-2">
              Collaborative and inclusive work environment
            </li>
            <li className="md:text-lg mb-2">
              Opportunities for growth and career development
            </li>
            <li className="md:text-lg mb-2">
              Commitment to quality, innovation, and community
            </li>
            <li className="md:text-lg mb-2">
              Competitive compensation and benefits
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Careers;
