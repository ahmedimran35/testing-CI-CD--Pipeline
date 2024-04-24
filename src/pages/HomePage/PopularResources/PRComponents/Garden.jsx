function Garden() {
  return (
    <div className="relative col-span-12 md:col-span-6 lg:col-span-8 shadow h-56  flex items-end font-[500] justify-center text-xl hover:shadow-md  transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold ">
      <img
        src={gardenStyle?.backgroundImage}
        alt="garden"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0 ">
        Garden
      </h2>
    </div>
  );
}

const gardenStyle = {
  backgroundImage:
    "https://t4.ftcdn.net/jpg/05/70/46/49/360_F_570464993_zCaOcgprClFB2kO9U9qudg5N8pJ4YAvY.jpg",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Garden;
