import { BiSolidEdit } from 'react-icons/bi'; 
import { AiOutlineDelete } from 'react-icons/ai'
import store, { ITodoModel } from '@/stores/TodoStore';

interface TaskCardProps {
    data: ITodoModel;
}

const TaskCard: React.FC<TaskCardProps> = ( {data} ) => {

    return (    
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex m-3 justify-between'> 
                <h6> Status: </h6>
                {data.status.toLowerCase() === 'to do'
                ? <button className='bg-red-500 rounded p-2'> {data.status} </button>
                : data.status.toLowerCase() === 'in progress'
                ? <button className='bg-yellow-500 rounded p-2'> { data.status }</button>
                : <button className='bg-green-500 rounded p-2'> {data.status} </button>
                }
            </div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {data.description}</p>
                <button className='m-3 bg-gray-500 w-350 rounded p-3' onClick={() => store.setSelectedTask(data) } > <BiSolidEdit /> </button>
                <button className='m-3 bg-gray-500 w-350 rounded p-3' onClick={() => store.deleteData(data.id)} > <AiOutlineDelete /> </button>
            </div>
        </div>
    )
}

export default TaskCard;