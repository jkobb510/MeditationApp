import React from "react";
import PropTypes from "prop-types";

const CollapsibleHeader = ({ isExpanded, toggleExpand }) => {
  return (
    <div className="collapsible-header" onClick={toggleExpand}>
      <h5>Your Sessions</h5>
      <span>{isExpanded ? "▲" : "▼"}</span>
    </div>
  );
};

CollapsibleHeader.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default CollapsibleHeader;
