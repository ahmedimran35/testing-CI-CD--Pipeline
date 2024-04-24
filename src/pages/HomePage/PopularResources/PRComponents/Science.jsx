function Science() {
  return (
    <div 
      className="relative col-span-12 md:col-span-3 lg:col-span-4 shadow h-56 flex items-end font-[500] justify-center text-xl hover:shadow-md transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold"
    >
      <img
        src={scienceStyle?.backgroundImage}
        alt="science"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0">
        Science
      </h2>
    </div>
  );
}

const scienceStyle = {
  backgroundImage:
    "https://www.simplilearn.com/ice9/free_resources_article_thumb/Science_stream_jobs.jpg",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Science;
