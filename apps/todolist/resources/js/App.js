function App(addButtonElement, textInputElement, todoListElement,
             doneListElement) {
    this.addButtonElement = addButtonElement;
    this.textInputElement = textInputElement;
    this.todoListElement = todoListElement;
    this.doneListElement = doneListElement;

    this.addButtonElement.addEventListener('click', this.onAddNewTodoItem.bind(this));

    this.todoList = new TodoList();

    this.renderTodoList.call(this);
    this.renderCompletedTodoList.call(this);
}

App.prototype.renderTodoList = function() {
    renderList.call(
        this,
        this.todoList.getAll(),
        'isCompleted',
        false,
        this.todoListElement,
        this.renderTodoItem.bind(this)
    );
};

App.prototype.renderCompletedTodoList = function() {
    renderList.call(
        this,
        this.todoList.getAll(),
        'isCompleted',
        true,
        this.doneListElement,
        this.renderTodoItem.bind(this)
    );
};

function renderList(sourceList, filterParam, filterParamState, targetList, renderMethod) {
    targetList.innerHTML = '';

    sourceList
        .filter(function(todoItem) {
            return todoItem[ filterParam ] === filterParamState;
        })
        .forEach(function(todoItem) {
            renderMethod(targetList, todoItem);
        });
}

/**
 * Called whenever user clicked on the add new to do item button.
 * If there is any text inside the text input field, add that text to the to do list.
 */
App.prototype.onAddNewTodoItem = function() {
    var text = this.textInputElement.value;

    if (!text) {
        alert('There is no text input for the to do item.');
        return;
    }

    var todoItem = {
        text: text,
        isCompleted: false
    };

    this.todoList.add(todoItem);
    this.textInputElement.value = '';
    this.renderTodoItem(this.todoListElement, todoItem);
};

App.prototype.onRemoveTodoItem = function(button) {
    var todoItemElement = button.parentNode.parentNode;
    var isCompleted = todoItemElement.parentNode.id === 'todo-list-completed';

    var text = todoItemElement.querySelector('p').innerText;

    var todoItem = {
        text: text,
        isCompleted: isCompleted
    };

    this.todoList.remove(todoItem);

    var renderMethod = !isCompleted ? this.renderTodoList : this.renderCompletedTodoList;

    renderMethod.call(this);
};

App.prototype.onCompleteTodoItem = function(button) {
    var todoItemElement = button.parentNode.parentNode;
    var isCompleted = todoItemElement.parentNode.classList.contains('completed');

    var text = todoItemElement.querySelector('p').innerText;

    var todoItem = {
        text: text,
        isComplete: isCompleted
    };

    this.todoList.toggleComplete(todoItem);

    var list = isCompleted ? this.doneListElement : this.todoListElement;
    list.appendChild(todoItemElement);

    this.renderTodoList.call(this);
    this.renderCompletedTodoList.call(this);
};

App.prototype.renderTodoItem = function(todoListElement, todoItem) {
    var listItem = document.createElement('li');
    var text = document.createElement('p');
    text.innerText = todoItem.text;
    listItem.appendChild(text);

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    var removeButtonIcon = document.createElement('i');
    removeButtonIcon.classList.add('fa');
    removeButtonIcon.classList.add('fa-trash');
    removeButtonIcon.classList.add('fa-2x');
    removeButton.appendChild(removeButtonIcon);
    removeButton.addEventListener('click', this.onRemoveTodoItem.bind(this, removeButton));

    var completeButton = document.createElement('button');
    completeButton.classList.add('complete');
    var completeButtonIcon = document.createElement('i');
    completeButtonIcon.classList.add('fa');
    completeButtonIcon.classList.add('fa-check-circle');
    completeButtonIcon.classList.add('fa-2x');
    completeButton.appendChild(completeButtonIcon);
    completeButton.addEventListener('click', this.onCompleteTodoItem.bind(this, completeButton));

    buttons.appendChild(removeButton);
    buttons.appendChild(completeButton);
    listItem.appendChild(buttons);
    todoListElement.appendChild(listItem);
};