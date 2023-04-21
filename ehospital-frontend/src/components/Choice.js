import React from "react";

const users = ["patient", "physician", "pharmacist"];
const Choice = ({ role, setRole }) => {
  return (
    <div className="flex p-3 border border-black w-96 bg-slate-300 text-lg">
      <div className="w-full">
        <p className="font-bold">Enter as:</p>
        <div className="font-thin">
          {users.map((user) => (
            <button
              className="hover:bg-slate-400 w-full rounded-md px-2"
              onClick={() => setRole(user)}
            >
              {user}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choice;
