/**
 * @file
 * Provides the functionality to add or remove todo list items.
 */

(function ($, Drupal, once) {
  Drupal.behaviors.todoBehavior = {
    attach: function (context, settings) {
      // Apply the newTodo effect to the elements only once.
      once('newTodo', '#todo-list', context).forEach(function (element) {
        $('#todo-submit').on('click', function(event) {
          // Prevents the default behavior
          event.preventDefault();
          var $todoInput = $('#todo-list').val();
          $('#todo-list-empty').hide();
          $('#saved-item-ul').show();
          $('#saved-item-ul').append('<li>' + $todoInput + '</li>');
          saveTodoItem($todoInput);
        });

        $('#todo-clear').on('click', function(event) {
          // Prevents the default behavior
          event.preventDefault();
          deleteTodoList();
          $('#saved-item-ul').hide();
          $('#todo-list-empty').show();
        });

        /**
         * Function to save todo list item in localStorage.
         *
         * @param {$inputItem} object
         *   Holds element from input tag.
         */
        function saveTodoItem($inputItem) {
          // If todo-list is empty then initialise empty array and if not then
          // get todo-list item and parse into array.
          var itemList = localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [];
          itemList.push($inputItem);
          // Convert js array into string and save on localStorage.
          localStorage.setItem('todo-list', JSON.stringify(itemList));
        }

        var todoList = JSON.parse(localStorage.getItem('todo-list'));
        // Check if todoList is null or not.
        if (todoList !== null) {
          $(todoList).each(showTodoList);
        }
        else {
          $('#todo-list-empty').show();
          $('#saved-item-ul').hide();
        }

        /**
         * Function to show data from array.
         * @param {number} index
         *   Holds array index.
         * @param {string} element
         *   Holds value at index.
         */
        function showTodoList(index, element) {
          element = "<li>" + element + "</li>";
          $('#saved-item-ul').append(element);
        }

        /**
         * Function to clear all localStorage data.
         */
        function deleteTodoList() {
          localStorage.removeItem('todo-list');
        }
      });
    }
  };
})(jQuery, Drupal, once);
