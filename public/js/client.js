$(function() {

    getTasks();

    $('#enterTask').on('submit', addTask); //function that targets a button to add a task
    $('#toDoList').on('click', '.delete', deleteTask); //function that targets a button to delete a task
    $("#toDoList").on("click", '#complete', updateTask); //function that targets a button to complete a task
});

function getTasks() { //get request to the router.
    $.ajax({
        type: 'GET',
        url: '/todo',
        success: displayTasks
    });
}
// function that will display information on the DOM
function displayTasks(response) {
    var $list = $('#toDoList');
    $list.empty();  //emptying out the previous information stored on the page to make way for new info
    response.forEach(function(task) {

        var $li = $('<ul></ul>'); // a variable for lists that our forms will be appended into
        var $form = $('<form></form>'); //a variable for forms that we will append to the $li

        var $compButton = $('<input type="checkbox" id="complete"></>'); // a button to mark a task complete
        $compButton.data('id', task.id); // assigning a 'data' id to the button to allow for targeting later
        $form.append($compButton); // attaching button to $form

        $form.append('<p value="' + task.id + '">' + task.open_tasks + '</p>'); //attaching our tasks to the $form, giving the 'p' tag a value so that it can be targeted later

        var $deleteButton = $('<button class="delete">Delete</button>'); //a button to delete a cooresponding task
        $deleteButton.data('id', task.id); // assigning a 'data' id to the button to allow for targeting later
        $form.append($deleteButton); //attaching button to $form

        $form.data('id', task.id); // assigning a 'data' id to the $form to allow for targeting later
        $li.append($form); //appending the $form to the $li we created earlier
        $list.append($li); // appending the $li to our $list to be displayed on the DOM

        if (task.task_status == true) { //if else statement checking the value of task_status from the DOM
          $('p[value=' + task.id + ']').addClass('finished'); //if 'true', assigning a class so CSS can target to pust a strikethough the task when it is marked complete
              } else {
          $('p[value=' + task.id + ']').removeClass('finished'); // if the checkbox is then pressed again, value will be false and strikethrough will be removed
      }
    });
}

function addTask(event) { //function to add a new task to the DOM
    event.preventDefault();
    var taskData = $(this).serialize(); //this will allow us to send appropriate data to the database for our request
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: taskData,
        success: getTasks
    });
    $(this).find('input').val('');
}

function deleteTask(event) {  //function for deleteing a task
    event.preventDefault();

    var taskId = $(this).data('id'); // this will allow us to send appropriate ID to the database so that it can be deleted
    if (confirm("Good call! This wasn't really worth your time, but are you sure?")) { //HARD MODE: this makes the client confirm they want to delete a task before it is removed
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + taskId,
            data: taskId,
            success: getTasks
        });
    }
}

function updateTask() { // function that allows user to check the checkbox and mark a task as complete
    var $checkbox = $(this);
    var data = $checkbox.data('id'); //targeting the appropriate ID so that we can send the correct info to our PUT request on the router
    var boxToggle = $checkbox.prop('checked'); //this will target the property of the 'p' tag so that we cross off the correct task, or un-cross off.

    $.ajax({
        type: 'PUT',
        url: '/todo/' + data,
        data: boxToggle,
        success: getTasks
    });
};
