"use client"

import Container from "./container";

const About = () => {
  
  return (
    <Container className="flex items-center md:gap-x-1 justify-between md:justify-start">
      <div>
        <p className="px-3 pt-3 pb-1 text-xl">About Ollomnify</p>
        <p className="px-3 pb-2 text-sm">Ollomnify is setup, because I consider it important that we have the ability to register our plant collection, 
          so we can easily show it to others.</p>
        <p className="px-3 pb-2 text-sm">When we have a small paradise next to our property, with lots of plant species, many perhaps edible, some perhaps 
          very special or endangered, this deserves proper attention, especially when we want to sell the property. I share the opinion that such a paradise 
          should increase the value of the property. This allows potential buyers to make better informed decisions.</p>
        <p className="px-3 pb-2 text-sm">Many people love flowers, a beautiful garden and an abundance of life. Lots of potential buyers are looking keenly 
          for such a paradise, because they love it, would like to take care of it and probably extend it. Plants form the base of the food chain. Do we have 
          many plant species, we will see lots of higher life forms (e.g. bees, butterflies and birds). Many people simply love this.</p>
        <p className="px-3 pb-2 text-sm"> I hope this initiative will be picked up by real estate platforms. They could add an extra selection criterium to 
          their sites (e.g. a biodiversity score ranking from 1 to 5 stars). That would allow potential buyers to select properties based on the life abundancy 
          in the gardens. It even might cause a second-order-effect when people on a large scale find out that they can increase the value of there property 
          simply by adding more plant species to their gardens. Ultimately, that's what I hope and secretly aim for, humble as I am.</p>
      </div>
    </Container>
  );
};

export default About;