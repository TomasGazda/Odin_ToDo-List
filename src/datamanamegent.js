import { Project,AllProjects,setAllProjects } from "./project.js";
import { TodoList,AllLists,setAllLists } from "./ToDoList.js";
import { AllTasks,task,setAllTasks} from "./Task.js";

//let Projects = require("./project.js")


function CheckifExist(name){
    if(localStorage.getItem(name)){
        let item = localStorage.getItem(name);
        let item_lenght = item.length;
        if(item.length>2){
            return true;
        }
        return false;
    }
    return false;
}

function setupLocalStorage(){
    let projects = [];
    let defaultProject = new Project('Default');   
    projects.push(defaultProject);  
    localStorage.setItem("projects",JSON.stringify(projects));
    let lists = [];
    localStorage.setItem("lists",JSON.stringify(lists));
    let tasks = [];
    localStorage.setItem("tasks",JSON.stringify(tasks));
    

}

function checkLocalStorage(){
    //localStorage.clear();
    if(!CheckifExist("projects")){
        setupLocalStorage();
    }
    setAllLists(getallLists());
    setAllProjects(getallProjects());
    setAllTasks(getallTasks());
}

function getallLists(){
    let JSONLists = JSON.parse(localStorage.getItem("lists"));
    let lists = [];
    for (let index = 0; index < JSONLists.length; index++) {
        const element = JSONLists[index];     
        let list = new TodoList(element.project,element.name,element.dueDate,element.priority,element.note,element.id);
        lists.push(list);
    }

    return lists;
}

function getallProjects(){
    let JSONprojects = JSON.parse(localStorage.getItem("projects"));
    let projects = [];
    for (let index = 0; index < JSONprojects.length; index++) {
        const element = JSONprojects[index];     
        let project = new Project(element.name,element.duedate,element.priority,element.notes,element.id);
        projects.push(project);
    }

    return projects;
    
}

function getallTasks(){
    let JSONTasks = JSON.parse(localStorage.getItem("tasks"));
    let tasks = [];
    for (let index = 0; index < JSONTasks.length; index++) {
        const element = JSONTasks[index];     
        let new_task = new task(element.name,element.todolist,element.dueDate,element.priority,element.notes,element.id);
        tasks.push(new_task);
    }

    return tasks;

}

function updateTasks(){
    localStorage.setItem("tasks",JSON.stringify(AllTasks));

}
function updateLists(){
    console.log(AllLists);
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