function NamesFilter(filterInput, namesList) {
    filterInput.addEventListener('keyup', this.filterNames.bind(this));

    this.filterInput = filterInput;
    this.namesList = namesList;
}

NamesFilter.prototype.filterNames = function() {
    // Get a uniformed filter value of type string
    var filterValue = this.filterInput.value.toLowerCase();

    // Get all of the collection headers in the names list
    var namesListItems = this.namesList.querySelectorAll('li.collection-header');

    // if there is no value, show all names
    if (filterValue.length === 0) {
        this.showAllNames();
        return;
    }

    var matchedNamesListItems = this.filterListItemsCollections(namesListItems, filterValue);

    if (matchedNamesListItems === undefined) return;

    this.filterListItems(matchedNamesListItems, filterValue);
};

NamesFilter.prototype.showAllNames = function() {
    this.namesList
        .querySelectorAll('li')
        .forEach(function(listItem) {
            listItem.style.display = '';
        });
};

NamesFilter.prototype.filterListItemsCollections = function(namesListItems, filterValue) {
    var matchedNamesListItems = undefined;

    namesListItems.forEach(function(listItem) {
        // Get the letter of the current names sub-collection
        var letter = listItem.getElementsByTagName('h5')[ 0 ].innerHTML;

        // Check whether the current letter is equal to the first letter of the filter value
        if (letter.toLowerCase() === filterValue[ 0 ]) {
            listItem.style.display = '';

            // Get the list items from the names list
            matchedNamesListItems = listItem.querySelectorAll('li.collection-item');
        }
        else {
            listItem.style.display = 'none';
        }
    });

    return matchedNamesListItems;
};

NamesFilter.prototype.filterListItems = function(matchedNamesListItems, filterValue) {
    // Loop through collection-item list items
    matchedNamesListItems.forEach(function(listItem) {
        var nameLink = listItem.getElementsByTagName('a')[ 0 ];
        var name = nameLink.innerHTML;

        // check if the name exists in the
        if (name.toLowerCase().indexOf(filterValue) > -1) {
            listItem.style.display = '';
        }
        else {
            listItem.style.display = 'none';
        }
    });
};