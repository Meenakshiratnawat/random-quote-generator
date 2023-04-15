import React, { useEffect, useState } from "react";
import { getRandomQuote, getTags} from "./api";
import { addBookmark, removeBookmark, checkBookMark } from "./helper/bookmarkHelper";
import "./home.css";
import Navbar from "./navbar";

function Home() {
  const [quote, setQuote] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const quoteData = await getRandomQuote(selectedTag);
      setQuote(quoteData);
    }
    fetchData();
  }, [selectedTag]);

  useEffect(() => {
    async function fetchData() {
      const tagsData = await getTags();
      setTags(tagsData);
    }
    fetchData();
  }, []);

  function handleBookmarkClick (quote) {
    addBookmark(quote);
  };

  function handleTagChange(event) {
    setSelectedTag(event.target.value);
  }

  function handleGenerateQuote() {
    setQuote(null);
    getRandomQuote(selectedTag)
      .then((quoteData) => {
        setQuote(quoteData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  

  function renderQuote() {
    if (!quote) {
      return <p>Loading...</p>;
    }

    const { content, author, _id } = quote;
    const isBookmarked = quote!=null && checkBookMark(quote._id)

    return (
      <div className="quote-container">
        <blockquote>
          <p>{content}</p>
        </blockquote>
        <p className="author">- {author}</p>
        <button onClick={handleBookmarkClick(quote)}>
          {isBookmarked ? "Remove from bookmarks" : "Bookmark"}
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />
      <h1>Random Quote Generator</h1>
      <div className="controls">
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">Select a tag</option>
          {tags.map((tag) => (
            <option key={tag._id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
        <button onClick={handleGenerateQuote}>Generate another quote</button>
      </div>
      {renderQuote()}
    </div>
  );
}

export default Home;
