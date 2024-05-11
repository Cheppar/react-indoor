import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchCheck ,LocateFixed , BadgeDollarSign, MapPin, Route } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import DrawerSearchField from "./DrawerSearchFiled";
import AddressSearch from "./AddressSearch";

const Touchbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer open/closed state
  const [selectedTab, setSelectedTab] = useState(""); // State to track selected tab
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  

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

  // Function to open the drawer and set the selected tab
  const openDrawerWithTab = (tab) => {
    setSelectedTab(tab); // Set the selected tab
    setIsDrawerOpen(true); // Open the drawer
  };

  return (
    <div className="relative py-2 px-10 flex justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger
            value="renting"
            onClick={() => openDrawerWithTab("renting")}
            variant="outline"
          >
            <div className="transition-transform duration-300 ease-in-out hover:rotate-180">
              <SearchCheck className="mr-2" />
            </div>
            Search
          </TabsTrigger>

          <TabsTrigger
            value="listing"
            onClick={() => openDrawerWithTab("listing")}
          >
            <LocateFixed className="mr-2" />
            Locate Me
          </TabsTrigger>

          <TabsTrigger
            value="password"
            onClick={() => openDrawerWithTab("buying")}
          >
           <Route className="mr-2" />
            Routing
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Conditional rendering based on selectedTab */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            {selectedTab === "renting" && (
              <>
                <DrawerTitle>Search</DrawerTitle>
                <DrawerDescription>
                  Type your location or address
                <DrawerSearchField />
                </DrawerDescription>
              </>
            )}
            {selectedTab === "listing" && (
              <>
                <DrawerTitle>Find your location</DrawerTitle>
                <DrawerDescription>
                   Enable device location to access this service.
                </DrawerDescription>
                <Button> 
                    <div className="mr-2"><LocateFixed /></div>
                     Locate</Button>
              </>
            )}
            {selectedTab === "buying" && (
              <>
                <DrawerTitle>Routing Service</DrawerTitle>
                <DrawerDescription>Route to your desired Apartment.</DrawerDescription>
                <AddressSearch />
                <div>
                <Button className='flex justify-center items-center'><MapPin />Select on map</Button>
                </div>
                
              </>
            )}
          </DrawerHeader>

          <DrawerFooter>
          
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Touchbar;
