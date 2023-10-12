import { stat } from "fs";

const About = () => {
  const stats = [
    { stat: "5,000", sub: "Happy Families" },
    { stat: "8,000", sub: "Lives Saved" },
    { stat: "5", sub: "Years of helping find homes" },
  ];
  return (
    <main className="bg-white px-8">
      <section className="text-black flex mb-6">
        <div className="flex flex-col max-w-2xl">
          <h1 className="text-6xl font-bold mb-6">
            We're helping find homes for animals all over the United States.
          </h1>
          <p className="text-slate-400">
            Welcome to [Your Adoption Site Name], where we're dedicated to
            connecting loving families with pets in need of forever homes. With
            years of experience in animal welfare, we're committed to ensuring a
            seamless adoption process, guiding you through each step, and
            providing post-adoption support. We celebrate the unique bond
            between humans and animals and aim to foster a community of
            responsible and compassionate pet owners. Join us in changing
            lives—one adoption at a time. Thank you for considering [Your
            Adoption Site Name] as your partner in this journey.
          </p>
        </div>
        <div className="">Images here</div>
      </section>
      <section className="text-black mb-6 flex flex-row justify-between">
        <div className="flex flex-col max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Our Mission</h1>
          <p className="text-slate-400">
            Our Mission at [Your Adoption Site Name] is simple yet profound: to
            provide every pet with a second chance and every family with an
            opportunity to experience the unconditional love and joy that comes
            from pet companionship. We're driven by the belief that adoption not
            only changes the lives of pets but also enriches the lives of those
            who open their hearts and homes. We are dedicated to rescuing,
            rehabilitating, and rehoming animals in need, ensuring their
            well-being every step of the way. Through education, advocacy, and
            community involvement, we aspire to create a world where every pet
            finds a forever home and every home finds a lifelong friend.
            Together, we can make a difference, one adoption at a time.
          </p>
        </div>
        <div className="flex flex-col me-20 mt-8">
          <ul>
            {stats.map((stat, index) => {
              return (
                <li key={index} className="mb-4">
                  <h2 className="text-4xl font-bold mb-2">{stat.stat}</h2>
                  <span className="text-slate-400">{stat.sub}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section>

      </section>
    </main>
  );
};
export default About;
