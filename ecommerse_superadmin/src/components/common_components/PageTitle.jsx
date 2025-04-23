import { useEffect } from "react";

const PageTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = title ? `${title} | ECODERS` : "ECODERS";
  }, [title]);

  return children;
};

export default PageTitle;
