import React, { useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
    <div className="flex  w-full items-center py-10 px-1 mt-4">
   
      <form onSubmit={handleSearch} className="flex-1 relative">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type location / Address"
          className="w-full pl-4 pr-12"
        />

<div className="absolute z-100 right-0 top-0 flex items-center h-full pr-2">
          <Button
            type="button"
            variant="ghost" // Optional: makes the button blend with the input
            size="sm" // Optional: smaller size for the button
          >
            <Search size={16} /> {/* Using a search icon */}
          </Button>
        </div>
        

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
