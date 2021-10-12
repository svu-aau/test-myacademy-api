const softSearch = (test, arr) => {
  const match = arr.find((a) => a.includes(test));

  if (match) {
    const matchIdx = arr.indexOf(match);

    return [arr[matchIdx], matchIdx];
  } else {
    return null;
  }
};

export default softSearch;
