
$(document).ready(function(){
//===============================================================
//            Projects
//===============================================================

// -----     Add Project    -------
  $(document).delegate( "#addProject", "submit", function(){
    var id = $(this).serialize()
    var _id = 'post_' + id;
    $("#addProject").trigger("reset");
    $.ajax({
      method: "POST",
      url: "/test",
      data: id
    }).done(function(data){
      var project = '<div id="post_' + data._id + '" class="row"><div class="col-sm-1"></div><div class="col-sm-7"><h2>' + data.name + '</h2></div><div class="col-sm-4"><button class="btn btn-primary">Edit</button><button type="button" value=' + data._id + ' class="btn btn-primary delete">Del</button></div></div>';
      $("#project").append(project);

    });
    return false;
  });



// -----     Delete Project     -------
  $(document).delegate( ".delete", "click", function(){
    var id = $(this).attr("value");
    $("#post_" + id).slideUp("easing");
    $.ajax({
      method: "DELETE",
      url: '/delete/' + id,
    }).done(function(data){
    });
    return false;
  });



// -----     Edit Project    -------
  $(document).delegate( ".edit", "click", function(){
    var id = $(this).attr("value");
    $('#project_btn_' + id).hide();
    $('#project_save_' + id).show();
    $("#h2_" + id).attr({contenteditable: "true"});

    $(document).delegate( ".editSave", "click", function(){
      var id = $(this).attr("value");
      $.ajax({
        method: "PUT",
        url: '/edit/' + id,
        data: {
          name: $("#h2_" + id).html()
        }
      }).done(function(data){
        $("#h2_" + id).attr({contenteditable: "false"});
        $('#project_btn_' + id).show();
        $('#project_save_' + id).hide();
      });
      return false;
    });
  });



  //===============================================================
  //                       Tasks
  //===============================================================

  // -----     Add Tasks    -------
  $(document).delegate( ".newTask", "submit", function(){
    var idProject = $(this).attr("id");
    var taskName = $(this).serialize();
    $("#" + idProject).trigger("reset");
    console.log('click');
    $.ajax({
      method: "POST",
      url: "/task/" + idProject,
      data: taskName
    }).done(function(data){
      console.log('done');
      var task = '<div class="task row" id="' + data._id + '"><div class="col-md-1"><label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0"><input type="checkbox" name="name" value="" class="custom-control-input" id="checkbox_' + data._id + '"><span class="custom-control-indicator"></span></label></div><div class="col-md-8"><p id="p_' + data._id + '">' + data.name + '</p></div><div class="col-md-3"><div class="taskButtons" id="taskBtn_' + data._id + '"><div class="btn-group"><button value="' + data._id + '" class="btn btn-warning priorityTask">Priority</button><button value="' + data._id + '" class="btn btn-warning editTask">Edit</button><button value="' + data._id + '" class="btn btn-warning deleteTask">Del</button></div></div><div style="display: none" id="task_save_' + data._id + '"><button value="' + data._id + '" class="btn btn-warning btn-block saveTask">Save</button></div></div></div>'
      $("#post_" + idProject + ">.tasks").append(task);

    });
    return false;
  });



  // -----     Delete Task     -------
  $(document).delegate( ".deleteTask", "click", function(){
    var id = $(this).attr("value");
    $("#" + id).slideUp("easing");
    $.ajax({
      method: "DELETE",
      url: '/delete/task/' + id,
    }).done(function(data){
    });
    return false;
  });



// -----     Edit     -------
  $(document).delegate( ".editTask", "click", function(){
    var id = $(this).attr("value");
    $('#taskBtn_' + id).hide();
    $('#task_save_' + id).show();
    $("#p_" + id).attr({contenteditable: "true"});

    $(document).delegate( ".saveTask", "click", function(){
      var id = $(this).attr("value");
      console.log(id);
      $.ajax({
        method: "PUT",
        url: '/edit/task/' + id,
        data: {
          name: $("#p_" + id).html()
        }
      }).done(function(data){
        $("#p_" + id).attr({contenteditable: "false"});
        $('#taskBtn_' + id).show();
        $('#task_save_' + id).hide();
      });
      return false;
    });
  });




//-------------Check-----------
  $(document).delegate( ".custom-control-input", "click", function(){
    var id = $(this).attr("id").slice(9);
    if ($( this ).prop( "checked" )){
      $.ajax({
        method: "PUT",
        url: '/check/' + id,
        data: {
          name: 'checked'
        }
      })
    }else{
      $.ajax({
        method: "PUT",
        url: '/check/' + id,
        data: {
          name: ''
        }
      })
    }
  });






});
