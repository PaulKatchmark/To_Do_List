$(function() {

    getTasks();

    $('#enterTask').on('submit', addTask);
    $('#toDoList').on('click', '.delete', deleteTask);
    $("#toDoList").on("click", '#complete', updateTask);
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

        if (task.task_status == true) {
          $('p[value=' + task.id + ']').addClass('finished');
      } else {
          $('p[value=' + task.id + ']').removeClass('finished');
      }
    });
}

function addTask(event) {
    event.preventDefault();
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
    if (confirm("Good call! This wasn't really worth your time, but are you sure?")) {
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + taskId,
            data: taskId,
            success: getTasks
        });
    }
}

function updateTask() {
    var $checkbox = $(this);
    var $form = $checkbox.closest('form');
    var data = $checkbox.data('id');
    var boxToggle = $checkbox.prop('checked');

    $.ajax({
        type: 'PUT',
        url: '/todo/' + data,
        data: boxToggle,
        success: getTasks
    });
};
