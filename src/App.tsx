import React, { useEffect, useState, useCallback } from "react";
import "./styles/global.scss";
import di from "./di";
import PageHeader from "@components/pageHeader";
import FilterCard from "@components/filterCard";
import Card from "@components/card";

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [partnersList, setPartnersList] = useState<any>([]);
  const [categoriesList, setCategoriesList] = useState<any>([]);

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

  return (
    <div className="App">
      <PageHeader />
      {isLoading ? (
        <img src={"/images/loading.svg"} alt="loading" />
      ) : (
        <div className="MiddleContainer">
          <FilterCard categoriesList={categoriesList} />
          <Card />
        </div>
      )}
    </div>
  );
}

export default App;
