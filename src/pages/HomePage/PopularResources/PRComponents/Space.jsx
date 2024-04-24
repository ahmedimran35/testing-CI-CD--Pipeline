function Space() {
    return (
      <div className="relative col-span-12 md:col-span-3  lg:col-span-6  shadow h-56 flex items-end font-[500] justify-center text-xl hover:shadow-md transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold">
        <img
          src={spaceStyle?.backgroundImage}
          alt="space"
          // loading="lazy"
          className="absolute w-full h-full transition delay-75 hover:scale-105"
        />
        <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0">
          Space
        </h2>
      </div>
    );
  }
  
  const spaceStyle = {
    backgroundImage:
      "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  
  export default Space;
  