'use strict';

/**
 * Bookmarker constructor function.
 * @constructor - default constructor
 */
function Bookmarker(localStorageName) {
    this.localStorageName = localStorageName;
}

/**
 *
 * @param bookmark
 */
Bookmarker.prototype.save = function(bookmark) {
    var localStorageBookmarks = localStorage.getItem(this.localStorageName);

    // Test whether there are already bookmarks saved in the local storage
    var bookmarks = localStorageBookmarks === null ? [] : JSON.parse(localStorageBookmarks);

    var isBookmarkFound = false;
    for (var index = 0; index < bookmarks.length; index++) {
        if (bookmarks[ index ].name === bookmark.name) {
            bookmarks[ index ] = bookmark;
            isBookmarkFound = true;
            break;
        }
    }

    if (!isBookmarkFound) {
        bookmarks.push(bookmark);
    }

    this.saveAll(bookmarks);
};

/**
 *
 * @param bookmarks
 */
Bookmarker.prototype.saveAll = function(bookmarks) {
    // Save the updated bookmarks array to the local storage
    localStorage.setItem(this.localStorageName, JSON.stringify(bookmarks));
};

/**
 *
 */
Bookmarker.prototype.getAll = function() {
    var localStorageBookmarks = localStorage.getItem(this.localStorageName);
    return JSON.parse(localStorageBookmarks);
};

/**
 *
 * @param targetBookmark
 */
Bookmarker.prototype.delete = function(targetBookmark) {
    var bookmarks = this.getAll();

    bookmarks = bookmarks.filter(function(bookmark) {
        return bookmark.name !== targetBookmark.name;
    });

    this.saveAll(bookmarks);
};