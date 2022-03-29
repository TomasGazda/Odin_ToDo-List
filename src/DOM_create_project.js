
import { Project } from "./project";
import { getProjectLists,TodoList } from "./ToDoList";


import { createListitem } from "./DOM_create_list";


function createProjectCard(project){
    let container = document.createElement("div");
    container.classList.add("col-sm-12", "col-md-6", "col-lg-4", "bg-transparent", "d-flex", "justify-content-center");
    let card = document.createElement("div");
    let card_body = ducument.createElement('div');
    let list = document.createElement('ul');
    card.classList.add("card");
    card.setAttribute("data-id",project.getProject_ID());
    card.setAttribute("data-type",'project');
    card_body.classList.add("card-body");
    list.classList.add("list-group","list-group-flush");


    card.innerHTML = `
    <div class="card-header bg-transparent">
    <div class="d-flex justify-content-between inline-block"> 
        <h5 class="align-middle mb-0 pt-2">`+project.getProject_Name()+`</h5>
        <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                &#10247;
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Update list</a></li>
            <li><a class="dropdown-item" href="#">Close list</a></li>
            <li><a class="dropdown-item" href="#">Add Task</a></li>
            </ul>
        </div>

    </div>
    
    <h6 class="card-subtitle mb-2 text-muted">Project: </h6>
    <h6 class="card-subtitle mb-2 text-muted">Due Date: `+project.getProject_DueDate()+`</h6>
    <p>`+project.getProject_Notes()+`</p>
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

export{createProjectCard};