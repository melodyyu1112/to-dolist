var markComplete = function (id){
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id + '/mark_complete?api_key=53',
        dataType: 'json',
        success: function (response, textStatus) {
            displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });    
}

var markActive = function (id) {
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=53',
        dataType: 'json',
        success: function (response, textStatus) {
        displayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

var createTaskAjax = function (){
    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=53',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#todo-input').val()
          }
        }),
        success: function (response, textStatus) {
          displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
}

var displayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=53',
      dataType: 'json',
      success: function (response, textStatus) {
        $('tbody').empty();
        console.log(response);
        response.tasks.forEach(function (task) {
        var taskName = task.content;
        var id = task.id;
        $('tbody').append('<tr>' +
        '<td> <input type="checkbox" class = "check" data-id = "'+ id + '"' + (task.completed ? 'checked' : '') + '>'+
        '<td class="task">' + taskName + '</td>' +
        '<td><button class="btn btn-light btn-sm remove" data-id = "'+ id + '"> remove</button></td>' +
    '</tr>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
}


$(document).ready(function () {

    $(document).on('change', '.check', function(event) {
        var idTask = $(this).data('id');
        if(this.checked) {
            markComplete(idTask); 
        } else {
            markActive(idTask);
        }    
    });

    $(document).on('click', '.btn.remove', function (event) {
        var idTask = $(this).data('id');
        $.ajax({
            type: 'DELETE',
             url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + idTask +'?api_key=53',
             success: function (response, textStatus) {
               console.log(response);
             },
             error: function (request, textStatus, errorMessage) {
               console.log(errorMessage);
             }
           });
        $(this).closest('tr').remove();

    });

    $('#add-task').on('submit', function (event) {
        event.preventDefault();
        createTaskAjax();
        $('#todo-input').val('');
        displayAllTasks();    
    });
});

