import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../Redux/User/userApi";
import { clearState } from "../Redux/User/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    if (success) {
      dispatch(clearState());
      navigate("/signin");
    }
  }, [success]);

  return (
    <main className="max-w-lg m-auto p-3">
      <h1 className="text-3xl font-semibold text-center mt-10">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
        <input
          type="name"
          name="name"
          placeholder="name"
          onChange={handleChange}
          className="p-3 w-full rounded-lg border-[1px] border-slate-200"
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          className="p-3 w-full rounded-lg border-[1px] border-slate-200"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          className="p-3 w-full rounded-lg border-[1px] border-slate-200"
        />
        <button
          type="submit"
          className="bg-slate-700 p-3 rounded-lg text-white uppercase"
        >
          Sign Up
        </button>
      </form>
      <p className="my-4">
        Have an account?{" "}
        <Link to="/signin" className="text-blue-700">
          Sign in
        </Link>
      </p>
      {error && <p className="text-red-700">{error}</p>}
    </main>
  );
};

export default SignUp;
