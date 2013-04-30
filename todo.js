  
function TodoItem(text, completed, dueDate) {
  this.text = text;
  this.completed = completed || false;
  this.dueDate = dueDate;
}

$(document).ready(function() {
// Handler for .ready() called.
  
  var todoArr = [];
  // var completedArr = [];

  var todoEl = $('#todo ol');
  var completedEl = $('#completed ol');
  var completedContainer = $('#completed');

  // $('#todo form').on('submit', function(e) {
  //   e.preventDefault();
    
  //   var newText = $(this).children('input').val();
  //   $('<li>' + newText + '</li>').appendTo(todoEl);

  // });
    
  $('#todo form').on('submit', function(e) {
    e.preventDefault();
    var newText = $(this).children('input').val();
    var newItem = new TodoItem(newText, false, null);
    todoArr.push(newItem);
    updateLists();
    console.log(todoArr);
  });

  // type must be "todo" or "completed"
  function newTodoEl(text, index, type) {
    var checked = "";
    if (type === "completed") {
      checked = ' checked="checked"';
    }
    return $('<li>' + 
      '<input type="checkbox" id="' + type + 'Checkbox' + index + '"' + checked + '><span>' +
      text + '</span>' + '<button id="'+ type + 'Delete' + index + '">Delete</button>' + '</li>');
  }

  function updateLists() {
    todoEl.empty();
    completedEl.empty();
    var completedCount = 0;
    var todoCount = 0;

    for(var i = 0; i < todoArr.length; i += 1) {
      var newTodo;
      if (todoArr[i].completed) {
        newTodo = newTodoEl(todoArr[i].text, i, "completed");
        newTodo.appendTo(completedEl);
        newTodo.children('input[type=checkbox]').on('click', function(e) {
          unCompleteItem(e.target);
        });
        newTodo.children('button').on('click', function (e) {
          //($(e.target).parent('li')).hide( "drop", { direction: "up" }, "slow", function () { deleteItem(e.target, "completed"); } );
          deleteItem(e.target, "completed");
        });
        completedCount += 1;
      }
      else {
        newTodo = newTodoEl(todoArr[i].text, i, "todo");
        newTodo.appendTo(todoEl);
        newTodo.children('input[type=checkbox]').on('click', function(e) {
          completeItem(e.target);
        });
        newTodo.children('button').on('click', function (e) {
          //($(e.target).parent('li')).hide( "drop", { direction: "up" }, "slow", function () { deleteItem(e.target, "todo"); } );
          deleteItem(e.target, "todo");
        });
        todoCount += 1;
      }
    }

    // only show completeds if there are some to show
    if (completedCount > 0) {
      completedContainer.show();
    }
    else {
      completedContainer.hide();
    }

    if (todoCount === 0) {
      $('<li>Nothing to do!</li>').appendTo(todoEl);
    }
  }

  function completeItem(el) {
    var index = parseInt(el.id.replace("todoCheckbox", ""), 10);
    todoArr[index].completed = true;
    updateLists();
  }

  function unCompleteItem(el) {
    var index = parseInt(el.id.replace("completedCheckbox", ""), 10);
    todoArr[index].completed = false;
    updateLists();
  }

  function deleteItem(el, type) {
    var indexToDelete = parseInt(el.id.replace(type + "Delete", ""), 10);
    var newArr = [];
    var deletedEl;
    for (var i = 0; i < todoArr.length; i += 1) {
      if (i === indexToDelete) {
        deletedEl = todoArr[i];
      }
      else {
        newArr.push(todoArr[i]);
      }
    }
    todoArr = newArr;
    updateLists();
    return deletedEl;
  }

  completedContainer.hide();

});