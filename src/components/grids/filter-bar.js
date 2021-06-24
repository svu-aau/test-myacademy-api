import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './filter-bar.module.css';
import { cn } from '../../lib/helpers';

const FilterStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    color: 'white',
    border: 'white 1px solid',
    width: '10em',
    borderRadius: '0',
    marginRight: '1em',
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
    zIndex: 10,
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused ? 'white' : 'transparent',
    color: isFocused ? 'black' : 'white',
  }),
};

function FilterBar({
  handleClick,
  items,
  placeholder,
  secondaryItems,
  secondaryPlaceholder,
  showFilters,
  changeFilterCount, // used for Globe page filter
  changeSecondaryFilter, // used for Globe page filter
  primaryOptionLabel = 'All',
  secondaryOptionLabel = 'All',
}) {
  let [filter, setFilter] = useState(placeholder || items[0].title);
  let [secondaryFilter, setSecondaryFilter] = useState(secondaryPlaceholder);
  let secondaryOptions = [];
  const showPrimaryFilter = items && items.length > 1;
  const showSecondaryFilters = secondaryItems && secondaryItems.length > 1; // only show assetCategories if more than 1 category
  const options = items.map(({ title }) => ({ value: title, label: title }));

  items && items.sort();
  secondaryItems && secondaryItems.sort();

  useEffect(() => {
    if (changeSecondaryFilter && secondaryFilter !== changeSecondaryFilter) {
      onChangeCategories({ value: changeSecondaryFilter });
    }
  }, [changeFilterCount, changeSecondaryFilter]);

  function onChange({ value }) {
    setFilter(value);
    handleClick(value);
    if (showSecondaryFilters) {
      setSecondaryFilter(secondaryPlaceholder);
    }
  }
  function onChangeCategories({ value }) {
    setSecondaryFilter(value);
    handleClick(value, true);
  }

  if (placeholder) {
    options.unshift({ value: placeholder, label: primaryOptionLabel });
  }

  if (secondaryItems) {
    if (!secondaryItems[0].title) {
      secondaryOptions = secondaryItems.map((val) => {
        return { value: val, label: val };
      });
    } else if (secondaryItems[0].code) {
      secondaryOptions = secondaryItems.map(({ code, title }) => ({ value: code, label: title }));
    } else {
      secondaryOptions = secondaryItems.map(({ title }) => ({ value: title, label: title }));
    }

    secondaryOptions.unshift({ value: secondaryPlaceholder, label: secondaryOptionLabel });
  }

  const showBoth = showFilters && showSecondaryFilters;

  return (
    <div className={styles.root}>
      <div className={showBoth ? cn(styles.wrapper, styles.wrapperDouble) : styles.wrapper}>
        <div className={showBoth ? cn(styles.filterText, styles.filterTextDouble) : styles.filterText}>Filter by:</div>
        {showPrimaryFilter && (
          <Select
            styles={FilterStyles}
            value={options.find(({ value }) => value === filter)}
            options={options}
            onChange={onChange}
          />
        )}

        {showSecondaryFilters && (
          <Select
            styles={FilterStyles}
            value={secondaryOptions.find(({ value }) => value === secondaryFilter)}
            options={secondaryOptions}
            onChange={onChangeCategories}
          />
        )}
      </div>
    </div>
  );
}

export default FilterBar;
