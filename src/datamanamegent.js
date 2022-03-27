import { Project,AllProjects } from "./project.js";
import { TodoList,AllLists } from "./ToDoList.js";
import { task,AllTasks } from "./Task.js";

//let Projects = require("./project.js")


function CheckifExist(name){
    if(localStorage.getItem(name)){
        return true;
    }
    return false;
}

function setupLocalStorage(){
    let projects = [];
    let defaultProject = new Project('Default');   
    projects.push(JSON.stringify(defaultProject));  
    localStorage.setItem("projects",JSON.stringify(projects));
    let lists = [];
    localStorage.setItem("lists",JSON.stringify(lists));
    let tasks = [];
    localStorage.setItem("tasks",JSON.stringify(tasks));
    

}

function checkLocalStorage(){
    localStorage.clear();
    if(!CheckifExist("projects")){
        setupLocalStorage();
    }
    AllLists = getallLists();
    AllProjects = getallProjects();
    AllTasks - getallTasks()
}

function getallLists(){
    return JSON.parse(localStorage.getItem("lists"));
}

function getallProjects(){
    let projects = JSON.parse(localStorage.getItem("projects"));
    for (let index = 0; index < projects.length; index++) {
        const element = JSON.parse(projects[index]);     
        let project = new Project(element.name,element.duedate,element.priority,element.notes,element.id);
        
    }
    return projects;
    
}

function getallTasks(){
    return JSON.parse(localStorage.getItem("tasks"));

}

function updateTasks(){
    localStorage.setItem("tasks",JSON.stringify(AllTasks));

}
function updateLists(){
    localStorage.setItem("lists",JSON.stringify(AllLists));

}
function updateProjects(){
    localStorage.setItem("projects",JSON.stringify(AllProjects));

}


function closeSession(){
    updateTasks();
    updateLists();
    updateProjects();

}

export{checkLocalStorage,getallLists,getallProjects,getallTasks,closeSession};