import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SignUpWithGoogle = () => {
  // const { googleSignIn } = useAuth();

  // const axios = useAxiosSecure();

  const handleGoogleSignIn = () => {
    /* googleSignIn().then((result) => {
      const user = result.user;

      axios.post("/auth/signin").then((res) => {
      });
    }); */
  };
  return (
    <div className=" max-w-xs mx-auto py-1">
      <button
        onClick={handleGoogleSignIn}
        className=" w-full font-bold text-lg text-center p-2 rounded-md flex justify-center items-center flex-col hover:shadow-red-200 shadow hover:shadow-md"
      >
        <FcGoogle className=" text-2xl"></FcGoogle> Continue With Google
      </button>
    </div>
  );
};

export default SignUpWithGoogle;
