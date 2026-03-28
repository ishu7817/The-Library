import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Quotes from "./Quotes";
import Articles from "./Articles";
import Vault from "./Vault";
import Articleread from "./Articleread";
import MobileView from "./Mobileview";
import About from "./About";
import Lenis from "lenis";
import ReactLenis from "lenis/react";
import { useLocation } from "react-router-dom";

function App() {
  const [width, setwidth] = useState(window.innerWidth);
  const [height, setheight] = useState(window.innerHeight);
  const location = useLocation();

  const unallowedpaths = ["/", "/Quotes", "/About"];

  useEffect(() => {
    const handleresize = () => { setwidth(window.innerWidth), setheight(window.innerHeight) };
    window.addEventListener("resize", handleresize);
    return () => window.removeEventListener("resize", handleresize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 3, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (
    (width < 540 || height < 400) &&
    unallowedpaths.includes(location.pathname)
  ) {
    return <MobileView width={width} />;
  }
  return (
    <>
    <ReactLenis root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Articleread />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/vault" element={<Vault />} />
      </Routes>

    </ReactLenis>
    <Analytics />
    </>
  );
}

export default App;
