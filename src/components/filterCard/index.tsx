import React from "react";
import css from "./_filterCard.module.scss";
import { IPartnerCategoryEntity } from "@domains/entities/interfaces/iPartnerCategory";

const FilterCard = (prop: { categoriesList: [IPartnerCategoryEntity] }) => {
  return (
    <div className={css.filterCard}>
      <div className={`${css.categoryPill} ${css.categoryPillSelected}`}>
        Tous
      </div>

      {prop.categoriesList.map((category) => (
        <div
          key={category.id}
          className={css.categoryPill}
          onClick={() => console.log(category.id)}
        >
          {category.nameKey}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
