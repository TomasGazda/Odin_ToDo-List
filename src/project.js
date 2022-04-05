import {v4 as uuidv4} from 'uuid';
import format from 'date-fns/format'
import {TodoList,getProjectLists,closeList} from './ToDoList.js'

let AllProjects = [];

class Project{

id;
name;
duedate;
priority;
notes;
done;
    constructor (project_name,project_duedate = new Date(0), project_priority = 1,project_notes = "",project_id = uuidv4()) {
     this.id = project_id;
     this.duedate = project_duedate;
     this.priority = project_priority;
     this.name = project_name;
     this.notes = project_notes;
     this.done = false;
    }

    getProject_Name(){
        return this.name;
    }
    setProject_Name(newName){
        this.name = newName;
    }
    getProject_DueDate(){
        const Duedate = new Date(this.duedate);
        
        if (Duedate.getFullYear() <= 1970){
            return "No Due Date"
        }
       
        return format(Duedate, 'dd MMM yyyy') ;
       
        
       
    }
    setProject_DueDate(newDueDate){
        this.duedate = newDueDate;
    }
    getProject_Priority(){
        return this.priority;
    }
    setProject_Priority(newPriority){
        this.priority = newPriority;
    }
    getProject_Notes(){
        return this.notes;
    }
    setProject_Notes(newNotes){
        this.notes = newNotes;
    }

    getProject_ID(){
        return this.id;
    }
    getProject_Done(){
        return this.done;
    }
    setProject_Done(newDone){
        this.done = newDone;
    }


}

function createDefaultProject(){
    let defaultProject = new Project("Default");
    
    return defaultProject;

}
function addProject(newProject){
    AllProjects.push(newProject); 

}
function getProject(id){
    return AllProjects.find(obj => obj.id === id);
    

}
function deleteProject(id){
    AllProjects = AllProjects.find(obj => obj.id !== id);

}
function updateProject(updProject){
    let elementIndex = AllProjects.findIndex(obj => obj.id == updProject.getProject_ID());
    AllProjects[elementIndex] = updProject;
}
function setAllProjects(array){
    AllProjects = array;
}
function close_project(id){
    let project = getProject(id);
    project.setProject_Done(true);
    updateProject(project);
    let lists = getProjectLists(id);
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        closeList(element.getListID());
    }
    


}




export{Project,createDefaultProject,AllProjects,addProject,getProject,deleteProject,updateProject,setAllProjects,close_project};