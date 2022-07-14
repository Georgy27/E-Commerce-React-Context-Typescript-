import React from "react";

import { PageHero } from "../../components";
import aboutImg from "../../assets/hero-bcg.jpeg";
import Wrapper from "./AboutPage.styles";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="About" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"> </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta
            minus molestiae vel beatae natus eveniet ratione temporibus aperiam
            harum alias officiis assumenda officia quibusdam deleniti eos
            cupiditate dolore doloribus!
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

export default AboutPage;
