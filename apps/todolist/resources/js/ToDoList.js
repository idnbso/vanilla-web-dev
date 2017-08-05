function TodoList() {
    this.todoList = this.getAll();

    if (this.todoList.length === 0) {
        this.saveAll(this.todoList);
    }
}

TodoList.prototype.add = function(todoItem) {
    this.todoList.push(todoItem);

    this.saveAll(this.todoList);
};

TodoList.prototype.remove = function(todoItem) {
    for (var i = 0; i < this.todoList.length; i++) {
        if (this.todoList[ i ].text === todoItem.text &&
            this.todoList[ i ].isCompleted === todoItem.isCompleted) {
            this.todoList.splice(i, 1);
            break;
        }
    }

    this.saveAll(this.todoList);
};

TodoList.prototype.getAll = function() {
    var todoList = JSON.parse(localStorage.getItem('todoList'));

    if (!todoList) {
        todoList = [];
    }

    return todoList;
};

TodoList.prototype.saveAll = function(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};

TodoList.prototype.toggleComplete = function(todoItem) {
    for (var i = 0; i < this.todoList.length; i++) {
        if (todoItem.text === this.todoList[ i ].text) {
            this.todoList[ i ].isCompleted = !this.todoList[ i ].isCompleted;
            break;
        }
    }

    this.saveAll(this.todoList);
};