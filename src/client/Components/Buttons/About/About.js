import React, { useState, useRef, useEffect } from "react";
import "./About.css";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-wrapper" ref={wrapperRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        About
      </button>
      <div className={`dropdown-panel ${isOpen ? "show" : ""}`}>
        <p>
          <strong>Upward Meditation</strong><br /><br />
          A simple meditation tracker that counts up, not down.<br /><br />
          Sessions are saved and added to your daily total.<br /><br />
          Tap <strong>the Progress</strong> button/icon to view your weekly stats.<br /><br />
          More features coming soon!
        </p>
      </div>
    </div>
  );
}
