import React from "react";
import "./About.css";
export default function AboutModal({ onClose, isAboutOpen }) {
  return (
    <div className={`dropdown-panel ${isAboutOpen ? "show" : ""}`}>
      <h3>Upward Meditation</h3>
      <p>
        This app tracks your meditation sessions like a stopwatch, from 0 seconds and upwards. <br /><br />
        Tap the<strong> Progress</strong> button/icon to view your weekly session times.<br /><br />
      </p>
    </div>
  );
}