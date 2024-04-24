function Athelet() {
  return (
    <div className="relative col-span-12 md:col-span-3 lg:col-span-6 shadow h-56  flex items-end font-[500] justify-center text-xl hover:shadow-md  transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold ">
      <img
        src={athleteStyle?.backgroundImage}
        alt="athelet"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0 ">
        Athlete
      </h2>
    </div>
  );
}

const athleteStyle = {
  backgroundImage:
    "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2020/1/shutterstock_603198743.jpg",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Athelet;
