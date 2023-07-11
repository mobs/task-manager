'use client'
import Card from "@/components/Card";
import TaskCard from "@/components/TaskCard";
import store, { ITodoModel } from "@/stores/TodoStore";
import { Provider, observer } from "mobx-react";


const Home = () => {

  return(
    <Provider store={store}>
      <main className="m-2">
        <div className="flex flex-col md:flex-row md:justify-between">
            <div className=" flex m-5 w-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-4">
              {store.todos.map((item: ITodoModel, idx) => (
                <TaskCard data={item} key={idx}  />
              ))}
                
            </div>
            <div className="m-5">
                <Card task={store.selectedTask}/>
            </div>
            
        </div>
      </main>
    </Provider>
)}


export default observer(Home);