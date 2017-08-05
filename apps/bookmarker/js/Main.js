(function(BookmarkerApp) {
    var form = document.getElementById('myForm');
    var inputSiteName = document.getElementById('site-name');
    var inputSiteUrl = document.getElementById('site-url');
    var outputDiv = document.getElementById('bookmarks-result');
    var defaultBookmarkCard = document.getElementById('default-bookmark-card');

    new BookmarkerApp(form, inputSiteName, inputSiteUrl, outputDiv, defaultBookmarkCard);
})(App);