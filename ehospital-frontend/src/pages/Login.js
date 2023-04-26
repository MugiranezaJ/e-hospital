import { useState } from "react";
import RegisterForm from "../components/Register";
import LoginForm from "../components/Login";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // do something with the form data
  };
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="font-thin text-2xl tracking-wider">
        Welcome To eHospital Portal
      </div>
      <div className="flex rounded-lg xborder-gray-300 bg-white xjustify-center xitems-center w-fit xmx-auto min-h-[700px] overflow-hidden divide-x">
        <div className=" p-2 h-full flex xitems-center">
          <RegisterForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="w-full p-2 h-full flex xitems-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
