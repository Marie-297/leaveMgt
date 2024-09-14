"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type SearchResult = {
  id: string;
  name: string;
};

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  // const { searchTerm } = query;
  return (
    <div>
      <h1>Search Result for</h1>
    </div>
  );
};

export default SearchResultsPage;
