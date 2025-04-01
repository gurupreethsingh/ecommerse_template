import React, { useContext } from "react";
import CustomeLink from "../common_components/CustomeLink";
import { AuthContext } from "../../components/auth_components/AuthManager";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const sections = [
    {
      title: "Quick Links",
      links: isLoggedIn
        ? [
            { name: "Home", path: "/home" },
            { name: "About Us", path: "/about-us" },
            { name: "Contact Us", path: "/contact-us" },
          ]
        : [],
    },
    {
      title: "Follow Us",
      links: [
        { name: "Facebook", path: "https://www.facebook.com" },
        { name: "Instagram", path: "https://www.instagram.com" },
        { name: "Twitter", path: "https://www.twitter.com" },
        { name: "LinkedIn", path: "https://www.linkedin.com" },
      ],
    },
    {
      title: "Policies",
      links: [
        { name: "Privacy Policy", path: "#" },
        { name: "Return Policy", path: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-700 text-white pt-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between gap-8">
        {sections.map(
          (section, idx) =>
            section.links.length > 0 && (
              <div key={idx} className="min-w-[150px]">
                <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <CustomeLink
                        linkAddress={link.path}
                        linkName={link.name}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}

        <div className="min-w-[200px]">
          <h2 className="text-lg font-semibold mb-4">Address</h2>
          <p className="text-sm font-medium leading-relaxed">
            ECODERS <br />
            #198, Defence Colony, <br />
            Hesaraghatta Road, <br />
            Bangalore 560073.
          </p>
        </div>
      </div>

      <p className="bg-gray-800 text-white text-center text-xs py-4 mt-8">
        &copy; {new Date().getFullYear()} ECODERS, Bangalore. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
