import { makeAutoObservable } from "mobx";

export interface ITodoModel {
    id: number; 
    title: string;
    description: string;
    status: string;
}

class TodoStore {
    todos: ITodoModel[] = [
        { id:1 , title:'last', description:'This is the first task to be performed', status:'Completed'},
        { id:2 , title:'First', description:'This is the first task', status:'Completed'},
        { id:3, title:'First', description:'This is the first task', status:'Completed'},
        { id:4, title:'First', description:'This is the first task', status:'Completed'},
        { id:5, title:'First', description:'This is the first task', status:'To Do'},
        { id:6, title:'First', description:'This is the first task', status:'To Do'},
        { id:7, title:'First', description:'This is the first task', status:'To Do'},
        { id:8, title:'First', description:'This is the first task', status:'To Do'},
        { id:9, title:'First', description:'This is the first task', status:'In Progress'},
        { id:10, title:'First', description:'This is the first task', status:'In Progress'},
        { id:11, title:'First', description:'This is the first task', status:'In Progress'}
    ]
    todo: ITodoModel = this.resetData();
    selectedTask: ITodoModel | null = null;
    
    resetData() {
        return {
            id: Math.max(0, Math.max(...this.todos.map(({ id }) => id)))+1, 
            title: '',
            description : '',
            status: '',
        }
    }

    saveStateToLocalStorage() {
        const state = JSON.stringify(this);
        localStorage.setItem('todoStore', state); 
    }

    constructor() {
        makeAutoObservable(this);
        // localStorage.clear()

        if( typeof window !== 'undefined'){
            const storedData = localStorage.getItem('todoStore');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                this.todos = parsedData.todos;
            }
        }
    }

    deleteData = (id: number) => {

        this.todos = this.todos.filter((todo) => todo.id !== id);

        if(typeof window !== 'undefined'){
            this.saveStateToLocalStorage();
        } 
    }

    addTodo(task: ITodoModel) {
        this.todos.push(task);

        if(typeof window !== 'undefined'){
            this.saveStateToLocalStorage();
        } 

        this.todo = this.resetData();
    }

    setSelectedTask(task: ITodoModel | null) {
        this.selectedTask = task;
    }

    updateTask(updatedTask: ITodoModel) {
        const taskIndex = this.todos.findIndex((task) => task.id === updatedTask.id);

        if (taskIndex !== -1) {
            this.todos[taskIndex] = updatedTask;
            if(typeof window !== 'undefined'){
                this.saveStateToLocalStorage();
            } 
        }
      }
}

const store = new TodoStore();
export default store;