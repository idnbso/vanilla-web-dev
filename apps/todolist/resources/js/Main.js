(function(App) {
    var addButtonElement = document.getElementById('add-todo-item');
    var textInputElement = document.getElementById('todo-item-text');
    var todoListElement = document.getElementById('todo-list');
    var doneListElement = document.getElementById('todo-list-completed');

    new App(addButtonElement, textInputElement, todoListElement, doneListElement);
})(App);