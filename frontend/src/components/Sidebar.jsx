import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_boards, post_board, delete_board, set_board } from '../redux/actions/actions'

const Sidebar = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_boards())
    }, [get_boards])
    const { data, loading } = useSelector((res) => res.get_boards)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")

    const [activeButton, setActiveButton] = useState("");

    const addBoard = (e) => {
        e.preventDefault()
        if (open === true) {
            setOpen(false)
        } else if (open === false) {
            setOpen(true)
        }
    }
    const onchange = (e) => {
        setTitle(e.target.value)
    }
    const newBoard = (e) => {
        e.preventDefault()
        dispatch(post_board(title))
        setOpen(false)
        setTitle("")
    }

    const deleteBoard = (id) => {
        dispatch(delete_board(id))
        setTitle("")
    }

    const curBoard = (id) => {
        dispatch(set_board(id))
        setActiveButton(id);
    }

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-800">
                <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
                    <h1 className="text-xl font-semibold">Kanban</h1>
                </div>
                <div className="flex flex-col flex-grow p-4">
                    <button onClick={addBoard} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
                        Add Board
                    </button>
                    {!loading &&
                        data.map((board) => {
                            return <button key={board._id} onClick={() => { curBoard(board._id) }} className={`flex items-center justify-between px-4 py-2 ${activeButton === board._id ? "bg-red-500" : "bg-white"} border border-gray-300 rounded-md hover:shadow-md focus:outline-none mt-4`}>
                                <span className={`flex-1 text-center font-semibold ${activeButton === board._id ? "text-white" : "text-gray-700"}`}>{board.boardTitle}</span>
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${activeButton === board._id ? "bg-white" : "bg-blue-500"}  ${activeButton === board._id ? "hover:bg-slate-100" : "hover:bg-blue-600"} cursor-pointer`}>
                                    <svg onClick={() => { deleteBoard(board._id) }} className={`w-4 h-4 ${activeButton === board._id ? "text-red-500" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            </button>


                        })
                    }


                    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Enter Title</h2>
                            <form>
                                <input onChange={onchange} type="text" value={title} className="w-full border border-gray-300 px-4 py-2 rounded-md mb-4" />
                                <div className="flex justify-end">
                                    <button type="button" onClick={addBoard} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none mr-2">Cancel</button>
                                    <button type="submit" onClick={newBoard} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Sidebar
