function Working() {
  return (
    <div className="relative col-span-12 md:col-span-3 lg:col-span-6 shadow h-56 flex items-end font-[500] justify-center text-xl hover:shadow-md transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold">
      <img
        src={workingStyle?.backgroundImage}
        alt="work"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0">
        Working
      </h2>
    </div>
  );
}

const workingStyle = {
  backgroundImage:
    "https://image.cnbcfm.com/api/v1/image/107032274-1647540069295-gettyimages-1084167640-2018_10_13-n1_office_0312.jpeg?v=1647540545&w=929&h=523&vtcrop=y",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Working;
