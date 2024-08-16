/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const About = () => {
  const stats = [
    { stat: "5,000", sub: "Happy Families" },
    { stat: "8,000", sub: "Lives Saved" },
    { stat: "5", sub: "Years of Helping Find Homes" },
  ];
  return (
    <main className="bg-white px-8 pt-6">
      <section className="text-black flex flex-col lg:flex-row mb-6">
        <div className="flex flex-col max-w-2xl">
          <h1 className="lg:text-6xl sm:mb-16 font-bold mb-10 text-3xl">
            We're helping find homes for animals all over the United States.
          </h1>
          <p className="text-slate-500">
            Welcome to Adopt a Pet, where we're dedicated to connecting loving
            families with pets in need of forever homes. With years of
            experience in animal welfare, we're committed to ensuring a seamless
            adoption process, guiding you through each step, and providing
            post-adoption support. We celebrate the unique bond between humans
            and animals and aim to foster a community of responsible and
            compassionate pet owners. Join us in changing lives—one adoption at
            a time. Thank you for considering Adopt a Pet as your partner in
            this journey.
          </p>
        </div>
        <div className="mx-auto">
          <div className="justify-between mb-6 hidden xl:flex">
            <Image
              className="rounded"
              src="https://images.pexels.com/photos/5122188/pexels-photo-5122188.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="dog"
              width={150}
              height={150}
            />
            <Image
              className="rounded "
              src="https://images.pexels.com/photos/977935/pexels-photo-977935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="dog"
              width={150}
              height={150}
            />

            <Image
              className="rounded"
              src="https://images.pexels.com/photos/1634838/pexels-photo-1634838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="dog"
              width={150}
              height={150}
            />
          </div>
          <Image
            className="rounded  mx-3 xl:mx-auto w-full"
            src="https://images.pexels.com/photos/8498519/pexels-photo-8498519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="dog"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section className="text-black mb-6 flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Our Mission</h1>
          <p className="text-slate-500">
            Our Mission at Adopt a Pet is simple yet profound: to provide every
            pet with a second chance and every family with an opportunity to
            experience the unconditional love and joy that comes from pet
            companionship. We're driven by the belief that adoption not only
            changes the lives of pets but also enriches the lives of those who
            open their hearts and homes. We are dedicated to rescuing,
            rehabilitating, and rehoming animals in need, ensuring their
            well-being every step of the way. Through education, advocacy, and
            community involvement, we aspire to create a world where every pet
            finds a forever home and every home finds a lifelong friend.
            Together, we can make a difference, one adoption at a time.
          </p>
        </div>
        <div className="flex flex-col justify-center w-full">
          <ul className="mt-14 mx-auto">
            {stats.map((stat, index) => {
              return (
                <li key={index} className="mb-4">
                  <h2 className="text-4xl font-bold mb-2">{stat.stat}</h2>
                  <span className="text-slate-500">{stat.sub}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="w-full pb-10">
        <Image
          className="rounded text-center sm:w-1/2 w-full mx-auto"
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          width={1000}
          height={500}
        />
      </section>
    </main>
  );
};
export default About;
