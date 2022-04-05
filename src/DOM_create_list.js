
import { TodoList,AllLists } from "./ToDoList"
import { getListTasks,task } from "./Task";
import { createTaskElement } from "./DOM_create_task";
import { getProject,Project } from "./project";
import { addDays, format } from 'date-fns/fp'

function createListCard(ToDoList){
    let container = document.createElement("div");
    container.classList.add("col-sm-12", "col-md-6", "col-lg-4", "bg-transparent", "d-flex", "justify-content-center");
    let card = document.createElement("div");
    let card_body = document.createElement('div');
    let list = document.createElement('ul');
    card.classList.add("card");
    card.setAttribute("data-id",ToDoList.getListID());
    card.setAttribute("data-type",'list');
    card_body.classList.add("card-body");
    list.classList.add("list-group","list-group-flush");
    list.id = 'tasks_'+ToDoList.getListID();


    card.innerHTML = `
    <div class="card-header bg-transparent">
    <div class="d-flex justify-content-between inline-block mb-3"> 
        <h5 class="align-middle mb-0 pt-2 list_name">`+ToDoList.getListName()+`</h5>
        <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                &#10247;
            </button>
            <ul class="dropdown-menu">
            <li><button class="dropdown-item update_list" >Update list</button></li>
            <li><button class="dropdown-item close_list" >Close list</button></li>
            <li><button class="dropdown-item add_task" >Add Task</button></li>
            </ul>
        </div>

    </div>
    
    <h6 class="card-subtitle mb-2 text-muted">Project:`+getProject(ToDoList.getListProject()).getProject_Name()+` </h6>
    <h6 class="card-subtitle mb-2 text-muted">Due Date: `+ToDoList.getListdueDate()+`</h6>
    <p>`+ToDoList.getListNote()+`</p>
  </div>
    
    `;

    let tasks = getListTasks(ToDoList.getListID());
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        let item = createTaskElement(element);
        list.appendChild(item);
    }
    card_body.appendChild(list);
    card.appendChild(card_body);
    container.appendChild(card);

    return container;

    
}

function createListitem(List){
    let item = document.createElement('li');
    let container = document.createElement('div');
    let form = document.createElement('div');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let span = document.createElement('span');
    let date = document.createElement("p");


    item.classList.add("list-group-item", "p-0");
    container.classList.add("d-flex", "justify-content-between");
    form.classList.add("form-check-inline");
    checkbox.classList.add("inline","form-check-input");
    checkbox.id = List.getListID();
    checkbox.type = "checkbox";
    checkbox.checked = List.getListDone();
    label.classList.add("form-check-label","detail_list");
    
    span.classList.add("badge" ,"rounded-pill" ,"bg-transparent", "text-dark");
    span.setAttribute('tabindex','0');
    span.setAttribute('data-bs-toggle','popover');
    span.setAttribute('data-bs-trigger','focus');
    span.setAttribute('data-bs-content',List.getListNote());
    span.id="span_"+List.getListID();
    date.classList.add("inline");

    label.innerHTML = List.getListName();
    label.id = 'label_'+List.getListID();
    span.innerHTML = "&#9432;";
    date.innerHTML = List.getListdueDate();
    date.id = "date_"+List.getListID();

    
    form.appendChild(checkbox);
    form.appendChild(label);
    form.appendChild(span);
    container.appendChild(form);
    container.appendChild(date);
    item.appendChild(container);

    return item;

}

function create_list_options(select_DOM){
    let lists = AllLists;
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        let option = document.createElement("option");
        option.value = element.getListID();
        option.text = element.getListName();
        if(index == 0){
            option.selected = true;
        }
        select_DOM.appendChild(option);

        
    }
}

export{createListCard,createListitem,create_list_options};