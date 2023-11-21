"use client";
import { useRef, useState } from "react";
import { Dialog, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { FaDog, FaCat } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import useOnClickOutside from "use-onclickoutside";
import { useSession, signOut } from "next-auth/react";

const animals = [
  {
    name: "Dogs",
    description: "Get a better understanding of your traffic",
    href: "/search?type=Dogs&page=1&location=",
    icon: FaDog,
  },
  {
    name: "Cats",
    description: "Speak directly to your customers",
    href: "/search?type=Cats&page=1&location=",
    icon: FaCat,
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    setOpenMenu((prev) => false);
  });

  const { data: session } = useSession();
  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              className="h-8 w-auto"
              width={40}
              height={40}
              src="data:image/png;base64,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"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 relative">
          <button
            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 "
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            Adopt
            <ChevronDownIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </button>
          {menu ? (
            <ul
              className="absolute top-5 -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              ref={dropdownRef}
            >
              <div className="p-4">
                {animals.map((item) => (
                  <li
                    key={item.name}
                    onClick={() => setOpenMenu((prev) => false)}
                  >
                    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-lime-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </ul>
          ) : (
            ""
          )}
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </Link>
          {session && (
            <Link
              href="/account"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Profile
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!session && (
            <Link
              href="/account/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <button className="flex items-center bg-white border-2 border-lime-500 p-2 rounded-lg hover:bg-lime-500 text-black ">
                <UserCircleIcon className="w-5 h-5 me-1" /> Log in
              </button>
            </Link>
          )}
          {session && (
            <button
              className="flex items-center bg-white border-2 border-lime-500 p-2 rounded-lg hover:bg-lime-500 text-black "
              onClick={logoutHandler}
            >
              <UserCircleIcon className="w-5 h-5 me-1" /> Log out
            </button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Adopt Me</span>
              <Image
                className="h-8 w-auto"
                width={40}
                height={40}
                src="data:image/png;base64,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"
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Adopt
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...animals].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/account/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
