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
        <span className="about-text">About</span>
        <svg
          className="about-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M12 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="9" r="1" fill="currentColor" />
        </svg>
      </button>

      <div className={`dropdown-panel ${isOpen ? "show" : ""}`}>
        <p>
          <strong>Upward Meditation</strong><br /><br />
          A simple meditation tracker that counts up, not down.<br /><br />
          Sessions are saved and added to your daily total.<br /><br />
          Tap the<strong> Progress</strong> button/icon to view your weekly stats.<br /><br />
          More features coming soon!
        </p>
      </div>
    </div>
  );
}