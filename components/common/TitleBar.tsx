"use client"

import Container from "@/components/common/Container";
import { Input } from "../ui/input";
import { FiSearch } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";
import { RxAvatar } from "react-icons/rx";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import SearchInput from "../other/SearchInput";
import { useRouter } from "next/navigation";

type TitleProps = {
  title: string;
  user: User;
};

const Title = ({ title, user }: TitleProps) => {
  
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(format(now, "eeee, MMMM d, yyyy h:mm:ss a"));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      router.push(`/dashboard/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Container>
      <div className="flex flex-wrap justify-between items-center my-6 z-20 rounded-md shadow-sm dark:bg-black dark:border-b p-1  ">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-start items-center mb-4 md:mb-0">
          <h1 className="text-6xl font-extrabold leading-tight  lg:text-5xl font-cormorant">
            {title}
          </h1>
          <span className="text-xs font-extrabold text-gray-500 mt-2">
            {currentDateTime}
          </span>
        </div>
        {/* middle section */}
        <div className="p-4 max-w-s">
          <SearchInput
            placeholder="Search for items..."
            aria-label="Search for items"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* RIGHT SIDE  */}

        <div className="flex items-center space-x-3 md:space-x-6">
          <Avatar className="w-20 h-20 rounded-full border border-solid  border-gray-300">
            <AvatarImage src={user?.image || "/default-avatar.png"} alt="Profile Photo" />
            <AvatarFallback>{user?.name?.[0] || <RxAvatar size = {50} />}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-lg md:text-xl">
              {user?.name}
              
            </span>
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Title;
