import {v4 as uuidv4} from 'uuid';
import format from 'date-fns/format'

let AllTasks = [];

class task {

    id;
    todolist;
    name;
    dueDate;
    priority;
    notes;
    done;

    constructor(task_name,task_list,task_dueDate= new Date(0),task_priority = 1,task_notes='',id=uuidv4()){
        this.id = id;
        this.name = task_name,
        this.todolist = task_list;
        this.dueDate = task_dueDate;
        this.priority = task_priority;
        this.notes = task_notes;
        this.done = false;

    }

    getid(){
        return this.id
    }
    getList(){
        return this.todolist;
    }
    setList(list){
         this.todolist = list;
    }
    getName(){
        return this.name;
    }
    setName(newName){
        this.name = newName;
    }
    getdueDate(){
        const Duedate = new Date(this.dueDate);
        
        if (Duedate.getFullYear() <= 1970|| this.dueDate ==""){
            return "No Due Date"
        }
       
        return format(Duedate, 'yyyy-MM-dd') ;
    }
    setdueDate(newDueDate){
        this.dueDate = newDueDate;
    }
    getPriority(){
        return this.priority;
    }
    setPriority(newPriority){
        this.priority = newPriority;
    }
    getNotes(){
        return this.notes;
    }
    setNotes(newNotes){
        this.notes = newNotes;
    }
    getDone(){
        return this.done;
    }
    setDone(newDone){
        this.done = newDone;
    }
}

function addTask(newTask){
    AllTasks.push(newTask); 

}
function getTask(id){
    return AllTasks.find(obj => obj.id === id);
    

}
function deleteTask(id){
    AllTasks = AllTasks.find(obj => obj.id !== id);

}
function updateTask(Task){
    elementIndex = AllTasks.findIndex((obj => obj.id == 1));
    AllTasks[elementIndex] = Task;
}

function setAllTasks(array){
    AllTasks = array;
}

function getListTasks(list){
    let result = AllTasks.filter(obj => obj.todolist === list);
    if (typeof result ==="undefined"){
        return[];
    }
    return result;
    
}
function getDateTask(lookupDate){
    let tasks = AllTasks.filter(obj => new Date(obj.dueDate).getTime() <= lookupDate.getTime() && new Date(obj.dueDate).getTime()>0);
    let lists = tasks.map(obj => {return obj.todolist});
    return new Set(lists);

}
function getUrgentTask(){
    let tasks = AllTasks.filter(obj => obj.priority == 4);
    let lists = tasks.map(obj => {return obj.todolist});
    return new Set(lists);

}
export{task,AllTasks,addTask,getTask,deleteTask,updateTask,setAllTasks,getListTasks,getDateTask,getUrgentTask};