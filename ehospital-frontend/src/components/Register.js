import React, { useEffect, useState } from "react";
import CustomTextInput from "./CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../store/auth/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setShowEmail(selectedRole === "physician");
    setShowPhone(selectedRole === "pharmacist");
    setShowUsername(selectedRole === "patient");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    await registerAction(Object.fromEntries(data))(dispatch);
    console.log(Object.fromEntries(data));
  };
  useEffect(() => {
    auth?.response?.message && notify(auth?.response?.message);
  }, [auth?.response?.message]);

  return (
    <div className="flex flex-col justify-center items-center w-[450px]">
      <ToastContainer />
      <form
        method="post"
        className="border rounded px-8 pt-6 pb-8 mb-4 w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl text-center font-thin mb-8">Register</h2>
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
            required
            placeholder="Enter your email"
          />
        )}
        {showPhone && (
          <CustomTextInput
            type="tel"
            name="phone"
            label="Phone"
            required
            placeholder="Enter your phone number"
          />
        )}
        {showUsername && (
          <CustomTextInput
            type="text"
            name="username"
            label="Username"
            required
            placeholder="Enter your username"
          />
        )}
        <CustomTextInput
          type="text"
          name="name"
          label="Name"
          required
          placeholder="Enter your full name"
        />
        <CustomTextInput
          type="text"
          name="age"
          label="Age"
          required
          placeholder="Enter your age"
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Gender
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="gender"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <CustomTextInput
          type="password"
          name="password"
          label="Password"
          required
          placeholder="Enter your password"
        />
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
