import React, { useState } from "react";
import "./CountryTable.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const CountryTable = (props) => {
  const { countries, searchTerm } = props;
  const [sortOrder, setSortOrder] = useState("asc");

  //Filtering data for search feature
  const filterCountries = countries
    .filter((country) => {
      if (!searchTerm) {
        return true;
      }

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
    })
    //sort table
    .sort((a, b) => {
      if (sortOrder.column === "name") {
        if (sortOrder.order === "asc") {
          return a.name.common.localeCompare(b.name.common);
        } else {
          return b.name.common.localeCompare(a.name.common);
        }
      } else if (sortOrder.column === "region") {
        if (sortOrder.order === "asc") {
          return a.region.localeCompare(b.region);
        } else {
          return b.region.localeCompare(a.region);
        }
      } else if (sortOrder.column === "capital") {
        if (sortOrder.order === "asc") {
          return a.capital && b.capital
            ? a.capital[0].localeCompare(b.capital[0])
            : 0;
        } else {
          return a.capital && b.capital
            ? b.capital[0].localeCompare(a.capital[0])
            : 0;
        }
      }
      return 0;
    });

  const handleSort = (column) => {
    if (sortOrder.column === column) {
      setSortOrder({
        ...sortOrder,
        order: sortOrder.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortOrder({ column, order: "asc" });
    }
  };

  //string highlight function
  function highlightMatches(str, query) {
    if (query === "") {
      return str;
    }
    const regex = new RegExp(`(${query})`, "gi");
    return str
      .split(regex)
      .map((part, index) =>
        part.match(regex) ? <mark key={index}>{part}</mark> : part
      );
  }

  return (
    <>
      {filterCountries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Country Name{" "}
                {sortOrder.column === "name" ? (
                  sortOrder.order === "asc" ? (
                    <KeyboardArrowUpIcon className="sort_icon" />
                  ) : (
                    <KeyboardArrowDownIcon className="sort_icon" />
                  )
                ) : (
                  <UnfoldMoreIcon className="sort_icon" />
                )}
              </th>
              <th onClick={() => handleSort("region")}>
                Region{" "}
                {sortOrder.column === "region" ? (
                  sortOrder.order === "asc" ? (
                    <KeyboardArrowUpIcon className="sort_icon" />
                  ) : (
                    <KeyboardArrowDownIcon className="sort_icon" />
                  )
                ) : (
                  <UnfoldMoreIcon className="sort_icon" />
                )}
              </th>
              <th onClick={() => handleSort("capital")}>
                Capital City{" "}
                {sortOrder.column === "capital" ? (
                  sortOrder.order === "asc" ? (
                    <KeyboardArrowUpIcon className="sort_icon" />
                  ) : (
                    <KeyboardArrowDownIcon className="sort_icon" />
                  )
                ) : (
                  <UnfoldMoreIcon className="sort_icon" />
                )}
              </th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {filterCountries.map((country) => (
              <tr key={country.cca3}>
                <td>{highlightMatches(country.name.common, searchTerm)}</td>
                <td>{country.region}</td>
                <td>
                  {highlightMatches(
                    country.capital?.join(", ") || "",
                    searchTerm
                  )}
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
