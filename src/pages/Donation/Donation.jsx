import { useState } from "react";
import H2Title from "../../components/Titles/H2Title";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import ScrollToTop from "../../components/ScrollToTheTop/ScrollToTheTop";
import useAuth from "../../Hooks/useAuth";

const Donation = () => {
  const { user } = useAuth();
  const [selectedDonation, SetSelectedDonation] = useState(50);
  const [minimumDonation] = useState(5);
  const [maxDonation] = useState(100000);

  const donationDefault = [50, 100];
  const navigate = useNavigate();
  const submitHandler = () => {
    localStorage.setItem("DonateAmount", selectedDonation);

    navigate("/payment");
  };

  return (
    <div className="max-w-7xl mx-auto my-20">
      <Helmet>
        <title>Donate to YT Shops</title>
        <meta
          name="description"
          content="Your donation can keep this site free forever"
        />
      </Helmet>
      <H2Title baseText="Donate to" coloredText="YT Shops" />

      <ScrollToTop />
      <div className="lg:flex flex-row justify-evenly lg:gap-10 my-20 pb-20 min-h-fit">
        <div className=" max-w-[550px] mx-auto">
          <h4 className="text-xl font-semibold"> A Message From Our Team </h4>

          <p className="mt-3  text-justify text-sm">


            <h6 className="mb-[5px]"> Hey Creators,</h6>

            YT Shops started with a simple idea - a place where creators like you can find everything you need without paying a dime, saving their time, effort and money. We've always been here to make sure you have the best tools and resources at your fingertips for free. To keep this dream alive and kicking, we’re reaching out for a little support from you, our creative family.
          </p>


          <h4 className="text-xl font-semibold mt-10"> Why Donate? </h4>
          <p className="mt-5  text-justify text-sm">
            <h6 className="font-semibold">Sustain the Ecosystem</h6>
            Your donations are the lifeblood that keeps our services up and running. They help cover the operational costs like server maintenance, which are substantial given the vast amount of content we host.
          </p>
          <p className="mt-5  text-justify text-sm ">
            <h6 className="font-semibold">Reward Contributors</h6>
            While we offer a platform for content creators to share their assets, we believe in giving back to them for their generosity. Your contributions help us support these creative minds who fuel YT Shops.
          </p>
          <p className="mt-5  text-justify text-sm">
            <h6 className="font-semibold">Foster Innovation</h6>
            We are on the cusp of rolling out new AI-driven tools that will revolutionize content creation. Financial contributions accelerate our development efforts, bringing these tools to you faster.
          </p>


        </div>
        <div className="w-full">
          <div className="p-3 gap-5">
            <div className="max-w-[550px] mx-auto flex justify-start gap-5 px-6">
              {donationDefault.map((donation, i) => (
                <div
                  onClick={() => SetSelectedDonation(donation)}
                  key={i}
                  className={`${selectedDonation === donation
                    ? "bg-[#ff0000] text-white"
                    : "bg-slate-200"
                    } w-20  h-8 rounded-md text-sm flex justify-center items-center cursor-pointer`}
                >
                  {donation} USD
                </div>
              ))}
            </div>
            <div className="  mt-5 lg:w-[500px] mx-auto  relative">
              <input
                data-test="donation-field"
                type="number"
                required
                value={selectedDonation}
                onChange={(e) => SetSelectedDonation(e.target.value)}
                placeholder="Enter Amount"
                className="relative w-full font-bold h-12 px-4 text-sm placeholder-transparent transition-all border rounded-md outline-none peer border-slate-200 text-black autofill:bg-white  focus:border-[#ff0000] focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-black"
              />

              {!user && (
                <small className="ml-1 text-[#ff0000]">
                  Please login to donation
                </small>
              )}
              <br />
              {selectedDonation < minimumDonation && (
                <small className="ml-1 text-[#ff0000]">
                  {" "}
                  Minimum Donation Amount ${minimumDonation}{" "}
                </small>
              )}
              {selectedDonation > maxDonation && (
                <small className="ml-1 text-[#ff0000]">
                  {" "}
                  Maximum Donation Amount $ 100k{" "}
                </small>
              )}

              <label className="absolute left-2 -top-2 z-[1] px-2 text-xs text-black transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-sm peer-required:after:text-[#ff0000] peer-required:after:content-['\00a0*'] peer-invalid:text-[#ff0000] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-black peer-disabled:before:bg-transparent">
                Enter The Amount You Want to Donate ($)
              </label>
            </div>
            <div className=" flex justify-center mt-4">
              <button
                data-test="donation-button"
                onClick={() => submitHandler()}
                disabled={
                  !user ||
                  selectedDonation < minimumDonation ||
                  selectedDonation > maxDonation
                }
                className={`inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs md:text-[12px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap  uppercase  ${!user || selectedDonation < 5
                  ? "bg-red-300 hover:cursor-not-allowed"
                  : "bg-[#ff0000] hover:bg-[#C21807] hover:cursor-pointer hover:shadow-2xl "
                  }`}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
