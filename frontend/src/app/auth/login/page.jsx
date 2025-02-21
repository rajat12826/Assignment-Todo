"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
    const router= useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData);
      const { message, userId } = response.data;
      // console.log(response.data);
      // console.log(user);
      
      
      if (response.status === 200) {
        
        localStorage.setItem("user", JSON.stringify(userId));
       router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
  <div className=" font-product flex justify-center bg-[#2c2638] items-center h-screen ">
      <div className=" ">
      <h2 className="text-4xl font-semibold text-white  mb-5">Login</h2>
      <p className="text-zinc-400">Didn't have an account? <span className="text-indigo-300 cursor-pointer" onClick={()=>{router.push("/auth/register")}}>Register</span></p>
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <input
          className="bg-[#3c364c] p-2 w-[250px] rounded-lg focus:outline-indigo-400 text-white"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <input
             className="bg-[#3c364c] p-2 w-[250px] rounded-lg  focus:outline-indigo-400 text-white"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-[#6d54b5] hover:bg-[#6f4dd5] w-[250px] text-white py-2 rounded-lg ">Login</button>
      </form>
    </div>
  </div>
  );
};

export default Login;
