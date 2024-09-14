import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Input } from '../ui/input';

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ placeholder = "Search...",value, onChange, onKeyPress }: SearchInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className="relative flex items-center border w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="text-gray-500" size={20} />
        </span>
      <Input
        type="text"
        className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyPress={onKeyPress}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
