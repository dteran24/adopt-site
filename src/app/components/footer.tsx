import Link from "next/link";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsSnapchat,
  BsTiktok,
} from "react-icons/bs";
const Footer = () => {
  const sections = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Contact Us", url: "/contact" },
    { title: "Adopt a Pet", url: "/search" },
  ];
  const icons = ["facebook", "instagram", "twitter", "snapchat", "tiktok"];
  const iconMapping: {
    [key: string]: JSX.Element;
    facebook: JSX.Element;
    instagram: JSX.Element;
    twitter: JSX.Element;
    snapchat: JSX.Element;
    tiktok: JSX.Element;
  } = {
    facebook: <BsFacebook className="text-xl" />,
    instagram: <BsInstagram className="text-xl" />,
    twitter: <BsTwitter className="text-xl" />,
    snapchat: <BsSnapchat className="text-xl" />,
    tiktok: <BsTiktok className="text-xl" />,
  };
  return (
    <footer className="flex flex-col bg-slate-100 text-black py-5">
      <ul className=" w-1/2 flex justify-around mx-auto py-5">
        {sections.map((item, index) => {
          return (
            <Link href={item.url} key={index}>
              <li className="hover:cursor-pointer hover:text-lime-500">
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
      <ul className="w-1/4 flex justify-around mx-auto py-5">
        {icons.map((icon, index) => {
          return (
            <li
              key={index}
              className="hover:cursor-pointer hover:text-lime-500"
            >
              {iconMapping[icon]}
            </li>
          );
        })}
      </ul>
      <span className="text-center py-5">
        © 2020 Your Company, Inc. All rights reserved.
      </span>
    </footer>
  );
};
export default Footer;
