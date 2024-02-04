import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/User/userApi";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <main className="max-w-lg m-auto p-3">
      <h1 className="text-3xl font-semibold text-center mt-10">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4 mt-10"
      >
        <input
          type="email"
          placeholder="email"
          name="email"
          className="p-3 w-full rounded-lg border-[1px] border-slate-200"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="p-3 w-full rounded-lg border-[1px] border-slate-200"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 p-3 rounded-lg text-white uppercase"
        >
          Sign In
        </button>
      </form>
      <p className="my-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-700">
          Sign up
        </Link>
      </p>
      {error && <p className="text-red-700">{error}</p>}
    </main>
  );
};

export default SignIn;
