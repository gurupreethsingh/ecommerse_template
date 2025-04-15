// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
// } from "@headlessui/react";
// import {
//   ArrowPathIcon,
//   Bars3Icon,
//   ChartPieIcon,
//   CursorArrowRaysIcon,
//   FingerPrintIcon,
//   SquaresPlusIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   PhoneIcon,
//   PlayCircleIcon,
// } from "@heroicons/react/20/solid";

// const products = [
//   {
//     name: "Analytics",
//     description: "Get a better understanding of your traffic",
//     href: "#",
//     icon: ChartPieIcon,
//   },
//   {
//     name: "Engagement",
//     description: "Speak directly to your customers",
//     href: "#",
//     icon: CursorArrowRaysIcon,
//   },
//   {
//     name: "Security",
//     description: "Your customers’ data will be safe and secure",
//     href: "#",
//     icon: FingerPrintIcon,
//   },
//   {
//     name: "Integrations",
//     description: "Connect with third-party tools",
//     href: "#",
//     icon: SquaresPlusIcon,
//   },
//   {
//     name: "Automations",
//     description: "Build strategic funnels that will convert",
//     href: "#",
//     icon: ArrowPathIcon,
//   },
// ];
// const callsToAction = [
//   { name: "Watch demo", href: "#", icon: PlayCircleIcon },
//   { name: "Contact sales", href: "#", icon: PhoneIcon },
// ];

// export default function Example() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white">
//       <nav
//         aria-label="Global"
//         className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//       >
//         <div className="flex lg:flex-1">
//           <a href="#" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img
//               alt=""
//               src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//               className="h-8 w-auto"
//             />
//           </a>
//         </div>
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="size-6" />
//           </button>
//         </div>
//         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <Popover className="relative">
//             <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
//               Product
//               <ChevronDownIcon
//                 aria-hidden="true"
//                 className="size-5 flex-none text-gray-400"
//               />
//             </PopoverButton>

//             <PopoverPanel
//               transition
//               className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
//             >
//               <div className="p-4">
//                 {products.map((item) => (
//                   <div
//                     key={item.name}
//                     className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
//                   >
//                     <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
//                       <item.icon
//                         aria-hidden="true"
//                         className="size-6 text-gray-600 group-hover:text-indigo-600"
//                       />
//                     </div>
//                     <div className="flex-auto">
//                       <a
//                         href={item.href}
//                         className="block font-semibold text-gray-900"
//                       >
//                         {item.name}
//                         <span className="absolute inset-0" />
//                       </a>
//                       <p className="mt-1 text-gray-600">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
//                 {callsToAction.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
//                   >
//                     <item.icon
//                       aria-hidden="true"
//                       className="size-5 flex-none text-gray-400"
//                     />
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </PopoverPanel>
//           </Popover>

//           <a href="#" className="text-sm/6 font-semibold text-gray-900">
//             Features
//           </a>
//           <a href="#" className="text-sm/6 font-semibold text-gray-900">
//             Marketplace
//           </a>
//           <a href="#" className="text-sm/6 font-semibold text-gray-900">
//             Company
//           </a>
//         </PopoverGroup>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="#" className="text-sm/6 font-semibold text-gray-900">
//             Log in <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </nav>
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt=""
//                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//                 className="h-8 w-auto"
//               />
//             </a>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 <Disclosure as="div" className="-mx-3">
//                   <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
//                     Product
//                     <ChevronDownIcon
//                       aria-hidden="true"
//                       className="size-5 flex-none group-data-open:rotate-180"
//                     />
//                   </DisclosureButton>
//                   <DisclosurePanel className="mt-2 space-y-2">
//                     {[...products, ...callsToAction].map((item) => (
//                       <DisclosureButton
//                         key={item.name}
//                         as="a"
//                         href={item.href}
//                         className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
//                       >
//                         {item.name}
//                       </DisclosureButton>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                 >
//                   Features
//                 </a>
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                 >
//                   Marketplace
//                 </a>
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                 >
//                   Company
//                 </a>
//               </div>
//               <div className="py-6">
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                 >
//                   Log in
//                 </a>
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }

//

"use client";

import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../components/auth_components/AuthManager";
import CustomeLink from "../common_components/CustomeLink";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false); // Close dropdown
    logout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate(`/profile/${user.id}`);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dashboardRoute = useMemo(() => {
    if (!user?.role) return "/dashboard";
    const roleRoutes = {
      admin: "/admin-dashboard",
      superadmin: "/superadmin-dashboard",
      employee: "/employee-dashboard",
      vendor: "/vendor-dashboard",
      delivery_person: "/delivery-dashboard",
      outlet: "/outlet-dashboard",
    };
    return roleRoutes[user.role] || "/dashboard";
  }, [user?.role]);

  const navLinks = useMemo(() => {
    if (!isLoggedIn) return [];
    return [
      { path: "/home", name: "Home" },
      { path: "/about-us", name: "About Us" },
      { path: "/contact-us", name: "Contact Us" },
      { path: dashboardRoute, name: "Dashboard" },
    ];
  }, [isLoggedIn, dashboardRoute]);

  const renderLinks = () =>
    navLinks.map((link) => (
      <CustomeLink
        key={link.path}
        linkAddress={link.path}
        linkName={link.name}
      />
    ));

  return (
    <header>
      {/* Desktop Header */}
      <nav className="bg-white" aria-label="Global">
        <div className="containerWidth flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <CustomeLink linkAddress="/home" linkName="HMS" />
          </div>

          {/* Hamburger Menu */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:gap-x-8">{renderLinks()}</div>

          {/* Right: Login/Profile */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 font-medium linkText"
                >
                  {user.name}
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 text-gray-800">
                    <button
                      onClick={goToProfile}
                      className="block w-full text-left px-4 py-2 smallText hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 smallText text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <CustomeLink linkAddress="/login" linkName="Login" />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm bg-gray-100 linkText px-6 py-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <CustomeLink linkAddress="/home" linkName="LOGO" />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 linkText"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                <div className="flex flex-col gap-3 linkTextMobile">
                  {renderLinks()}
                </div>
              </div>

              <div className="py-6">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        goToProfile();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-semibold hover:bg-gray-800 hover:text-gray-50 paragraphTextMobile"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-semibold text-red-400 hover:bg-gray-700 paragraphTextMobile"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <CustomeLink linkAddress="/login" linkName="Login" />
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
