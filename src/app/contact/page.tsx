

import { Metadata } from "next";
import ContactComponent from "../components/pages/contact";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact us for any questions and assistance.",
};
const Contact = () => {
  
  return (
    <ContactComponent/>
  );
};
export default Contact;
