import React from "react";
import CompanyDescription from "./components/CompanyDescription";
import KeyBenefits from "./components/KeyBenefits";
import style from "./AboutPage.module.scss";

const AboutUsPage: React.FC = () => {
  return (
    <div className={style.about}>
        <CompanyDescription/>
        <KeyBenefits/>
    </div>
  );
};

export default AboutUsPage;
