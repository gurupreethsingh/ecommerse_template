import {
  FaUsers,
  FaUserShield,
  FaUserPlus,
  FaUserCheck,
  FaCog,
  FaBoxOpen,
  FaStore,
  FaBuilding,
  FaLayerGroup,
  FaBoxes,
  FaList,
  FaThLarge,
} from "react-icons/fa";

const iconMap = {
  admin: <FaUserCheck className="text-indigo-600 text-3xl" />,
  superadmin: <FaUserShield className="text-red-500 text-3xl" />,
  user: <FaUserPlus className="text-green-600 text-3xl" />,
  developer: <FaCog className="text-purple-600 text-3xl" />,
  vendor: <FaStore className="text-orange-600 text-3xl" />,
  outlet: <FaBuilding className="text-blue-500 text-3xl" />,
  delivery_person: <FaBoxOpen className="text-teal-500 text-3xl" />,
  totalUsers: <FaUsers className="text-blue-600 text-3xl" />,
  category: <FaLayerGroup className="text-yellow-600 text-3xl" />,
  product: <FaBoxes className="text-green-600 text-3xl" />,
  categories: <FaList className="text-green-500 text-3xl"/>,
  subcategories: <FaThLarge className="text-red-600 text-3xl"/>,
};

export default iconMap;
