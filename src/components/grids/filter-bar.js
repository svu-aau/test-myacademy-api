import React, { useState } from 'react';
import Select from 'react-select';

import styles from './filter-bar.module.css';
import { cn } from '../../lib/helpers';

const FilterStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    width: '10em',
  }),
  indicatorSeparator: () => ({}),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#ee3224',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#0f131a',
    color: 'white',
    border: '1px solid white',
    borderRadius: '0',
    width: '15em',
    padding: '1em 0',
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused ? 'white' : 'transparent',
    color: isFocused ? 'black' : 'white',
  }),
};

function FilterBar({ handleClick, items, placeholder, assetCategories, categoryPlaceholder, showFilters }) {
  let [filter, setFilter] = useState(placeholder || items[0].title);
  let [categoryFilter, setCategoryFilter] = useState(categoryPlaceholder);
  let assetCategoryOptions = [];
  const showCategories = assetCategories && assetCategories.length > 1;
  const options = items.map(({ title }) => ({ value: title, label: title }));

  function onChange({ value }) {
    setFilter(value);
    handleClick(value);
    if (showCategories) {
      setCategoryFilter(categoryPlaceholder);
    }
  }
  function onChangeCategories({ value }) {
    setCategoryFilter(value);
    handleClick(value, true);
  }

  if (placeholder) {
    options.unshift({ value: placeholder, label: 'All' });
  }

  if (assetCategories) {
    assetCategoryOptions = assetCategories.map((val) => {
      return { value: val, label: val };
    });
    assetCategoryOptions.unshift({ value: categoryPlaceholder, label: categoryPlaceholder });
  }

  const showBoth = showFilters && showCategories;

  return (
    <div className={styles.root}>
      <div className={showBoth ? cn(styles.wrapper, styles.wrapperDouble) : styles.wrapper}>
        <div className={showBoth ? cn(styles.filterText, styles.filterTextDouble) : styles.filterText}>Filter by:</div>
        {showFilters && (
          <Select
            styles={FilterStyles}
            value={options.find(({ value }) => value === filter)}
            options={options}
            onChange={onChange}
          />
        )}

        {showCategories && (
          <Select
            styles={FilterStyles}
            value={assetCategoryOptions.find(({ value }) => value === categoryFilter)}
            options={assetCategoryOptions}
            onChange={onChangeCategories}
          />
        )}
      </div>
    </div>
  );
}

export default FilterBar;
