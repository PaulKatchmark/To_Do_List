$(function() {
getTasks();



});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: displayTasks
  });
}

function displayTasks(response) {
  console.log(response);
  var $list = $('#toDoList');
  $list.empty();
  response.forEach(function(task) {

    var $li = $('<ol></ol>');
    var $form = $('<form></form>');

    var $compButton = $('<input type="checkbox" class="complete"></>');
    $compButton.data('id', task.id);
    $form.append($compButton);

    $form.append('<p value="' + task.id + '">' + task.open_tasks + '</p>');

    var $deleteButton = $('<button class="delete">Delete</button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);

    $li.append($form);
    $list.append($li);
  });
}
