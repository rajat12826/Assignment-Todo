"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router= useRouter();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await axios.post("https://assignment-todo-indol.vercel.app/auth/register", formData);
      if (response.status === 201) {
        router.push("/auth/login"); 
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center bg-[#2c2638] items-center h-screen font-product ">
    <div className=" ">
    <h2 className="text-4xl font-semibold text-white  mb-5">Create An Account</h2>
    <p className="text-zinc-400">Already have an account? <span className="text-indigo-300 cursor-pointer" onClick={()=>{router.push("/auth/login")}}>Login</span></p>
    <form onSubmit={handleSubmit}>
      <div className="my-5 ">
      <input
        className="bg-[#3c364c] p-2 w-[250px] rounded-lg focus:outline-indigo-400 text-white"
          type="text"
          name="name"
          placeholder="UserName"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="my-5 ">
    
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
      <button type="submit" className="bg-[#6d54b5] hover:bg-[#6f4dd5] w-[250px] text-white py-2 rounded-lg ">Register</button>
    </form>
  </div>
</div>
  );
};

export default Register;
