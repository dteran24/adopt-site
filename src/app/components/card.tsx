import { Pet } from "../models/pet";

interface props {
  pet: Pet;
}

const Card = (cardProps: props) => {
  const { pet } = cardProps;
  const imageStyle = {
    backgroundImage: `url(${pet.img})`,
  };
  return (
    <div className="bg-white rounded-lg w-72">
      <div
        className="w-full h-96 bg-cover bg-center rounded-t-lg" style={imageStyle}
      ></div>
      <h2 className="text-black text-center">{pet.name}</h2>
    </div>
  );
};
export default Card;
