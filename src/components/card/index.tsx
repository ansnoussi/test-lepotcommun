import React, { useState } from "react";
import css from "./_card.module.scss";
import { IPartnerEntity } from "@domains/entities/interfaces/iPartner";

const Card = (prop: { partner: IPartnerEntity }) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  const goToPartner = () => {
    console.log(prop.partner.id);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${prop.partner.mobileImageUrl}) `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={css.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className={css.partnerContent}>
          <div className={css.logoContainer}>
            <img className={css.logo} src={prop.partner.logoUrl} alt="logo" />
          </div>
          <div className={css.descriptionContainer}>
            <p>{prop.partner.desc}</p>
            <div onClick={goToPartner} className={css.button}>
              {"Choisir >"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
