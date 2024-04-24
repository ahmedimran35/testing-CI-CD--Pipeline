import Cookies from "js-cookie";
export function signSn(googleSignIn, axios, Toast, navigate) {
  googleSignIn().then((result) => {
    const user = result?.user;

    const userBody = {
      name: user?.displayName,
      email: user?.email,
    };
    axios
      .post("/auth/signin", userBody)
      .then(() => {
        navigate("/");
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        Cookies.set("email", user?.email);
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Signed in failed",
        });
      });
  });
}
