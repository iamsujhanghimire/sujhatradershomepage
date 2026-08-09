import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
library.add(faFacebookF, faInstagram, faXTwitter, faPinterest);

function Footer() {
  let Socials = [
    { icon: faFacebookF },
    { icon: faInstagram },
    { icon: faXTwitter },
    { icon: faPinterest },
  ];
  // let Links = [
  //   {
  //     name: "Home",
  //     link: "/",
  //   },
  //   {
  //     name: "About Us",
  //     link: "/about",
  //   },
  //   {
  //     name: "Careers",
  //     link: "/careers",
  //   },
  //   {
  //     name: "Our Designs",
  //     link: "/designs",
  //   },
  //   {
  //     name: "Contact Us",
  //     link: "/contact",
  //   },
  // ];
  return (
    <footer className="bg-Primary text-White text-white py-4 px-4 md:px-16 xl:px-40 text-center">
      <div className="md:flex items-center justify-between">
        <div className=" footerItemsLeft">
          <div className="footerLogo">
            <img
              src="./assets/images/sujhaLogo.png"
              alt="Company Logo"
              className="h-16 w-auto max-md:mx-auto"
            />
            <h4 className="font-bold font-titleFont text-Secondary text-xl">
              Sujha Traders & Exports
            </h4>
          </div>

          <div className="socials py-4">
            {Socials.map((icon, index) => (
              <FontAwesomeIcon key={index} className="mx-2" icon={icon.icon} />
            ))}
          </div>
        </div>
        {/* <div className="footerCenter md:text-left">
          <ul className="pt-2 font-subtitleFont text-sm">
            {Links.map((link) => (
              <li key={link} className="hover:text-Secondary">
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="footerRight max-md:my-6">
          <h4 className="font-subtitleFont font-bold py-4">
            Inquire about working with us:
          </h4>
          <a
            href="/contact"
            className="ctaButton font-bodyFont font-bold text-sm bg-Secondary rounded-3xl py-3 px-10"
          >
            Work with us!
          </a>
        </div>
      </div>
      <p className="text-center font-bodyFont font-thin text-xs tracking-widest">
        Copyright &copy; {new Date().getFullYear()} Sujha Traders & Exports
      </p>
    </footer>
  );
}

export default Footer;
