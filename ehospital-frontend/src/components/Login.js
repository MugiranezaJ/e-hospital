import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";

const LoginForm = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showUsername, setShowUsername] = useState(false);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setShowEmail(selectedRole === "pharmacist");
    setShowPhone(selectedRole === "physician");
    setShowUsername(selectedRole === "patient");
  };

  return (
    <div className="flex flex-col justify-center items-center w-[450px]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <h2 className="text-2xl text-center font-bold mb-8">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="role"
            onChange={handleRoleChange}
          >
            <option value="">Select role</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="physician">Physician</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        {showEmail && (
          <CustomTextInput
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
        )}
        {showPhone && (
          <CustomTextInput
            type="tel"
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
          />
        )}
        {showUsername && (
          <CustomTextInput
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
        )}

        <CustomTextInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;