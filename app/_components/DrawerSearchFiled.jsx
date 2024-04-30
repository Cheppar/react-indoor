import React, { useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DrawerSearchField = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const provider = new OpenStreetMapProvider();

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.trim()) {
      const results = await provider.search({ query: newQuery });
      setSuggestions(results.slice(0, 5)); // Limit to top 5 suggestions
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const results = await provider.search({ query });
      onSearch(results); // Pass results to the parent component (e.g., OsMap)
      console.log(results[0]);
      setQuery("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.label); // Update the input with the selected suggestion
    setSuggestions([]); // Clear the suggestions
  };

  return (
    <div className="relative px-2 py-2 h-[200px]">
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type location / Address"
          className="mr-2"
        />
        <Button type="submit">Search</Button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrawerSearchField;
