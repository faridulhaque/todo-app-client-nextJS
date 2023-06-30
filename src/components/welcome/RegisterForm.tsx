import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import { useRegisterMutation } from "@/services/queries/authApi";
import { useRouter } from "next/router";

type entryTypes = {
  setRegistered: (e: boolean) => void;
};

const RegisterForm = ({ setRegistered }: entryTypes) => {
  const router = useRouter();

  const [passError, setPassError] = useState("");

  const [register] = useRegisterMutation<any>();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (
      e.currentTarget.elements.namedItem("name") as HTMLInputElement
    ).value;

    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;
    const password_2 = (
      e.currentTarget.elements.namedItem("password_2") as HTMLInputElement
    ).value;

    if (password.length <= 7) {
      return setPassError("Password must be 8 characters long");
    }

    if (password_2 !== password) {
      return setPassError("Password did not match");
    }
    const { Alert } = await import("react-st-modal");

    const result: any = await register({ name, email, password });

    if (result?.data?.email) {
      Alert(
        "Now you can login with your email and password",
        "Congratulations! Your registration is successful!"
      );
      setRegistered(true);
    } else if (result.error) {
      alert(result?.error?.data?.message);
    }
  };

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h2 className="text-3xl mt-3 text-center">Register now</h2>
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            className="input input-bordered"
            name="name"
            required
          />
        </div>
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
          <label className="label">
            <span className="label-text">Re-assign Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            name="password_2"
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
            Register
          </button>
        </div>
        {/* <GoogleButton></GoogleButton> */}
        <p className="text-center text-[#333333] mt-3">
          Already have an account?
          <span onClick={() => setRegistered(true)} className="link mr-1">
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
