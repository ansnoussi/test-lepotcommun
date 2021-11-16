import React, { useState, useEffect } from "react";
import css from "./_filterCard.module.scss";
import { IPartnerCategoryEntity } from "@domains/entities/interfaces/iPartnerCategory";

const FilterCard = (prop: {
  categoriesList: IPartnerCategoryEntity[];
  update: () => void;
}) => {
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filters", filters.join("-"));
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();

    window.history.pushState({}, "", newurl);
    prop.update();
  }, [filters]);

  const toggleFilter = (id: string) => {
    let index = filters.indexOf(id);

    if (index > -1) {
      let arr = filters;
      arr.splice(index, 1);
      setFilters([...arr]);
    } else {
      setFilters([...filters, id]);
    }
  };

  return (
    <div className={css.filterCard}>
      <div
        className={`${css.categoryPill} ${
          filters.length === 0 ? css.categoryPillSelected : null
        }`}
        onClick={() => setFilters([])}
      >
        Tous
      </div>

      {prop.categoriesList.map((category) => (
        <div
          key={category.id}
          className={`${css.categoryPill} ${
            filters.includes(category.id.toString())
              ? css.categoryPillSelected
              : null
          }`}
          onClick={() => toggleFilter(category.id.toString())}
        >
          {category.nameKey}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
