import React from 'react'

const TaskItem = (props) => {
    return (
        <>
            <div draggable onDragStart={props.onDragStart} className={`${props.bg} p-4 rounded-lg shadow-md mt-4 h-fit`}>
                <h3 className="text-2xl font-bold mb-1 border-b-2 border-slate-950 p-1">{props.title}</h3>
                <p className="text-gray-700 mb-1 p-1 line-clamp-3">{props.desc}</p>
                <div className="flex gap-2 justify-end ">
                    <button onClick={props.update}>
                        <svg width="40px" height="40px" viewBox="-18.48 -18.48 60.96 60.96" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064"></polygon> </g> </g> </g> </g></svg>
                    </button>
                    <button onClick={props.delete}>
                        <svg width="44px" height="44px" viewBox="-18 -18 60.00 60.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" strokeWidth="1.9200000000000004" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#000000" strokeWidth="1.9200000000000004" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000000" strokeWidth="1.9200000000000004" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="1.9200000000000004" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="1.9200000000000004" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskItem
