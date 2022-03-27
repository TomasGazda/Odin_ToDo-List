import {v4 as uuidv4} from 'uuid';

let AllTasks;

class task {

    id;
    todolist;
    name;
    dueDate;
    priority;
    notes;
    done;

    constructor(task_name,task_list,task_dueDate= new Date(0),task_priority = 1,task_notes=''){
        this.id = uuidv4();
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
    getName(){
        return this.name;
    }
    setName(newName){
        this.name = newName;
    }
    getdueDate(){
        return this.dueDate;
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
export{task,AllTasks};