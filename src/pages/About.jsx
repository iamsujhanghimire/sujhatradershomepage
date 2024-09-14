import React from "react";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Sujha Traders and Exports</title>
        <meta
          name="description"
          content="Learn about Sujha Traders and Exports, a leading garment manufacturer based in Nepal, committed to crafting quality garments with a global vision."
        />
      </Helmet>
      <div className="mx-auto w-full font-subtitleFont px-4 md:px-16 xl:px-40 py-5">
        <header className="AboutMainSection">
          <div className="AboutText">
            <h1 className="font-titleFont text-2xl md:text-4xl text-center">
              About <br />
              <span className="text-Secondary font-bold">
                Sujha Traders and Exports
              </span>
            </h1>
            <p className="text-lg md:text-xl my-5 text-center">
              Crafting Quality Garments with a Global Vision
            </p>
            <div className="AboutImg">
              <img
                src="./assets/images/clothing.svg"
                alt="Clothing illustration"
                className="mx-auto max-h-80"
              />
            </div>
            <p className="mt-5">
              <span className="text-Secondary font-bold">
                Sujha Traders and Exports
              </span>{" "}
              is a leading garment manufacturer based in Nepal, deeply rooted in
              tradition and committed to innovation. Our story began in{" "}
              <em>1996</em>, with a vision to create high-quality clothing while
              fostering ethical practices and empowering communities worldwide.
            </p>
            <p>
              From humble beginnings as a{" "}
              <span className="text-Secondary">small local business</span>,
              we've grown steadily, expanding our operations and forging
              partnerships with wholesellers and retailers across the globe.
            </p>
          </div>
          <div className="CTA text-xl text-center mt-10 ">
            <a
              href="/contact"
              className="bg-Secondary hover:bg-Primary text-White rounded-3xl px-10 py-3"
            >
              Work With Us
            </a>
          </div>
        </header>

        <section className="CSR my-10">
          <h1 className="font-titleFont text-3xl mb-10">
            Social Responsibility at Our Core
          </h1>
          <div className="md:flex items-center">
            <div className="AboutImg basis-1/2">
              <img
                src="./assets/images/ecoConscious.svg"
                alt="Eco-friendly practices illustration"
                className="mx-auto max-h-80 w-5/6"
              />
            </div>
            <div className="CSRText basis-1/2">
              <p>
                At{" "}
                <span className="text-Secondary font-bold">
                  Sujha Traders and Exports
                </span>
                , social responsibility is more than just a phrase. We believe
                in creating a positive impact on the lives of those involved in
                the garment industry.
              </p>
              <p>
                <b className="font-titleFont text-xl">Fair Trade Practices:</b>{" "}
                <br />
                We are a certified fair trade garment manufacturer{" "}
                <span className="text-Secondary font-medium">since 2018</span>.
                This ensures fair wages, safe working conditions, and
                environmental sustainability throughout our supply chain.
              </p>
              <p>
                <b className="font-titleFont text-xl">
                  Empowering Communities:
                </b>
                <br />
                We actively partner with local artisans and workshops, promoting
                traditional skills and fostering economic development in the
                communities we work with.
              </p>
              <p>
                <b className="font-titleFont text-xl">
                  Sustainable Production:
                </b>
                <br />
                We prioritize eco-friendly practices, such as using recycled
                materials and minimizing our environmental footprint.
              </p>
            </div>
          </div>
        </section>
        <section className="CSR my-10">
          <h1 className="font-titleFont text-3xl mb-10">
            A Future Woven with Sustainability and Innovation
          </h1>
          <div className="md:flex items-center">
            <div className="CSRText basis-1/2">
              <p>
                We are constantly looking for ways to improve our practices and
                products. Here's a glimpse into our future plans:
              </p>
              <p>
                <b className="font-titleFont text-xl">
                  Expanding Sustainable Materials:
                </b>
                <br />
                We are actively exploring the use of even more sustainable and
                innovative fabrics in our garments.
              </p>
              <p>
                <b className="font-titleFont text-xl">
                  Investing in Technology:
                </b>
                <br />
                We are committed to integrating advanced technology to
                streamline production while maintaining our commitment to
                quality and ethical practices.
              </p>
              <p>
                <b className="font-titleFont text-xl">
                  Empowering the Next Generation:
                </b>
                <br />
                We are passionate about nurturing the next generation of garment
                makers by offering training programs and fostering a culture of
                innovation.
              </p>
            </div>
            <div className="AboutImg basis-1/2">
              <img
                src="./assets/images/qaTesting.svg"
                alt="Quality assurance testing illustration"
                className="mx-auto max-h-80 w-5/6"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
