import {v4 as uuidv4} from 'uuid';
import { AllTasks } from './Task';

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
            return this.dueDate;
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
    elementIndex = AllLists.findIndex((obj => obj.id == 1));
    AllLists[elementIndex] = List;
}
function setAllLists(array){
    AllLists = array;
}
function getProjectLists(project){
    return AllLists.find(obj => obj.project === project);
    
}

export {TodoList,AllLists,addList,getList,deleteList,updateList,setAllLists,getProjectLists};