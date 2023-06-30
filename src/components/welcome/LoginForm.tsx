import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/services/queries/authApi";
import Link from "next/link";
type entryTypes = {
  setRegistered: (e: boolean) => void;
};

const LoginForm = ({ setRegistered }: entryTypes) => {
  const router = useRouter();

  const [passError, setPassError] = useState("");

  const [login] = useLoginMutation<any>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    if (password.length <= 7) {
      return setPassError("Incorrect password");
    }

    const { Alert } = await import("react-st-modal");


    const result: any = await login({ email, password: password });
    if (result?.data?.token) {
      localStorage.setItem("user", JSON.stringify(result?.data?.loggedInUser));
      router.push("/");
    } else if (result.error) {
      Alert(result?.error?.data?.message);
    }
  };

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h2 className="text-3xl mt-3 text-center">Login now</h2>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="email"
            className="input input-bordered"
            name="email"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            name="password"
            required
          />
        </div>

        <div className="form-control">
          {passError && (
            <label className="text-red-500 label">
              <span className="label-text">{passError}</span>
            </label>
          )}
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn bg-[#3F51B5] hover:bg-[#3F51B5] text-white"
          >
            Login
          </button>
        </div>
        {/* <GoogleButton></GoogleButton> */}
        <p className="text-center text-[#333333] mt-3">
          Don&apos;t have an account?
          <span onClick={() => setRegistered(false)} className="link mr-1">
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
