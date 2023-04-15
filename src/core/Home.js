import React, { useEffect, useState } from "react";
import { getRandomQuote, getTags} from "./api";
import { addBookmark, removeBookmark, checkBookMark } from "./helper/bookmarkHelper";
import "./home.css";
import Navbar from "./navbar";

function Home() {
  const [quote, setQuote] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const quoteData = await getRandomQuote(selectedTag);
      setQuote(quoteData);
      setIsBookmarked(checkBookMark(quoteData._id));
    }
    fetchData();
  }, [selectedTag]);

  function handleBookmarkClick(quote) {
    if (isBookmarked) {
      removeBookmark(quote._id);
      setIsBookmarked(false);
    } else {
      addBookmark(quote);
      setIsBookmarked(true);
    }
  }

  function handleTagChange(event) {
    setSelectedTag(event.target.value);
  }

  function handleGenerateQuote() {
    setQuote(null);
    getRandomQuote(selectedTag)
      .then((quoteData) => {
        setQuote(quoteData);
        setIsBookmarked(checkBookMark(quoteData._id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderQuote() {
    if (!quote) {
      return (
        <div className="quote-container loading-container">
          <p>Loading...</p>
        </div>
      )
    }

    const { content, author, _id } = quote;

    return (
      <div className="quote-container">
        <blockquote>
          <p>{content}</p>
        </blockquote>
        <p className="author">- {author}</p>
        <button onClick={() => handleBookmarkClick(quote)} className="bookmark-button">
          {isBookmarked ? "Remove from bookmarks" : "Bookmark"}
        </button>
      </div>
    );
  }

  useEffect(() => {
    async function fetchData() {
      const tagsData = await getTags();
      setTags(tagsData);
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <h1>Random Quote Generator</h1>
      <div className="controls">
      <button onClick={handleGenerateQuote}>Generate another quote</button>
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">Select a tag</option>
          {tags.map((tag) => (
            <option key={tag._id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>

      </div>
      {renderQuote()}
    </div>
  );
}

export default Home;

