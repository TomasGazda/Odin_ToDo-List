
import { Project,AllProjects } from "./project";
import { getProjectLists,TodoList } from "./ToDoList";
import { createListitem } from "./DOM_create_list";



function createProjectCard(project){
    let container = document.createElement("div");
    container.classList.add("col-sm-12", "col-md-6", "col-lg-4", "bg-transparent","grid-item");
    let card = document.createElement("div");
    let card_body = document.createElement('div');
    let list = document.createElement('ul');
    card.classList.add("card");
    card.setAttribute("data-id",project.getProject_ID());
    card.setAttribute("data-type",'project');
    card_body.classList.add("card-body");
    list.classList.add("list-group","list-group-flush");
    list.id = "lists_"+project.getProject_ID();
    


    card.innerHTML = `
    <div class="card-header bg-transparent">
    <div class="d-flex justify-content-between inline-block mb-3"> 
        <h5 class="align-middle mb-0 pt-2 project_name">`+project.getProject_Name()+`</h5>
        <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                &#10247;
            </button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item update_project" >Update project</button></li>
            <li><button class="dropdown-item close_project" >Close project</button></li>
            <li><button class="dropdown-item add_list" >Add List</button></li>
            </ul>
        </div>

    </div>
    
   
    <h6 class="card-subtitle mb-2 text-muted due_date ">Due Date: `+project.getProject_DueDate()+`</h6>
    <p class="notes">`+project.getProject_Notes()+`</p>
  </div>
    
    `;

    let lists = getProjectLists(project.getProject_ID());
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        let item = createListitem(element);
        list.appendChild(item);
    }
    card_body.appendChild(list);
    card.appendChild(card_body);
    container.appendChild(card);

    return container;

    
}

function create_project_options(select_DOM){
    let projects = AllProjects;
    for (let index = 0; index < projects.length; index++) {
        const element = projects[index];
        let option = document.createElement("option");
        option.value = element.getProject_ID();
        option.text = element.getProject_Name();
        if( element.getProject_Name() == "Default"){
            option.selected = true;
        }
        
        select_DOM.appendChild(option);

        
    }
}


export{createProjectCard,create_project_options};