import {v4 as uuidv4} from 'uuid';

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
        return this.duedate;
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
function updateProject(Project){
    elementIndex = AllProjects.findIndex((obj => obj.id == 1));
    AllProjects[elementIndex] = Project;
}
function setAllProjects(array){
    AllProjects = array;
}

export{Project,createDefaultProject,AllProjects,addProject,getProject,deleteProject,updateProject,setAllProjects};