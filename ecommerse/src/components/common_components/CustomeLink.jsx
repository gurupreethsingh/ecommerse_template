import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomeLink = ({ linkAddress, linkName }) => {
  const location = useLocation();
  const isExternal = linkAddress.startsWith("http");
  const isActive = location.pathname === linkAddress;

  return (
    <a
      href={linkAddress}
      className={`linkText text-sm transition-colors ${
        isActive
          ? "text-orange-600 font-semibold"
          : "text-gray-700 hover:text-orange-600"
      }`}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
    >
      {linkName}
    </a>
  );
};

export default CustomeLink;
