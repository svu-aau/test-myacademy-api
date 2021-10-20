import * as React from 'react';

const highlightStyle = {
  backgroundColor: '#efe796',
};

const getIndicesOf = (searchStr, str, caseSensitive) => {
  var searchStrLen = searchStr.length;

  if (searchStrLen === 0) {
    return [];
  }

  var startIndex = 0,
    index,
    indices = [];

  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }

  return indices;
};

export const shortText = (textStr, numChars = 255, tail = '…', beginning = 0) => {
  if (numChars === 0) {
    numChars = 255;
  }
  // Remove HTML from text = returns plain text
  // $textStr = strip_tags($textStr);
  /*
      if (function_exists('mb_substr') && function_exists('mb_strlen')) {
        if (mb_strlen($textStr, APP_CHARSET) > $numChars) {
          $textStr = mb_substr($textStr, 0, $numChars, APP_CHARSET) . $tail;
        }
      } else {
        if (strlen($textStr) > $numChars) {
          $textStr = substr($textStr, 0, $numChars) . $tail;
        }
      }
    */
  const result = textStr.substring(beginning, numChars) + tail;
  return result;
};

const getHighlight = (fulltext, highlight) => {
  const indices = getIndicesOf(highlight, fulltext);

  if (indices.length > 0) {
    return indices.map((index, idx) => {
      const beginningOfWord = index;
      const endingOfWord = index + highlight.length;

      const hasPrev = idx > 0;
      const hasNext = idx + 1 <= indices.length;

      const prevGroupIdx = hasPrev ? indices[idx - 1] : 0;
      const prevGroupEnding = hasPrev ? prevGroupIdx + highlight.length : 0;

      const nextGroupBeginning = hasNext ? indices[idx + 1] : fulltext.length;

      const firstGroupBeginning = hasPrev ? prevGroupEnding : 0;
      const firstGroupEnding = beginningOfWord;

      const lastGroupBeginning = endingOfWord;
      const lastGroupEnding = fulltext.length >= nextGroupBeginning ? nextGroupBeginning : fulltext.length;

      if (idx > 0) {
        return {
          ending: fulltext.substring(lastGroupBeginning, lastGroupEnding),
        };
      }

      return {
        beginning: fulltext.substring(firstGroupBeginning, firstGroupEnding),
        ending: fulltext.substring(lastGroupBeginning, lastGroupEnding),
      };
    });
  }
};
export const highlightedMarkup = (fulltext, highlight, origin) => {
  if (!highlight) {
    return fulltext;
  }

  const highlights = getHighlight(fulltext, highlight);

  if (!highlights) {
    return fulltext;
  }

  let newText = [];

  if (origin) {
    newText = [origin];
  }

  highlights.forEach((obj) => {
    if (obj.beginning) {
      newText.push(obj.beginning);
    }
    newText.push(highlight);
    if (obj.ending) {
      newText.push(obj.ending);
    }
  });

  return newText.map((str, i) => {
    if (str === highlight) {
      return (
        <span key={i} style={highlightStyle}>
          {str}
        </span>
      );
    } else {
      return <span key={i}>{str}</span>;
    }
  });
};

export const highlightedExtendedMarkup = (fulltext, highlight) => {
  return fulltext
    .map((text, idx) => {
      text = text.replace(/(?:\\[rn])+/g, ' ');

      // $highlight = str_replace(array('"', "'", "&quot;"), '', $highlight);
      // highlight = highlight.replaceAll(/(?:\\["'])+/g, '').replaceAll(/&quot;/g, '');

      if (!highlight) {
        text = shortText(text, 180);

        if (fulltext > 180) {
          // $text .= '&hellip;<wbr>';
          text += '...';
        }

        return text;
      }

      const indices = getIndicesOf(highlight, text);

      if (indices.length > 0) {
        const textMap = indices.map((index) => {
          const beginningOfWord = index;
          const endingOfWord = index + fulltext.length;

          const firstGroupBeginning = beginningOfWord - 46 > 0 ? beginningOfWord - 46 : 0;
          const lastGroupEnding = endingOfWord + 46 <= text.length ? endingOfWord + 46 : text.length;

          const result = text.substring(firstGroupBeginning, lastGroupEnding);

          return result;
        });

        if (textMap.length > 0) {
          let body_length = 0;
          let body_string = [];

          textMap.every((line) => {
            body_length += line.length;

            const r = highlightedMarkup(line, highlight);

            if (r) {
              body_string = r;
            }

            if (body_length > 150) {
              return true;
            }
          });

          if (body_string.length > 0) {
            body_string.push(<span key={`sep_${idx}`}>...</span>);
            return body_string;
          }
        }
      }
    })
    .filter((obj) => obj);
};
