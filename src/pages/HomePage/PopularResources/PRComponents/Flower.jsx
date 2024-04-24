function Flower() {
  return (
    <div 
      className="relative col-span-12 md:col-span-6 lg:col-span-8 shadow h-56  flex items-end font-[500] justify-center text-xl hover:shadow-md  transition delay-75 rounded-md overflow-hidden bg-cover bg-no-repeat flex-col hover:brightness-75 hover:font-semibold"
    >
      <img
        src={flowerPhotoStyle?.backgroundImage}
        alt="flower"
        // loading="lazy"
        className="absolute w-full h-full transition delay-75 hover:scale-105"
      />
      <h2 className="text-white p-1 bg-gradient-to-t from-slate-800  w-full px-2 rounded-md text-center absolute z-10 bottom-0 ">
        Flower
      </h2>
    </div>
  );
}

const flowerPhotoStyle = {
  backgroundImage:
    "https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707300000&semt=sph",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default Flower;
