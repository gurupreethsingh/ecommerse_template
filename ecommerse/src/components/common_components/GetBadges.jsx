export const GetBadges = (product) => {
  const badges = [];

  const createdDate = new Date(product.createdAt);
  const today = new Date();
  const daysSinceAdded = Math.floor(
    (today - createdDate) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceAdded <= 7) {
    badges.push({ label: "New", color: "bg-red-600" });
  }

  if ((product.views ?? 0) > 1000) {
    badges.push({ label: "🛒 Best Seller", color: "bg-green-600" });
  } else if ((product.views ?? 0) > 500) {
    badges.push({ label: "🔥 Hot", color: "bg-red-500" });
  }

  return badges;
};
