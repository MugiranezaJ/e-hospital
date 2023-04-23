import React from "react";
import PropTypes from "prop-types";

function userCard({ name, user, onClick }) {
  console.log(user)
  const handleGrantAccess = () => {
    console.log("access granted", user?.username, user?.phone)
  }
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer space-y-4"
      onClick={onClick}
    >
      <div>
        <div className="text-xl font-medium">{user?.name}</div>
        <div className="text-gray-500">{user?.gender}</div>
        <div className="text-gray-500">{user?.age}</div>
      </div>
      <button onClick={handleGrantAccess} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Grant access
      </button>
    </div>
  );
}

userCard.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default userCard;
