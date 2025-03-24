import React from "react";
import PropTypes from "prop-types";
import graph from "../../../../chart-646.svg";
import { color } from "chart.js/helpers";

const Sessions = ({ isExpanded, toggleExpand }) => {
  return (
    <div className="collapsible-header" onClick={toggleExpand}>
      <span style={{ fontSize: 14 }}>Progress</span>
      <img src={graph} alt="Graph Icon" width="12" height="12" style={{ marginBottom: 2, marginLeft: 2, filter: "invert(100%) brightness(100%)" }} />
    </div>
  );
};

Sessions.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default Sessions;
