const DashboardCard = ({ card, view, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded transition duration-200 shodow-sm hover:shadow-lg ${
        card.bgColor
      } ${
        view === "card"
          ? "p-6 flex flex-col items-center text-center shadow"
          : view === "grid"
          ? "p-4 flex flex-col"
          : "p-4 flex items-center justify-between"
      }`}
    >
      <div
        className={`${
          view === "list"
            ? "flex items-center gap-4"
            : "flex items-center justify-between w-full"
        }`}
      >
        <div>
          <p className="subHeadingText mb-1">{card.title}</p>
          <p className="text-xl font-bold text-gray-800">{card.value}</p>
        </div>
        <div>{card.icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
