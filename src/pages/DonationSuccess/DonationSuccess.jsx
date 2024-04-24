import { useEffect, useState } from "react";
import SuccessPng from "/SuccessPng.png";
import { useNavigate } from "react-router-dom";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const DonationSuccess = () => {
  const [counter, setCounter] = useState(3);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosSecure();
  useEffect(() => {
    const amount = localStorage.getItem("DonateAmount");

    if (amount && user?.email) {
      const payload = {
        amount: parseInt(amount),
        userEmail: user?.email,
      };

      const res = axios.post(
        "/3433844a443e80708d701b27c3442d17911a71d7269f6495309237829d82fbc3",
        payload
      );
      if (res) {
        localStorage.removeItem("DonateAmount");
      }
    }
  }, [user?.email, axios]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        clearInterval(interval);
        navigate("/");
      }
    }, 1000);
  }, [counter, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-28 pb-40">
      <div className="border h-[550px] lg:w-1/2   w-full rounded-2xl p-7 mt-10 mx-auto">
        <div className=" flex justify-center">
          <img src={SuccessPng} className="w-96 " alt="Pic" 
          // loading="lazy" 
          
          />
        </div>

        <div className="flex justify-center">
          <div className="text-center">
            <h3>Donation Complete Successfully</h3>
            <p>Wait {counter}</p>
            <p>Redirect To Home</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
