const AmbassadorCard = ({ ambassadorInfo }: any) => {
  return (
    <div className="group w-1/4 h-[600px] bg-red-400 overflow-hidden rounded-xl relative">
      <img
        className="w-full h-full object-cover"
        src={ambassadorInfo.image.url}
        alt={ambassadorInfo.product.name}
      />
      <div
        className="text-white bg-gray-700 bg-opacity-35 p-2 text-xl font-semibold rounded-xl
        absolute bottom-0 left-0 w-full h-1/5
        transition-all duration-700 ease-in-out group-hover:translate-y-0 translate-y-[100%]"
      >
        {ambassadorInfo.name} - {ambassadorInfo.product.name}
      </div>
    </div>
  );
};

export default AmbassadorCard;
