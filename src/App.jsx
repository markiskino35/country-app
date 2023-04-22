import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBox from "./Components/SearchBox/SearchBox";
import CountryTable from "./Components/CountryTable/CountryTable";

function App() {
  // declare initial state to hold data from api
  const [countries, setCountries] = useState([]);

  // declare initial state for input search box
  const [searchTerm, setSearchTerm] = useState("");

  // fetch data from the api and set data to countries initial state array
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <SearchBox
        value={searchTerm}
        /* pass event listener as a prop to SearchBox
           this event listener will trigger whenever search input changed 
           then use the value to update SearchTerm state
        */
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* 
          pass the data of all countries and search input from user 
          as a prop to CountryTable component 
        */}
      <CountryTable countries={countries} searchTerm={searchTerm} />
    </div>
  );
}

export default App;
