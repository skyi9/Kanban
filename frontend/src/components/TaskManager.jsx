import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { delete_task, get_task, post_board, post_task, update_task } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function TaskManager() {

    const dispatch = useDispatch()
    const boardId = useSelector((res) => res.cur_board)
    useEffect(() => {
        if (boardId && boardId !== "") {
            dispatch(get_task(boardId))
        }
    }, [get_task, boardId, dispatch])
    const { data, loading } = useSelector((res) => res.get_tasks)

    const [input, setInput] = useState({ title: "", desc: "", status: "todo" })
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [input2, setInput2] = useState({ id: "", title: input.title, desc: input.desc, status: input.status })

    const modal = (status) => {
        if (open === false) {
            setOpen(true)
            setInput({ ...input, status: status })
        }
        else if (open === true) {
            setOpen(false)
        }
    }
    const onchange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const onchange2 = (e) => {
        setInput2({ ...input2, [e.target.name]: e.target.value })
    }
    const addTask = (e) => {
        e.preventDefault()
        dispatch(post_task(input.title, input.desc, input.status, boardId))
        setOpen(false)
        setInput({ title: "", desc: "" })
    }
    const deleteTask = (id) => {
        dispatch(delete_task(id))
    }
    const modal2 = (id) => {
        if (open2 === false) {
            setOpen2(true)
            const index = data.findIndex((task) => task._id === id)
            setInput2({ id: (data[index])._id, title: (data[index]).taskTitle, desc: (data[index]).taskDesc, status: (data[index]).taskStatus })
        }
        else if (open2 === true) {
            setOpen2(false)
        }
    }

    const updateTask = () => {
        dispatch(update_task(input2.id, input2.title, input2.desc, input2.status))
        setOpen2(false)
        setInput2({ title: "", desc: "" })
    }

    const onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id)
    }
    const onDragOver = (e) => {
        e.preventDefault()
    }
    const onDrop = (e, status) => {
        const taskId = e.dataTransfer.getData('id')
        const taskIdx = data.findIndex((task) => task._id === taskId)
        if (taskIdx !== -1) {
            try {
                const task = data[taskIdx]
                dispatch(update_task(taskId, task.taskTitle, task.taskDesc, status))
            } catch (error) {
            }
        }
    }

    return (
        <div className="bg-blue-950 h-screen shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
                <h1 className="text-xl text-white font-bold">Task Manager</h1>
            </div>
            {boardId === "" ? <div className="flex flex-col justify-center items-center h-full">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    Please add a board to create tasks <br /> If already created please select it
                </h3>
            </div>
                : <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-900 h-fit rounded-md p-4" onDragOver={onDragOver} onDrop={(e) => { onDrop(e, 'todo') }}>
                        <h2 className="text-xl text-white font-bold mb-2 italic">To Do</h2>
                        <button onClick={() => { modal('todo') }} className='w-full text-white bg-blue-950 shadow-xl py-2 px-4 text-lg font-bold rounded-md mb-3'>&#43;</button>
                        <div className='overflow-y-auto h-full' style={{ height: '34rem' }}>
                            {!loading && boardId !== "" &&
                                data?.filter((task) => task.taskStatus === 'todo')
                                    .map((item) => (
                                        <TaskItem
                                            bg='bg-orange-400'
                                            onDragStart={(e) => { onDragStart(e, item._id) }}
                                            key={item._id}
                                            title={item.taskTitle}
                                            desc={item.taskDesc}
                                            delete={() => { deleteTask(item._id) }}
                                            update={() => { modal2(item._id) }}
                                        />
                                    ))}
                        </div>
                    </div>

                    <div className="bg-blue-900 h-fit rounded-md p-4" onDragOver={onDragOver} onDrop={(e) => { onDrop(e, 'progress') }}>
                        <h2 className="text-xl text-white font-bold mb-2 italic">Progress</h2>
                        <button onClick={() => { modal('progress') }} className='w-full text-white bg-blue-950 shadow-xl py-2 px-4 text-lg font-bold rounded-md mb-3'>&#43;</button>
                        <div className='overflow-y-auto h-full' style={{ height: '34rem' }}>
                            {!loading && boardId !== "" && data?.filter((task) => task.taskStatus === 'progress')
                                .map((item) => {
                                    return <TaskItem bg='bg-yellow-400' onDragStart={(e) => { onDragStart(e, item._id) }} key={item._id} title={item.taskTitle} desc={item.taskDesc} delete={() => { deleteTask(item._id) }} update={() => { modal2(item._id) }} />
                                })}
                        </div>
                    </div>
                    <div className="bg-blue-900 h-fit rounded-md p-4" onDragOver={onDragOver} onDrop={(e) => { onDrop(e, 'completed') }}>
                        <h2 className="text-xl text-white font-bold mb-2 italic">Completed</h2>
                        <button onClick={() => { modal('completed') }} className='w-full text-white bg-blue-950 shadow-xl py-2 px-4 text-lg font-bold rounded-md mb-3'>&#43;</button>
                        <div className='overflow-y-auto h-full' style={{ height: '34rem' }}>
                            {!loading && boardId !== "" && data?.filter((task) => task.taskStatus === 'completed')
                                .map((item) => {
                                    return <TaskItem bg='bg-green-400' onDragStart={(e) => { onDragStart(e, item._id) }} key={item._id} title={item.taskTitle} desc={item.taskDesc} delete={() => { deleteTask(item._id) }} update={() => { modal2(item._id) }} />
                                })}
                        </div>
                    </div>
                    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Enter Title</h2>
                            <div>
                                <input onChange={onchange} type="text" name='title' value={input.title} className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4" />
                                <h2 className="text-lg font-bold mb-4">Enter Description</h2>
                                <input onChange={onchange} type="text" name='desc' value={input.desc} className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4" />

                                <div className="flex justify-end">
                                    <button type="button" onClick={modal} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none mr-2">Cancel</button>
                                    <button type="submit" onClick={addTask} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {open2 && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Enter Title</h2>
                            <div>
                                <input onChange={onchange2} type="text" name='title' value={input2.title} className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4" />
                                <h2 className="text-lg font-bold mb-4">Enter Description</h2>
                                <input onChange={onchange2} type="text" name='desc' value={input2.desc} className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4" />

                                <div className="flex justify-end">
                                    <button type="button" onClick={modal2} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none mr-2">Cancel</button>
                                    <button type="submit" onClick={updateTask} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>}
        </div>
    );
}

export default TaskManager;
