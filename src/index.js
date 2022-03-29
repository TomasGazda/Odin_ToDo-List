import { checkLocalStorage} from "./datamanamegent.js";
import "./assets/style.css";
import {createListCard} from "./DOM_create_list.js";
import {createProjectCard} from "./DOM_create_project.js";
import {AllLists} from "./ToDoList.js";
import {AllProjects} from "./project.js";



$( document ).ready(function() {
    checkLocalStorage();
    createProjectpage();

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



