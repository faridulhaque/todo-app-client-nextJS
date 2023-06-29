import React from "react";
import {signIn} from "next-auth/react"

const GoogleButton = () => {
  const handleRegistryButton = () => {
    signIn("google");
  };

  return (
    <div className="form-control mt-6">
      <button 
      onClick={handleRegistryButton}
      type="button"  className="btn bg-red-500 hover:bg-red-500 text-white">
        Login with Google
      </button>
    </div>
  );
};

export default GoogleButton;
