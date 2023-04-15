import React, { useState } from "react";
import { getBookmarks, removeBookmark, checkBookMark } from "./helper/bookmarkHelper";
import Navbar from "./navbar";

function Bookmark() {
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  function handleRemoveClick(id) {
    removeBookmark(id);
    setBookmarks(getBookmarks());
  }

  function renderBookmarks() {
    if (bookmarks.length === 0) {
      return <p>No bookmarks yet.</p>;
    }

    return (
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark._id}>
            <p>{bookmark.content}</p>
            <p>- {bookmark.author}</p>
            <button onClick={() => handleRemoveClick(bookmark._id)}>
              Remove bookmark
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="bookmark">
      <Navbar />
      <h1>Bookmarks</h1>
      {renderBookmarks()}
    </div>
  );
}

export default Bookmark;
