import React from "react";
import Hero from "./mainComponents/Hero";
import Brief from "./mainComponents/Brief";
import Processes from "./mainComponents/Processes";
import Template from "./mainComponents/Template";
import Feature from "./mainComponents/Feature";
import WhyUs from "./mainComponents/WhyUs";
import Pricing from "./mainComponents/Pricing";
import FAQ from "./mainComponents/FAQ";

function MainContent() {
  return (
    <main className="bg-black text-white">
      <Hero></Hero>
      <Brief></Brief>
      <Processes></Processes>
      <Template></Template>
      <Feature></Feature>
      <WhyUs></WhyUs>
      <Pricing></Pricing>
      <FAQ></FAQ>
    </main>
  );
}

export default MainContent;
