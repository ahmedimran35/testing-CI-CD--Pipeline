import PropTypes from "prop-types";
const InfoCard = ({ info }) => {
  return (
    <div className="p-6 rounded-xl overflow-hidden text-center bg-white shadow-md hover:shadow-lg text-black shadow-slate-200 flex flex-row items-center justify-between border-[1px]">
      <div className="w-full h-24 flex flex-col items-start justify-start gap-2 ">
        <span className="tracking-tight text-lg font-medium text-zinc-600">
          {info?.name}
        </span>
        <span className="text-4xl font-bold">
          {info?.prefix}
          {info?.number}
        </span>
        <span className="text-sm text-zinc-600">
          <span className="text-[#ff0000]">+{info?.monthly}</span> {info?.text}
        </span>
      </div>

      <div className="h-24 flex flex-col justify-start items-start text-zinc-700 py-2">
        {info.icon}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  info: PropTypes.object,
};
export default InfoCard;
