import React from "react";
import "./CountryTable.scss";

const CountryTable = (props) => {
  const { countries, searchTerm } = props;

  //Filtering data for search feature
  const filterCountries = countries.filter((country) => {
    /* if no input from user which mean searchTerm is empty, 
       then return current country (all country)
    */
    if (!searchTerm) {
      return true;
    }
    /*
       use toLowerCase method to ensure that the search is case-insensitive and 
       any matching country will be found regardless of the case of the letters
    */
    const name = country.name.common.toLowerCase();
    /*
       check whether country have capital city if so check if capital have more
       than one capital city (array)
    */
    const capital = country.capital?.[0]?.toLowerCase();
    //return the country name or capital city that is same with search input (searchTerm)
    return (
      name.includes(searchTerm.toLowerCase()) ||
      capital?.includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      {/* 
        use conditional rendering using ternary operator 
        if there is data inside filterCountries array then render 
        table of filterCountries data, else render error message
      */}
      {filterCountries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Region</th>
              <th>Capital City</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {/*  
                cca3, name.common, region, capital, flag are the properties of 
                object from the rest country api 
            */}
            {filterCountries.map((country) => (
              <tr key={country.cca3}>
                <td>{country.name.common}</td>
                <td>{country.region}</td>
                <td>
                  {/* seperate capital name with comma if there is more than one capital */}
                  {Array.isArray(country.capital)
                    ? country.capital.join(", ")
                    : country.capital}
                </td>
                <td>
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    width="60"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="error">No matching country</p>
      )}
    </>
  );
};

export default CountryTable;
