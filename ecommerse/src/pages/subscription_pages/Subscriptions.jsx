import React, { useState, useEffect } from "react";
import axios from "axios";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3006/api/all-subscriptions"
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const toggleSubscription = async (email, isActive) => {
    if (isActive) {
      const confirmUnsubscribe = window.confirm(
        "Are you sure you want to unsubscribe?"
      );
      if (!confirmUnsubscribe) return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3006/api/${isActive ? "unsubscribe" : "resubscribe"}`,
        { email }
      );

      // Alert user based on action
      if (!isActive) {
        alert("You have successfully subscribed!");
      } else {
        alert("You have successfully unsubscribed.");
      }

      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Subscription List
        </h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed On
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unsubscribed On
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr
                  key={subscription._id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subscription.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscription.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-400 text-red-800"
                      }`}
                    >
                      {subscription.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subscription.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscription.canceledAt
                      ? new Date(subscription.canceledAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() =>
                        toggleSubscription(
                          subscription.email,
                          subscription.isActive
                        )
                      }
                      className={`px-4 py-2 text-sm font-medium rounded ${
                        subscription.isActive
                          ? "bg-red-100 hover:bg-red-600 hover:text-white"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {subscription.isActive ? "Unsubscribe" : "Resubscribe"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
