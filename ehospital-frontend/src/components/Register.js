import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../store/auth/authActions";

const RegisterForm = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(auth);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setShowEmail(selectedRole === "pharmacist");
    setShowPhone(selectedRole === "physician");
    setShowUsername(selectedRole === "patient");
  };
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     username: "",
//     email: "",
//     phone: "",
//     role: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    await registerAction(Object.fromEntries(data))(dispatch);
    console.log(Object.fromEntries(data));
  };

  return (
    <div className="flex flex-col justify-center items-center w-[450px]">
      <form
        method="post"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-center font-bold mb-8">Register</h2>
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
            // onChange={handleChange}
          />
        )}
        {showPhone && (
          <CustomTextInput
            type="tel"
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            // onChange={handleChange}
          />
        )}
        {showUsername && (
          <CustomTextInput
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
            // onChange={handleChange}
          />
        )}
        <CustomTextInput
          type="text"
          name="name"
          label="Name"
          placeholder="Enter your full name"
        //   onChange={handleChange}
        />
        <CustomTextInput
          type="text"
          name="age"
          label="Age"
          placeholder="Enter your age"
        //   onChange={handleChange}
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
            // onChange={handleChange}
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
          placeholder="Enter your password"
        //   onChange={handleChange}
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
