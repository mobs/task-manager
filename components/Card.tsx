'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import store, { ITodoModel } from '@/stores/TodoStore';


interface CardProps {
    task?: ITodoModel | null;
}

const Card: React.FC<CardProps> = ( {task} ) => {

    const [formData, setFormData] = useState({
        id: -1,
        title: '',
        description: '',
        status: '',
      });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (task) {
            formData.id = task.id;
            store.updateTask(formData)
          } else {
            store.addTodo(formData);
          }

        setFormData({
            id:-1,
            title: '',
            description: '',
            status: '',
        });
    }

    useEffect(() => {
        if (task) {
          setFormData(task);
        }
      }, [task]);

    return (
    
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className='flex justify-center font-medium'> Add/Edit Task </h2>
        <div className="p-5">
            <form onSubmit={addNewTodo} >
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input type="text" id="title" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Title here..." 
                        name = 'title'
                        value = {formData.title}
                        required
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                    </label>
                    <textarea id="description" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder='Describe your task...' 
                        name = 'description'
                        value = {formData.description}
                        required 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Status
                    </label>
                    <input type="text" id="status" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder='Status of task'
                        name='status'
                        value = {formData.status}
                        required 
                        onChange={handleInputChange} 
                    />
                </div>

                <button type="submit" 
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    SUBMIT
                </button>
            </form>
        </div>
    </div>

  )
}

export default Card;