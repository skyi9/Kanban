import React from 'react'
import Sidebar from '../components/Sidebar'
import TaskManager from '../components/TaskManager'

const Home = () => {
    return (
        <>
            <div className="flex">
                <div className="w-1/5 bg-gray-200 h-screen">
                    <Sidebar />
                </div>
                <div className="w-4/5 bg-white h-screen">
                    <TaskManager />
                </div>
            </div>
        </>
    )
}

export default Home
