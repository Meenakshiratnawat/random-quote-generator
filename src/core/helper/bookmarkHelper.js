export function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

export function addBookmark(quote) {

  const bookmarks = getBookmarks();
  if (!bookmarks.find(q => q._id === quote._id)) {
    bookmarks.push(quote);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

}

export function removeBookmark(id) {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex((bookmark) => bookmark._id === id);
  if (index !== -1) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

export function checkBookMark(id) {
  const bookmarks = getBookmarks();
  return bookmarks.some((bookmark) => bookmark._id === id);
}
