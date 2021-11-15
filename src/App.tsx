import React, { useEffect, useState, useCallback } from "react";
import "./styles/global.scss";
import di from "./di";
import PageHeader from "@components/pageHeader";

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [partnersList, setPartnersList] = useState<any>(null);
  const [categoriesList, setCategoriesList] = useState<any>(null);

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
      <p>Hello</p>
      {isLoading ? <img src={"/images/loading.svg"} /> : null}
    </div>
  );
}

export default App;
