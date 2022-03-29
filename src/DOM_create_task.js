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
    checkbox.checked = pTask.getDone();
    label.classList.add("form-check-label");
    label.htmlFor = checkbox.id;
    span.classList.add("badge " ,"rounded-pill" ,"bg-transparent", "text-dark");
    span.setAttribute('data-bs-toggle','popover');
    span.setAttribute('data-bs-trigger','hover');
    span.setAttribute('data-bs-content',pTask.getNotes());
    date.classList.add("inline");

    label.innerHTML = pTask.getName();
    span.innerHTML = "&#9432;";
    date.innerHTML = pTask.getdueDate();

    label.appendChild(span);
    form.appendChild(checkbox);
    form.appendChild(label);
    container.appendChild(form);
    container.appendChild(date);
    item.appendChild(container);

    return item;

}
export{createTaskElement};