import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import emailjs from "@emailjs/browser";
import SujhaMap from "../Components/SujhaMap";

function Contact() {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.from_name.value.trim();
    const email = form.current.from_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      setMessage("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }
    setIsLoading(true);
    emailjs
      .sendForm(
        "service_iamsujhanghimire",
        "template_sujhainquiry",
        form.current,
        {
          publicKey: "eGEJEjePo2IGDIUae",
        }
      )
      .then(
        () => {
          setIsSuccess(true);
          setMessage("Message sent successfully");
          form.current.reset();
        },
        (error) => {
          setIsSuccess(false);
          setMessage("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Sujha Traders and Exports</title>
        <meta
          name="description"
          content="Contact Sujha Traders and Exports. Find our location and contact information on the map."
        />
      </Helmet>
      <section className="py-10 px-4 md:px-16 xl:px-40">
        <div className="text-center mb-10">
          <h1 className="font-titleFont text-3xl md:text-4xl lg:text-5xl mb-3 text-Secondary font-bold">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl">
            Get in touch with Sujha Traders and Exports
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-titleFont font-bold text-Secondary text-xl md:text-2xl mb-3">
              Our Location
            </h2>
            <div className="mb-5">
              <SujhaMap />
            </div>
            <p className="text-xl md:text-2xl font-titleFont font-bold text-Secondary">
              Sujha Traders and Exports
            </p>
            <p className="">Tokha Road, Kathmandu, Nepal</p>
            <p className="text-lg">Phone: +9779851024784</p>
            <p className="text-lg">
              Email:{" "}
              <a
                href="mailto:jhaindra@sujhatraders.com"
                className="text-Secondary"
              >
                jhaindra@sujhatraders.com
              </a>
            </p>
          </div>
          <div>
            <h2 className="font-titleFont font-bold text-Secondary text-xl md:text-2xl mb-3">
              Send us a Message
            </h2>
            {message && (
              <p
                className={`text-${
                  isSuccess ? "Success" : "Error"
                } font-bold pt-5`}
              >
                {message}
              </p>
            )}
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="name"
                  name="from_name"
                  className="w-full px-4 py-2 border rounded-3xl"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  id="email"
                  name="from_email"
                  className="w-full px-4 py-2 border rounded-3xl"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="block text-sm mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-3xl"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-Primary hover:bg-Secondary text-White font-bold py-3 px-6 rounded-3xl disabled:hover:bg-Primary disabled:opacity-40"
                disabled={isLoading}
              >
                {isLoading ? "Sending Message" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
