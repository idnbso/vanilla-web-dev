'use strict';

/**
 *
 * @param form
 * @param inputSiteName
 * @param inputSiteUrl
 * @param outputDiv
 * @param defaultBookmarkCard
 * @constructor
 */
function App(form, inputSiteName, inputSiteUrl, outputDiv, defaultBookmarkCard) {
    form.addEventListener('submit', this.saveBookmark.bind(this));

    this.form = form;
    this.inputSiteName = inputSiteName;
    this.inputSiteUrl = inputSiteUrl;
    this.outputDiv = outputDiv;
    this.defaultBookmarkCard = defaultBookmarkCard;

    var localStorageName = 'bookmarks';
    this.bookmarker = new Bookmarker(localStorageName);

    this.displayBookmarks();
}

/**
 *
 */
App.prototype.displayBookmarks = function() {
    var bookmarks = this.bookmarker.getAll();

    // Build output
    this.outputDiv.innerHTML = '';

    bookmarks.map(this.createBookmarkElement.bind(this))
             .forEach(function(bookmarkCard) {
                 this.outputDiv.appendChild(bookmarkCard);
             }.bind(this));
};

/**
 *
 * @param bookmark
 * @returns {Node}
 */
App.prototype.createBookmarkElement = function(bookmark) {
    var name = bookmark.name;
    var url = bookmark.url;

    var bookmarkCard = this.defaultBookmarkCard
                           .querySelector('.bookmark-card')
                           .cloneNode(true);

    var bookmarkCardName = bookmarkCard.querySelector('.bookmark-name');
    var bookmarkCardVisitButton = bookmarkCard.querySelector('.bookmark-visit-button');
    var bookmarkCardDeleteButton = bookmarkCard.querySelector('.bookmark-delete-button');

    bookmarkCardName.innerHTML = name + '&nbsp;';
    bookmarkCardVisitButton.setAttribute('href', url);
    bookmarkCardDeleteButton.addEventListener('click',
        this.deleteBookmark.bind(this, bookmark));

    return bookmarkCard;
};

/**
 *
 * @param bookmark
 * @param event
 */
App.prototype.deleteBookmark = function(bookmark, event) {
    event.preventDefault();

    this.bookmarker.delete(bookmark);

    this.displayBookmarks();
};

/**
 *
 * @param event
 */
App.prototype.saveBookmark = function(event) {
    event.preventDefault();

    if (!this.validateInputs()) return;

    // Create the new bookmark object
    var bookmark = {
        name: this.inputSiteName.value,
        url: this.inputSiteUrl.value
    };

    this.bookmarker.save(bookmark);

    this.form.reset();
    this.displayBookmarks();
};

/**
 *
 * @returns {boolean}
 */
App.prototype.validateInputs = function() {
    var expression = /[-a-zA-Z0-9@:%_\\+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\\+.~#?&/=]*)?/gi;
    var urlRegex = new RegExp(expression);
    var isValid = true;

    if (!this.inputSiteName.value) {
        alert('Please enter a name and a URL for the bookmark.');
        isValid = false;
    }
    else if (!this.inputSiteUrl.value.match(urlRegex)) {
        alert('The URL value is not valid.');
        this.inputSiteUrl.value = '';
        isValid = false;
    }

    return isValid;
};