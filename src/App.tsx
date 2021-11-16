import React, { useEffect, useState, useCallback } from "react";
import "./styles/global.scss";
import di from "./di";
import { IPartnerCategoryEntity } from "@domains/entities/interfaces/iPartnerCategory";
import { IPartnerEntity } from "@domains/entities/interfaces/iPartner";
import PageHeader from "@components/pageHeader";
import FilterCard from "@components/filterCard";
import Card from "@components/card";

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [partnersList, setPartnersList] = useState<IPartnerEntity[] | []>([]);
  const [categoriesList, setCategoriesList] = useState<
    IPartnerCategoryEntity[] | []
  >([]);

  const [selectedCategories, setSelectedCqtegories] = useState<string[]>([]);

  const fetchFromAPI = useCallback(async () => {
    setIsLoading(true);

    const [partners, categories] = await Promise.all([
      di.partner.getPartners(),
      di.partnerCategory.getPartnersCategries(),
    ]);

    setIsLoading(false);
    setPartnersList(partners);
    setCategoriesList(categories);
  }, []);

  useEffect(() => {
    fetchFromAPI();
  }, [fetchFromAPI]);

  const updateFilters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = urlParams.get("filters");
    let newFilter = filters ? filters.split("-") : [];
    setSelectedCqtegories([...newFilter]);
  };

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className="App">
      <PageHeader />
      <div className="AppContainer">
        {isLoading ? (
          <img src={"/images/loading.svg"} alt="loading" />
        ) : (
          <div className="MiddleContainer">
            <FilterCard
              categoriesList={categoriesList}
              update={updateFilters}
            />
            <div className="partnersContainer">
              {selectedCategories.length > 0
                ? partnersList
                    .filter(
                      (p) =>
                        p.categories.filter((value) =>
                          selectedCategories.includes(value)
                        ).length > 0
                    )
                    .map((partner: IPartnerEntity) => {
                      return <Card key={partner.id} partner={partner} />;
                    })
                : partnersList.map((partner: IPartnerEntity) => {
                    return <Card key={partner.id} partner={partner} />;
                  })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
