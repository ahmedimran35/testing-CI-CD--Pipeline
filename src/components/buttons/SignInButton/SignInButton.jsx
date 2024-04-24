import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Toast } from "../../../constants/toast";
import { signSn } from "../../../utils/signSn";

const SignInButton = () => {
  /*   const { googleSignIn, user } = useAuth();
  const axios = useAxiosSecure();

  const handleGoogleSignIn = () => {
    if (user) return;
    signSn(googleSignIn, axios, Toast);
  }; */

  return (
    <button
      data-test="signinBtn"
      // onClick={handleGoogleSignIn}
      className={`inline-flex items-center justify-center gap-2 text-sm tracking-wide text-white transition-colors duration-300 px-6 py-2 hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl rounded-md font-medium`}
    >
      <Link to={"/sign-in"}>Sign In</Link>
    </button>
  );
};

export default SignInButton;

// sign-in
