import React from "react";
import "./About.css";

export default function About({ onClick }) {
  return (
    <div className="dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
      <button className="dropdown-button" onClick={onClick}>
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
    </div>
  );
}