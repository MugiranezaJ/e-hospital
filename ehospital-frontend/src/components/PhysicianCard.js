import React from "react";
import PropTypes from "prop-types";

function PhysicianCard({ name, specialty, onClick }) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-xl font-medium mb-4">{"name"}</div>
      <div className="text-gray-500">{"specialty"}</div>
    </div>
  );
}

PhysicianCard.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhysicianCard;
