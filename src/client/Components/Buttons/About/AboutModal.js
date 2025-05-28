import React from "react";
import "./About.css";

export default function AboutModal({ onClose }) {
  return (
    <div className="dropdown-panel" onClick={(e) => e.stopPropagation()}>
      <p>
        <strong>Upward Meditation</strong><br /><br />
        A simple meditation tracker that counts up, not down.<br /><br />
        Sessions are saved and added to your daily total.<br /><br />
        Tap the<strong> Progress</strong> button/icon to view your weekly stats.<br /><br />
        More features coming soon!
      </p>
    </div>
  );
}
