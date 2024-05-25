"use client";
import React, { useState } from "react";
import DrawerSearchField from "@/app/_components/DrawerSearchFiled";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader } from "lucide-react";



function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false)

  const nextHandler = async () => {
    setLoader(true);
    console.log(selectedAddress, coordinates);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress,
          coordinates: coordinates,
          //createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    if (data) {
      setLoader(false)
      console.log("New Data Added", data);
      toast("New listing added");
    
    }
    if (error) {
      setLoader(false)
      console.log(error);
      toast(error)
    }
  };

  return (
    <div className="p-10 flex flex-col mt-10 gap-5 items-center justify-center">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex justify-center items-center">
              Probationer Residence
            </CardTitle>
            <CardDescription className="flex justify-center items-center">
              Where does your client reside?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <DrawerSearchField
                    selectedAddress={(value) => setSelectedAddress(value)}
                    setCoordinates={(value) => setCoordinates(value)}
                  />
                  
                  
                  
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>

            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button
                disabled={!selectedAddress || !coordinates || loader}
                onClick={nextHandler}
              >
                {loader?<Loader className="animate-spin"/>:'Next'}
              
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

export default AddNewListing;
