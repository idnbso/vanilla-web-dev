(function(NamesFilter) {
    // Get input element
    var filterInput = document.getElementById('filterInput');

    // Get the ul element
    var namesList = document.getElementById('names');

    new NamesFilter(filterInput, namesList);
})(NamesFilter);