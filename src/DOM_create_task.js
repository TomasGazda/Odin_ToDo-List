import { task } from "./Task";

function createTaskElement(pTask){
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
    checkbox.id = pTask.getid();
    checkbox.type = "checkbox";
    label.classList.add("form-check-label");

    span.classList.add("badge " ,"rounded-pill" ,"bg-transparent", "text-dark");
    date.classList.add("inline");
    
    
    
    
    

}