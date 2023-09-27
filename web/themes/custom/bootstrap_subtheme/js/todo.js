/**
 * @file
 * Provides the functionality to add or remove todo list items.
 */

(function ($, Drupal, once) {
  Drupal.behaviors.todoBehavior = {
    attach: function (context, settings) {
      // Apply the newTodo effect to the elements only once.
      const $listElement = $('#todo-list');
      const $savedItemUl = $('#saved-item-ul');
      const $emptyList = $('#todo-list-empty');
      const todoListName = 'todo-list-item';
      let todoList = JSON.parse(localStorage.getItem(todoListName));

      once('newTodo', $listElement, context).forEach(function (element) {
        $('#todo-submit').on('click', function (event) {
          var $todoInput = $($listElement).val();
          $($emptyList).hide();
          $($savedItemUl).show();
          $($savedItemUl).append(`<li>${$todoInput}</li>`);
          saveTodoItem($todoInput);
        });

        $('#todo-clear').on('click', function (event) {
          deleteTodoList();
          $($savedItemUl).hide();
          $($emptyList).show();
        });

        /**
         * Function to save todo list item in localStorage.
         *
         * @param {$inputItem} object
         *   Holds element from input tag.
         */
        function saveTodoItem($inputItem) {
          // If todo-list-item is empty then initialise empty array and if not then
          // get todo-list-item item and parse into array.
          var itemList = localStorage.getItem(todoListName) ? JSON.parse(localStorage.getItem(todoListName)) : [];
          itemList.push($inputItem);
          // Convert js array into string and save on localStorage.
          localStorage.setItem(todoListName, JSON.stringify(itemList));
        }

        // Check if todoList is null or not.
        if (todoList !== null) {
          $(todoList).each(showTodoList);
        }
        else {
          $($emptyList).show();
          $($savedItemUl).hide();
        }

        /**
         * Function to show data from array.
         * @param {number} index
         *   Holds array index.
         * @param {string} element
         *   Holds value at index.
         */
        function showTodoList(index, element) {
          element = `<li>${element}</li>`;
          $($savedItemUl).append(element);
        }

        /**
         * Function to clear all localStorage data.
         */
        function deleteTodoList() {
          localStorage.removeItem(todoListName);
        }
      });
    }
  };
})(jQuery, Drupal, once);
