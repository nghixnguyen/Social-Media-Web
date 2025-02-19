import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import _ from 'lodash';

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      const results = response.data.filter((user) => {
        return (
          value &&
          user &&
          user.name &&
          user.name.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const debouncedFetchData = _.debounce(fetchData, 300);

  useEffect(() => {
    debouncedFetchData(input);
  }, [input, debouncedFetchData]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Find Friends here"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
