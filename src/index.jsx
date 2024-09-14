import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary"; // Ensure this path is correct

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Designs = lazy(() => import("./pages/Designs"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const NoPage = lazy(() => import("./pages/NoPage"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/sujhatradershomepage/about"
              element={<About />}
            ></Route>
            <Route
              path="/sujhatradershomepage/designs"
              element={<Designs />}
            ></Route>
            <Route
              path="/sujhatradershomepage/contact"
              element={<Contact />}
            ></Route>
            <Route
              path="/sujhatradershomepage/careers"
              element={<Careers />}
            ></Route>
            <Route path="/sujhatradershomepage/*" element={<NoPage />}></Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </Router>
  </React.StrictMode>
);
