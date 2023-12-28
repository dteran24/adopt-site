

import { Metadata } from "next";
import ContactComponent from "../components/pages/contact";

export const metadata: Metadata = {
  title: "Search a Pet",
  description: "Look for a pet that needs a home.",
};
const Contact = () => {
  
  return (
    <ContactComponent/>
  );
};
export default Contact;
