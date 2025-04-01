import React from "react";
import PageHeading from "../../components/common_components/PageHeading";

const VendorDashboard = () => {
  return (
    <div className="fullWidth">
      <PageHeading pageTitle="Vendor Dashboard" />
      <div className="containerWidth my-6">
        <p className="paragraphTextMobile lg:paragraphText">
          Welcome to the Vendor Dashboard. You can manage your products, orders,
          and profile settings here.
        </p>
      </div>
    </div>
  );
};

export default VendorDashboard;
