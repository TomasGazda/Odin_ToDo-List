import { checkLocalStorage} from "./datamanamegent.js";
import "./assets/style.css";
import {createListCard,create_list_options,createListitem} from "./DOM_create_list.js";
import {createProjectCard,create_project_options} from "./DOM_create_project.js";
import { createTaskElement } from "./DOM_create_task.js";
import {AllLists,getList,TodoList,updateList,addList,closeList,getProjectLists} from "./ToDoList.js";
import {AllProjects,getProject,Project,updateProject,addProject,close_project} from "./project.js";
import {task,getTask,updateTask,addTask} from './Task.js'







$( document ).ready(function() {
    checkLocalStorage();
    createProjectpage();
    create_project_options(document.getElementById('project_select'));
    create_list_options(document.getElementById('list_select'));
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
    $("#cards").on('click', '.badge', function(e) {
        var exampleTriggerEl = e.target;
        var popover = bootstrap.Popover.getOrCreateInstance(exampleTriggerEl,{trigger:'focus'});
        popover.show()

    });
    $("#cards").on('click', ".add_list", function() {
        
        let id = $(this).closest('.card').attr('data-id');
        const $select = document.querySelector('#project_select');
        const $options = Array.from($select.options);
        const optionToSelect = $options.find(item => item.value ===id);
        optionToSelect.selected = true;
        $("#listModal").modal("show");
    });
    $("#cards").on('click', ".close_project", function() {
        
        let id = $(this).closest('.card').attr('data-id');
        close_project(id);
    });
    $("#cards").on('click', ".add_task", function() {
        let id = $(this).closest('.card').attr('data-id');
        const $select = document.querySelector('#list_select');
        const $options = Array.from($select.options);
        const optionToSelect = $options.find(item => item.value ===id);
        optionToSelect.selected = true;
        $("#taskModal").modal("show");
    });
    $("#cards").on('click', ".update_list", function() {
        let id = $(this).closest('.card').attr('data-id');
        let list = getList(id);
        $('#listModal').attr('data-id',id);
        $('#list_name').val(list.getListName());
        $('#list_priority').val(list.getListPriority());
        if(project.getListdueDate()=="No Due Date"){
            $('#list_due_date').prop('disabled', true);
            $('#list_not_required').prop('checked', true);
        }
        else{
            $('#list_due_date').val(list.getListdueDate());
        }
        $('#list_notes').val(list.getListNote());
        $('#project_select').val(list.getListProject());

        $("#listModal").modal("show");

    });
    $("#cards").on('click', ".close_list", function() {
        let id = $(this).closest('.card').attr('data-id');
        closeList(id);
    });
    $("#cards").on('click', ".project_name", function() {
        let id = $(this).closest('.card').attr('data-id');
        $('#cards').html('');
        createProjectDetailPage(id);
    });
    $("#cards").on('click', ".detail_list", function() {
        let id = $(this).closest('checkbox').id;
        $('#cards').html('');
        createListPage(id);
    });




    $("#save_project").click(function (e) { 
       if(EmptyDate()){
        $("#project_feedback").css('display','inline-block');
       }else{

        let id = $('#projectModal').attr('data-id');
        
        if(id !== undefined){
            let project = getProject($('#projectModal').attr('data-id'));
            let card = $('.card[data-id="'+id+'"]'); 
           
            
            project.setProject_Name($("#project_name").val());
            $('.card[data-id="'+id+'"]').find(".project_name").text($("#project_name").val());
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
        document.getElementById('project_select').innerHTML ='';
        create_project_options(document.getElementById('project_select')); 

      }
    });


    $('#save_list').on('click',function(e){
        if(EmptyDate()){
            $("#list_feedback").css('display','inline-block');

        }else{
        let id = $('#listModal').attr('data-id');      
            if(id !== undefined){
                let list = getList(id);
                if($('.card[data-id="'+id+'"]').length){
                    $('.card[data-id="'+id+'"]').find(".list_name").text($("#list_name").val());
                    $('.card[data-id="'+id+'"]').find(".notes").text($("#list_notes").val());
    
                    if($('#list_not_required').is("checked")){
                        $('.card[data-id="'+id+'"]').find(".due_date").text("Due Date: No Due Date");
                    }else{
                        $('.card[data-id="'+id+'"]').find(".due_date").text("Due Date: "+$("#list_due_date").val());
                    }
    
                }
    
                list.setListName($('#list_name').val());
               
                list.setListProject($('#project_select').val());
                list.setListPriority($('#list_priority').val());
                list.setListNotes($('#list_notes').val());
                
                if($('#list_not_required').is("checked")){
                    list.setListDueDate(new Date(0));
                    
    
                }else{
                    list.setListDueDate($('#list_due_date').val());
                   
                }
                updateList(list);
                clearListModal();
                createProjectpage();

    
             }else{
                let due_date;
                if($('#list_not_required').is(":checked")){
                    due_date = new Date(0);
                }else{
                   due_date = $("#list_due_date").val();
                }
                let list = new TodoList($('#project_select').val(),$('#list_name').val(),due_date,$('#list_priority').val(),$('#list_notes').val());
               
                addList(list);
                clearListModal();
                if($("#lists_"+$('#project_select').val()).length){
                    $('#cards').html('');
                    createProjectpage();
    
                }else{
                    $('#cards').html('');
                    createListPage();
    
                }
    
    
            }
            document.getElementById('list_select').innerHTML ='';
            create_list_options(document.getElementById('list_select')); 
        }
    });  
    $('#save_task').on('click',function(e){
        if(EmptyDate()){
            $("#task_feedback").css('display','inline-block');

        }else{
        let id = $('#taskModal').attr('data-id');      
            if(id !== undefined){
                let task = getTask(id);
                task.setName($("#task_name").val());
                $("#label_"+id).val($("#task_name").val());
                task.setPriority($("#task_priority").val());
                task.setList($("#list_select").val());
                task.setNotes($("#task_notes").val());
                $("#span_"+id).attr('data-bs-content',$("#task_notes").val());
                
                if($('#task_not_required').is("checked")){
                    task.setdueDate(new Date(0));
                    $("#date_"+id).val(task.getdueDate());
                              
                }else{
                    task.setdueDate($("#task_due_date").val());
                    $("#date_"+id).val(task.getdueDate());   
                }
                updateTask(task);
                cleartaskModal();
        

    
             }else{
                let due_date;
                if($('#task_not_required').is(":checked")){
                    due_date = new Date(0);
                }else{
                   due_date = $("#task_due_date").val();
                }
                let task = new task($("#task_name").val(),$("#list_select").val(),due_date,$("#task_priority").val(),$("#task_notes").val());
                addTask(task);
                createListPage();
                
                
               
    
    
            }
        }
    });  



    $('#project_not_required').on('click',function(){
        if($('#project_not_required').is(":checked")){
           
            $("#project_due_date").prop('disabled', true);
    
        }else{
            
            $("#project_due_date").prop('disabled', false);
    
        }
     });
     $('#list_not_required').on('click',function(){
        if($('#list_not_required').is("checked")){
            
            $("#list_due_date").prop('disabled', true);
    
        }else{
           
            $("#list_due_date").prop('disabled', false);
    
        }
     });
     $('#task_not_required').on('click',function(){
        if($('#task_not_required').is(":checked")){
           
            $("#task_due_date").prop('disabled', true);
    
        }else{
          
            $("#task_due_date").prop('disabled', false);
    
        }
     });
     

     $('#projectModal').on('hidden.bs.modal',function(){
        clearProjectModal();
     });
     $('#listModal').on('hidden.bs.modal',function(){
        clearListModal();
     });
     $('#taskModal').on('hidden.bs.modal',function(){
        cleartaskModal();
     });




 //end of document ready function   
});





function createProjectpage(id =0){
    for (let index = 0; index < AllProjects.length; index++) {
        const element = AllProjects[index];
        if((id ==0 && element.getProject_Done()== false) || (id!=0 && id==element.getProject_ID())){
            $('#cards').append(createProjectCard (element));   
        }
    }

}

function createListPage(id=0){
    for (let index = 0; index < AllLists.length; index++) {
        const element = AllLists[index];
        if((id ==0 && element.getListDone()==false) || (id !=0 && element.getListID()==id)){
            $('#cards').append(createListCard (element));   
        }
    }
}

function createProjectDetailPage(projectid){
    let lists_project = getProjectLists(projectid);
    for (let index = 0; index < lists_project.length; index++) {
        const element = lists_project[index];    
        $('#cards').append(createListCard (element));   
    }


}




 function clearProjectModal(){
    $('#projectModal').removeAttr("data-id");
    $('#projectModal').modal('hide');
    $("#project_name").val('');
    $("#project_priority").val('');
    $("#project_notes").val('');
    $("#project_due_date").val(new Date());
    $("#project_not_required").prop('checked',false);
    $("#project_feedback").css('display','none');

 }

 function clearListModal(){
    $('#listModal').removeAttr("data-id");
    $('#listModal').modal('hide');
    $("#list_name").val('');
    $("#list_priority").val('');
    $("#list_notes").val('');
    $("#list_due_date").val(new Date());
    $("#list_not_required").prop('checked',false);
    $("#list_feedback").css('display','none');


 }

 function cleartaskModal(){
    $('#taskModal').removeAttr("data-id");
    $('#taskModal').modal('hide');
    $("#task_name").val('');
    $("#task_priority").val('');
    $("#task_notes").val('');
    $("#task_due_date").val(new Date());
    $("#task_not_required").prop('checked',false);
    $("#task_feedback").css('display','none');


 }

 $('#list_view').on('click',function(){
    $('#cards').html('');
    createListPage();
 });

 $('#project_view').on('click',function(){
    $('#cards').html('');
    createProjectpage();
 });

 function EmptyDate(){
     if(($('#list_not_required').is(":checked")||($('#list_due_date').val()==''))&&($('#task_not_required').is(":checked")||($('#task_due_date').val()==''))&&($('#project_not_required').is(":checked")||($('#project_due_date').val()==''))){
         return true;
     }
     return false;
 }
 
 



 