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
    { title: "Adopt a Pet", url: "/search?type=&breed=Any&location&page=1" },
  ];
  const icons = [
    { site: "facebook", url: "https://www.facebook.com/Petfinder/" },
    { site: "instagram", url: "https://www.instagram.com/petfinder/?hl=en" },
    { site: "twitter", url: "https://twitter.com/petfinder?lang=en" },
    { site: "tiktok", url: "https://www.tiktok.com/@petfinderofficial" },
  ];
  const iconMapping: {
    [key: string]: JSX.Element;
    facebook: JSX.Element;
    instagram: JSX.Element;
    twitter: JSX.Element;
    tiktok: JSX.Element;
  } = {
    facebook: <BsFacebook className="text-xl" />,
    instagram: <BsInstagram className="text-xl" />,
    twitter: <BsTwitter className="text-xl" />,
    tiktok: <BsTiktok className="text-xl" />,
  };
  return (
    <footer className="flex flex-col bg-slate-100 text-black py-1">
      <ul className="sm:w-1/2 sm:mx-auto flex justify-around  my-2">
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
      <ul className="sm:w-1/4 sm:mx-auto flex justify-around my-2">
        {icons.map((icon, index) => {
          return (
            <Link href={icon.url} key={index} target="_blank">
              <li
                className="hover:cursor-pointer hover:text-lime-500"
              >
                {iconMapping[icon.site]}
              </li>
            </Link>
          );
        })}
      </ul>
      <span className="text-center mt-2">
        © 2024 Adopt A Pet, Inc. All rights reserved.
      </span>
    </footer>
  );
};
export default Footer;
