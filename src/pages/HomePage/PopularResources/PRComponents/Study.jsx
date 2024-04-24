function Study() {
  return (
    <div className="relative col-span-12 md:col-span-3 shadow h-56 flex items-end font-[500] justify-center text-xl hover:shadow-md transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold">
      <img
        src={studyStyle?.backgroundImage}
        alt="study"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0">
        Study
      </h2>
    </div>
  );
}

const studyStyle = {
  backgroundImage:
    "https://t4.ftcdn.net/jpg/04/30/26/81/360_F_430268143_vgIE6L3H5JRxpqeAP1QBm2s2fOYmRNDC.jpg",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Study;
