import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Route path="/about" element={<About />}></Route>
            <Route path="/designs" element={<Designs />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/careers" element={<Careers />}></Route>
            <Route path="/*" element={<NoPage />}></Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </Router>
  </React.StrictMode>
);
