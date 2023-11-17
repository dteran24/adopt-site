import { PiPawPrintLight } from "react-icons/pi";
import { BsHouseHeart } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Link from "next/link";

const Info = () => {
  const cardInfo = [
    {
      icon: "paw",
      title: "Checklist for Adoption",
      subtitle: "Preparing for Your New Family Member",
      link: "https://www.petfinder.com/adopt-or-get-involved/adopting-pets/how-to/adoption-checklist/",
    },
    {
      icon: "help",
      title: "Help Us",
      subtitle: "Support Our Cause and Volunteer",
      link: "https://www.petfinder.com/adopt-or-get-involved/",
    },
    {
      icon: "faq",
      title: "Adoption FAQ",
      subtitle: "Answers to Common Questions",
      link: "https://www.petfinder.com/adopt-or-get-involved/adopting-pets/how-to/pet-adoption-faqs/",
    },
  ];

  const iconMapping: {
    [key: string]: JSX.Element;
    paw: JSX.Element;
    help: JSX.Element;
    faq: JSX.Element;
  } = {
    paw: <PiPawPrintLight className="text-lime-500 text-8xl" />,
    help: <BsHouseHeart className="text-lime-500 text-8xl" />,
    faq: <AiOutlineQuestionCircle className="text-lime-500 text-8xl" />,
  };
  return (
    <section className="mt-10">
      <h1 className="text-4xl text-center text-black">
        Questions for adoption?
      </h1>
      <div className="flex flex-col lg:flex-row justify-center py-8 items-center">
        {cardInfo.map((info, index) => {
          return (
            <div key={index} className="text-black mb-10">
              <div className="flex flex-col gap-y-6 text-center hover:cursor-pointer mx-12">
                <div className="m-auto">{iconMapping[info.icon]}</div>
                <h2 className="text-lime-500 text-2xl">{info.title}</h2>
                <span>{info.subtitle}</span>
                <Link href={info.link} target="_blank">
                  <button className="w-64 hover:cursor-pointer hover:bg-lime-500 hover:text-white text-lime-500 border-2 border-lime-500 rounded-3xl p-2">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Info;
