import { id } from "date-fns/locale";
import { TodoList } from "./ToDoList"

function createListCard(ToDoList){
    let container = document.createElement("div");
    container.classList.add("col-sm-12", "col-md-6", "col-lg-4", "bg-transparent", "d-flex", "justify-content-center");
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id",ToDoList.getListID());
}