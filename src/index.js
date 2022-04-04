import { checkLocalStorage} from "./datamanamegent.js";
import "./assets/style.css";
import {createListCard} from "./DOM_create_list.js";
import {createProjectCard} from "./DOM_create_project.js";
import {AllLists} from "./ToDoList.js";
import {AllProjects,getProject,Project,updateProject,addProject} from "./project.js";






$( document ).ready(function() {
    checkLocalStorage();
    createProjectpage();
    $("#cards").on('click', ".update_project", function() {
        let id = $(this).closest('.card').attr('data-id');
        let project = getProject(id);
        $('#projectModal').attr('data-id',id);
        $('#project_name').val(project.getProject_Name());
        $('#project_priority').val(project.getProject_Priority());
        if(project.getProject_DueDate()=="No Due Date"){
            $('#project_due_date').prop('disabled', true);
            $('#project_not_required').prop('checked', true);
        }
        else{
            $('#project_due_date').val(project.getProject_DueDate());
        }
        $('#project_notes').val(project.getProject_Notes());

        $("#projectModal").modal("show");
    });

    $("#save_project").click(function (e) { 
        event.stopPropagation();
        event.stopImmediatePropagation();
        e.preventDefault();
        let id = $('#projectModal').attr('data-id');
        
        if(id !== undefined){
            let id = $('#projectModal').attr('data-id');
            let project = getProject($('#projectModal').attr('data-id'));
            let card = $('.card[data-id="'+id+'"]'); 
           
            
            project.setProject_Name($("#project_name").val());
            $('.card[data-id="'+id+'"]').find(".name").text($("#project_name").val());
            project.setProject_Priority($("#project_priority").val());
            project.setProject_Notes($("#project_notes").val());
            $('.card[data-id="'+id+'"]').find(".notes").text($("#project_notes").val());
            if($('#project_not_required').is("checked")){
                project.setProject_DueDate(new Date(0));
                $('.card[data-id="'+id+'"]').find(".due_date").text("Due Date: No Due Date");
            }else{
                project.setProject_DueDate($("#project_due_date").val());
                $('.card[data-id="'+id+'"]').find(".due_date").text("Due Date: "+$("#project_due_date").val());
            }
    
            updateProject(project);
            clearProjectModal();     
            
        }else{
            let due_date;
            if($('#project_not_required').is(":checked")){
                due_date = new Date(0);
            }else{
               due_date = $("#project_due_date").val();
            }
            let project = new Project($("#project_name").val(),due_date,$("#project_priority").val(),$("#project_notes").val())
            addProject(project);
            clearProjectModal();
            $('#cards').html('');
            createProjectpage();
            

        }   
    });

    $('#project_not_required').on('click',function(){
        if($('#project_not_required').is(":checked")){
            $("#project_not_required").prop('checked',false);
            $("#project_due_date").prop('disabled', false);
    
        }else{
            $("#project_not_required").prop('checked',true);
            $("#project_due_date").prop('disabled', true);
    
        }
     });
     $('#list_not_required').on('click',function(){
        if($('#list_not_required').is(":checked")){
            $("#list_not_required").prop('checked',false);
            $("#list_due_date").prop('disabled', false);
    
        }else{
            $("#list_not_required").prop('checked',true);
            $("#list_due_date").prop('disabled', true);
    
        }
     });
     $('#task_not_required').on('click',function(){
        if($('#task_not_required').is(":checked")){
            $("#task_not_required").prop('checked',false);
            $("#task_due_date").prop('disabled', false);
    
        }else{
            $("#task_not_required").prop('checked',true);
            $("#task_due_date").prop('disabled', true);
    
        }
     });
     $('projectModal').on('show.bs.modal',function(){
        $("#project_due_date").val(new Date());
    
     });
     $('listModal').on('show.bs.modal',function(){
        $("#project_due_date").val(new Date());
    
     });
     $('taskModal').on('show.bs.modal',function(){
        $("#project_due_date").val(new Date());
    
     });




 //end of on load function   
});

function createProjectpage(){
    for (let index = 0; index < AllProjects.length; index++) {
        const element = AllProjects[index];
        $('#cards').append(createProjectCard (element));   
    }

}

function createListPage(){
    for (let index = 0; index < AllLists.length; index++) {
        const element = AllLists[index];
        $('#cards').append(createListCard (element));   
    }
}


$('.close_project').click(function (e) { 
    e.preventDefault();
    
});
$('.add_list').click(function (e) { 
    e.preventDefault();
    
});
 function clearProjectModal(){
    $('#projectModal').removeAttr("data-id");
    $('#projectModal').modal('hide');
    $("#project_name").val('');
    $("#project_priority").val('');
    $("#project_notes").val('');
    $("#project_due_date").val(new Date());
    $("#project_not_required").prop('checked',false);
 }
 



 