import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faXmark);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };
  let Links = [
    {
      name: "Home",
      link: "/sujhatradershomepage/#/",
    },
    {
      name: "About Us",
      link: "/sujhatradershomepage/#/about",
    },
    {
      name: "Our Designs",
      link: "/sujhatradershomepage/#/designs",
    },
    {
      name: "Careers",
      link: "/sujhatradershomepage/#/careers",
    },
    {
      name: "Contact Us",
      link: "/sujhatradershomepage/#/contact",
    },
  ];
  return (
    <nav className="shadow-lg bg-PrimaryBg">
      <div className="nav md:flex items-center md:justify-between mx-auto px-4 md:px-16 xl:px-40">
        <div className="navLogo">
          <a href="/" className="flex items-center w-fit">
            <img
              src="./assets/images/sujhaLogo.png"
              alt="Logo"
              className="max-h-20"
            />
            <h4 className="font-titleFont font-bold text-sm md:text-lg lg:text-xl">
              Sujha Traders & Exports
            </h4>
          </a>
        </div>
        <button
          className={`md:hidden top-7 absolute right-4`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon
            icon={`${isOpen ? "fa-bars" : "fa-xmark"}`}
            className="w-6 h-6"
          />
        </button>
        <ul
          className={`navItems md:flex md:items-center font-subtitleFont font-light bg-PrimaryBg absolute md:static z-10 left-0 w-full md:w-auto max-lg:text-sm gap-2 max-md:py-6 ease-in md:opacity-100 opacity-0 ${
            isOpen ? "hidden" : "opacity-100"
          }`}
        >
          {Links.map((link, index) => (
            <li
              key={index}
              className="ml-2 hover:text-Secondary text-center py-4"
            >
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
