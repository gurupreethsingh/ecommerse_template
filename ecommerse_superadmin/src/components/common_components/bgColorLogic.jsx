export const bgColorLogic = (value) => {
  if (value < 5) return "bg-red-100 animate-pulse border border-red-400";
  if (value < 10) return "bg-yellow-100 border border-yellow-400";
  return "bg-gray-100";
};

export default bgColorLogic;
