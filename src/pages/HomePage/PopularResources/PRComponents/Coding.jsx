function Coding() {
  return (
    <div 
      className="relative col-span-12 md:col-span-6 lg:col-span-3 shadow h-56 flex items-end font-[500] justify-center text-xl hover:shadow-md transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold"
    >
      <img
        src={codingStyle?.backgroundImage}
        alt="coding"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0">
        Coding
      </h2>
    </div>
  );
}

const codingStyle = {
  backgroundImage:
    "https://cdn.pixabay.com/photo/2017/06/23/10/48/code-2434271_640.jpg",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Coding;
