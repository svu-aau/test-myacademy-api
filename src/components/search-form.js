import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import * as JsSearch from 'js-search';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { cn } from '../lib/helpers';
import { searchSection, searchResult } from './search-form.module.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: `${theme.spacing(1)}px auto 24px auto`,
      width: '60rem',
      position: 'relative',
    },
    '& .MuiInputBase-root': {
      color: 'white',
      fontSize: '24px',
      height: '3.125rem',
      padding: '1rem .5rem',
    },
    '& .MuiInput-underline': {
      '&:before, &:after': {
        borderBottom: '2px solid white',
      },
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid white',
    },
    '& .MuiInputAdornment-root': {
      cursor: 'pointer',
    },
  },
}));

const SearchForm = ({ allPages, hideSearchDrawer }) => {
  const classes = useStyles();
  const [search, setSearch] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    rebuildIndex();
  }, [searchQuery]);

  const rebuildIndex = () => {
    const dataToSearch = new JsSearch.Search('id');
    dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(new JsSearch.SimpleTokenizer());
    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('id');

    dataToSearch.addIndex('title');
    dataToSearch.addIndex('body');
    dataToSearch.addIndex('tags');
    dataToSearch.addDocuments(allPages); // adds the data to be searched

    // this.setState({ search: dataToSearch, isLoading: false }, () => this.searchData());
    setSearch(dataToSearch, () => this.searchData());
  };

  const searchData = (val) => {
    const searchVal = decodeURIComponent(val);
    const queryResult = search.search(searchVal);
    setSearchResults(queryResult);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      setSearchQuery(value);
      searchData(value);
    }
  };

  const results = searchResults.slice(0, 10);

  return (
    <ClickAwayListener onClickAway={hideSearchDrawer}>
      <div className={cn(searchSection, classes.root)}>
        <TextField
          autoFocus
          placeholder="Type to search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" onClick={() => navigate(`/search_results?query=${searchQuery}`)}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <div className={searchResult}>
          {results.length
            ? results.map((result, idx) => {
                let { slug } = result;
                if (slug && !slug.startsWith('/')) {
                  slug = `/${slug}`;
                }
                return (
                  <h3 key={idx}>
                    <Link to={slug}>{result.title}</Link>
                  </h3>
                );
              })
            : ''}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default SearchForm;
