import React from "react";

function MissionValues() {
  return (
    <section className="md:flex md:flex-col items-center font-subtitleFont font-light px-4 md:px-16 xl:px-40 py-5">
      <header className="mission-values-header w-full">
        <h1 className="title font-titleFont text-center md:text-left text-2xl md:text-3xl lg:text-4xl">
          Our Mission and Values
        </h1>
      </header>
      <article className="mission-values-description lg:flex md:items-center max-md:pt-5">
        <div className="image-container basis-1/2">
          <img
            src="./assets/images/Fact1.jpeg"
            alt="Sujha Traders and Exports Values"
            className="mx-auto rounded-3xl shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="main-text basis-1/2 pt-5">
          <ul className="max-md:text-sm lg:text-lg md:pl-10">
            <li>
              <b className="font-medium text-Secondary">
                Crafting High-Quality Garments:
              </b>{" "}
              We prioritize integrity and innovation in creating sustainable
              garments.
            </li>
            <li>
              <b className="font-medium text-Secondary">
                Customer Relationships:
              </b>{" "}
              Building Lasting Customer Relationshipsby understanding and
              meeting their needs.
            </li>
            <li>
              <b className="font-medium text-Secondary">Ethical Practices:</b>{" "}
              Ensuring fair wages, safe working conditions, and ethical
              sourcing.
            </li>
            <li>
              <b className="font-medium text-Secondary">
                Environmental Responsibility:
              </b>{" "}
              Reducing waste, utilizing sustainable materials, and minimizing
              environmental impact.
            </li>
            <li>
              <b className="font-medium text-Secondary">Community Impact:</b>{" "}
              Empowering local communities and fostering positive social change.
            </li>
            <li>
              <b className="font-medium text-Secondary">Innovation:</b>{" "}
              Embracing creativity and innovation to drive continuous
              improvement.
            </li>
            <li>
              <b className="font-medium text-Secondary">Global Reach:</b>{" "}
              Extending our commitment to quality and values worldwide.
            </li>
          </ul>
          <div className="button mt-10 md:pl-10 flex items-center justify-center md:justify-start">
            <a
              href="/about"
              className="bg-Secondary hover:bg-Primary text-White font-subtitleFont rounded-3xl px-6 py-2"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

export default MissionValues;
