import React from "react";
import PropTypes from "prop-types";

const Sessions = ({ isExpanded, toggleExpand }) => {
  return (
    <div className="collapsible-header" onClick={toggleExpand}>
      <h5>Your Progress</h5>
      <span>{isExpanded ? "▲" : "▼"}</span>
    </div>
  );
};

Sessions.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default Sessions;
