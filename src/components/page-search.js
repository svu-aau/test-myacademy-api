import React, { Component } from 'react';
import * as JsSearch from 'js-search';
import { Link } from 'gatsby';
import CircularProgress from '@material-ui/core/CircularProgress';

import { highlightedMarkup, highlightedExtendedMarkup } from '../utils/search';
import Pagination from './pagination';
import { missingResults, searchResultStyle } from './page-search.module.css';

const isBrowser = typeof window !== 'undefined';

class PageSearch extends Component {
  state = {
    isLoading: true,
    searchResults: [],
    search: null,
    isError: false,
    termFrequency: true,
    removeStopWords: false,
    searchQuery: '',
    selectedStrategy: 'All',
    page: 1,
    itemCount: 10,
  };

  /**
   * React lifecycle method that will inject the data into the state.
   */
  async componentDidMount() {
    this.rebuildIndex();
  }

  componentDidUpdate(prevProps) {
    if (this.state.search) {
      if (this.props.searchTerm && this.props.searchTerm !== '') {
        if (this.props.searchTerm !== prevProps.searchTerm) {
          if (this.props.searchTerm !== this.state.searchQuery) {
            this.searchData(this.props.searchTerm);
          }
        }
      }
    }
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { pages } = this.props;

    const dataToSearch = new JsSearch.Search('id');

    dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(new JsSearch.SimpleTokenizer());

    /**
     * defines an indexing strategy for the data
     * read more about it here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();

    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('id');

    // sets the index attribute for the data
    dataToSearch.addIndex('title');
    // dataToSearch.addIndex('slug');
    // dataToSearch.addIndex('synonyms');
    dataToSearch.addIndex('body');
    dataToSearch.addIndex('tags');

    dataToSearch.addDocuments(pages); // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false }, () => this.searchData());
  };

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (val = this.props.searchTerm) => {
    const { search } = this.state;
    const searchVal = decodeURIComponent(val);
    const queryResult = search.search(searchVal);
    this.setState({ searchQuery: searchVal, searchResults: queryResult });
  };

  changePage = (e, page) => {
    this.setState({ page });
    isBrowser && window.scrollTo(0, 0);
  };

  render() {
    const { searchResults, searchQuery, isLoading, itemCount, page } = this.state;
    const { pages, origin } = this.props;
    const queryResults = searchQuery === '' ? pages : searchResults;

    const maxPages = Math.ceil(queryResults.length / itemCount);

    var begin = (page - 1) * itemCount;
    var end = begin + itemCount;

    const results = queryResults.slice(begin, end);

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <>
        {results.length === 0 ? (
          <>
            <h1 className={missingResults}>{`No results found for "${searchQuery}"`}</h1>
            <p style={{ textAlign: 'center' }}>Please try another keyword or phrase.</p>
          </>
        ) : (
          <div className={searchResultStyle}>
            {results.map((result, idx) => {
              let { slug } = result;
              // console.log('slug: ', slug);
              if (slug && !slug.startsWith('/')) {
                slug = `/${slug}`;
              }
              return (
                <div key={idx}>
                  <h3>
                    <Link to={slug}>{result.title}</Link>
                  </h3>
                  <p>
                    {result.body[0] ? (
                      <>
                        {highlightedMarkup(result.body[0], searchQuery)}
                        <br />
                      </>
                    ) : (
                      highlightedExtendedMarkup(result.body, searchQuery)
                    )}
                    <br />
                    <Link to={slug}>{origin + slug}</Link>
                  </p>
                </div>
              );
            })}

            {queryResults.length > 1 && <Pagination count={maxPages} onChange={this.changePage} />}
          </div>
        )}
      </>
    );
  }
}
export default PageSearch;
