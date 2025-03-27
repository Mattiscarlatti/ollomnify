"use client"

import Container from "./container";

const Contact = () => {
  
  return (
    <Container className="flex items-center md:gap-x-1 justify-between md:justify-start">
      <div>
        <p className="px-3 pt-3 pb-1 text-xl">Contact</p>
        <p className="px-3 pb-2 text-sm">In case you encounter a mistake or incompleteness in the database and you would like me to change this, then you can <a className="underline" href="mailto:matthias.alexander.007@gmail.com" rel="noopener noreferrer">email</a> me. The same applies to any other reason for contacting me.</p>
      </div>
    </Container>
  );
};

export default Contact;