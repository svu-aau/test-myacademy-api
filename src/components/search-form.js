import * as React from 'react';
import { searchForm, searchFormHeader } from './search-form.module.css';
import { useRef, useEffect } from 'react';
import { cn } from '../lib/helpers';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const SearchForm = ({ isSearching = false, isHeader, onSubmit, defaultSearchTerm = '', title = 'Search' }) => {
  const [searchTerm, setSearchTerm] = React.useState(defaultSearchTerm);
  const [inputRef, setInputFocus] = useFocus();
  useEffect(() => {
    if (isSearching) {
      setTimeout(() => {
        setInputFocus();
      }, 200);
    }
  });

  const searchAction = (event) => {
    event.preventDefault();
    if (searchTerm === '') {
      return false;
    }
    onSubmit(searchTerm);
    return true;
  };

  const handleChange = (event) => setSearchTerm(event.target.value);

  return (
    <form onSubmit={searchAction} className={cn(searchForm, isHeader && searchFormHeader)}>
      <input ref={inputRef} type="text" name="search_term" value={searchTerm} onChange={handleChange} />
      <button type="submit" name="search">
        {title}
      </button>
    </form>
  );
};

export default SearchForm;
