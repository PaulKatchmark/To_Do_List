$(function() {
getTasks();

$('#enterTask').on('submit', addTask);
$('#toDoList').on('click', '.delete', deleteTask);


// $('#toDoList :checkbox').change('click', updateTask);

// $('#toDoList').val($(this).is(':checked'));


// $("#toDoList").on("click", updateTask);




});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: displayTasks
  });
}

function displayTasks(response) {
  var $list = $('#toDoList');
  $list.empty();
  response.forEach(function(task) {

    var $li = $('<ul></ul>');
    var $form = $('<form></form>');

    var $compButton = $('<input type="checkbox" id="complete"></>');
    $compButton.data('id', task.id);
    $form.append($compButton);

    $form.append('<p value="' + task.id + '">' + task.open_tasks + '</p>');

    var $deleteButton = $('<button class="delete">Delete</button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);

    $form.data('id', task.id);
    $li.append($form);
    $list.append($li);
  });
}

function addTask(event) {
  event.preventDefault();
  // title=someTitle&author=someAuthor&published=today
  var taskData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/todo',
    data: taskData,
    success: getTasks
  });

  $(this).find('input').val('');
}



function deleteTask(event) {
  event.preventDefault();

    var taskId = $(this).data('id');


    $.ajax({
      type:'DELETE',
      url: '/todo/' + taskId,
      data: taskId,
      success: getTasks
    });
}




// function updateTask() {
//     var $checkbox = $('#complete');
// console.log('checkbox', $checkbox);
//
//     var $form = $checkbox.closest('form');
// console.log('form', $form);
//
//     var data = $form.serialize();
//     console.log('data', data);
//
//   alert($(this).attr("checked"));
//       $.ajax({
//         type: 'PUT',
//         url: '/todo/' + $checkbox.data('id'),
//         data: data,
//         success: console.log($checkbox.data('id'))
//       });
// };

// function updateTask(event) {
//   event.preventDefault();
//
//   var $checkbox = $(this);
//   var $form = $checkbox.closest('form');
//
//   var data = $form.serialize();
//
//   $('#toDoList').change(function() {
//   if ($form.checked) {
//     console.log(this);
//     $.ajax({
//       type: 'PUT',
//       url: '/todo/' + $checkbox.data('id'),
//       data: data,
//       success: console.log($checkbox.data('id'))
//     });
//   } else {
//       console.log('not working', this);
//   }
// });

// }
