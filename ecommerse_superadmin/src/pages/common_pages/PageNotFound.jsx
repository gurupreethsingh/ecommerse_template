import React from "react";

const PageNotFound = () => {
  return (
    <div className="fullWidth flex flex-col items-center justify-center text-centermt-5 mb-5">
      <h1 className="headingTextMobile lg:headingText mt-5">404</h1>
      <p className="paragraphTextMobile lg:headingText m-5">Page not found</p>
      <a href="/home" className="linkTextMobile lg:linkText m-2">
        Back To Homepage.
      </a>
    </div>
  );
};

export default PageNotFound;
