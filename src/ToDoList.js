import {v4 as uuidv4} from 'uuid';
import { AllTasks,getListTasks,getDateTask,getUrgentTask} from './Task';
import format from 'date-fns/format'

let AllLists = [];

class TodoList{
    id;
    project;
    name;
    dueDate;
    priority;
    note;
    done;

        constructor(project_id,TodoList_name,list_duedate=new Date(0),priority=1,note="",id=uuidv4()){
            this.id = id;
            this.project = project_id;
            this.name = TodoList_name;
            this.dueDate = list_duedate;
            this.priority = priority;
            this.note = note;
            this.done = false;


        }

        getListID() {
            return this.id;
        }
        getListProject(){
             return this.project;
         }
         setListProject(project_id){
             this.project = project_id;
         }
        getListName(){
            return this.name;
        }
        setListName(list_name){
            this.name = list_name;
        }
        getListdueDate(){
            const Duedate = new Date(this.dueDate);
        
        if (Duedate.getFullYear() <= 1970 || this.dueDate ==""){
            return "No Due Date"
        }
       
        return format(Duedate, 'yyyy-MM-dd') ;
        }
        setListDueDate(list_duedate){
            this.dueDate = list_duedate;
        }
        getListPriority(){
            return this.priority;
        }
        setListPriority(list_priority){
            this.priority = list_priority;
        }
        getListNote(){
            return this.note;
        }
        setListNotes(list_note){
            this.note = list_note;
        }
        getListDone(){
            return this.done;
        }
        setListDone(list_done){
            this.done = list_done;
        }


}
function addList(newList){
    AllLists.push(newList); 

}
function getList(id){
    return AllLists.find(obj => obj.id === id);
    

}
function deleteList(id){
    AllLists = AllLists.find(obj => obj.id !== id);

}
function updateList(List){
    let elementIndex = AllLists.findIndex((obj => obj.id == List.getListID()));
    AllLists[elementIndex] = List;
}
function setAllLists(array){
    AllLists = array;
}
function getProjectLists(project){
    let result = AllLists.filter(obj => obj.project === project);
    if (typeof result ==="undefined"){
        return[];
    }
    return result;
    
}
function closeList(id){
    let list = getList(id);
    list.setListDone(!list.getListDone());
    updateList(list)
    let tasks = getListTasks(id);
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        element.setDone(!element.getDone());
        updateTask(element);
        
    }
}
function getDateList(lookupDate){
    let set = getDateTask(lookupDate);
    let lists = AllLists.filter(obj => set.has(obj.id));
    return lists;
}
function getUrgentList(){
    let set = getUrgentTask();
    let lists = AllLists.filter(obj => set.has(obj.id));
    return lists;

}

export {TodoList,AllLists,addList,getList,deleteList,updateList,setAllLists,getProjectLists,closeList,getDateList,getUrgentList};