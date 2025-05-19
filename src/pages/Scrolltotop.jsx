import React, { useEffect, useState } from "react";
// import { FaArrowCircleUp } from "react-icons/fa";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
// import { FaArrowUp } from "react-icons/fa";
import "./scroll.css";
function Scrolltotop() {
    const [isVisible, setIsVisible] = useState(false);

  // Show button after 300px scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className="scroll-to-top">
      {isVisible && (
        <MdOutlineKeyboardArrowUp onClick={scrollToTop} className="scroll-button" />
      )}
    </div>
  )
}

export default Scrolltotop
