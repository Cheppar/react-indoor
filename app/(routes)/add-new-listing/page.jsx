"use client";
import React from "react";
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

function AddNewListing() {
  return (
    <div className="p-10 flex flex-col mt-10 gap-5 items-center justify-center">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className='flex justify-center items-center' >Create Profile</CardTitle>
            <CardDescription className='flex justify-center items-center'>
              Where does your client reside?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <DrawerSearchField />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>

            <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
            <Button>Next</Button>
          </CardFooter>
           
          </CardContent>
          
        </Card>
      </div>
    </div>
  );
}

export default AddNewListing;
