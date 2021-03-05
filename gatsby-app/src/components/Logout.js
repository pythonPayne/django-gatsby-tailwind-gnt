import React from 'react'
import Layout from './Layout'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/actions/auth'

const Loguout = ({dark}) => {
    const dispatch = useDispatch()    
    return (
        <Layout>            
            <div className={`flex flex-col justify-center items-center pt-24`}>
                <button 
                className={`focus:outline-none px-2 py-1 w-1/2 text-gray-700 font-thin tracking-wide
                bg-gray-200 bg-opacity-60 hover:bg-gray-100 rounded-lg 
                ${dark && "bg-red-700 hover:bg-red-600 text-blue-300 rounded-lg"}`}
                onClick={() => {
                    window.location.reload();
                    dispatch(logoutUser());                 
                    console.log("logged out successfully");                
                    }}>
                    Log me out
                </button>
            </div>
        </Layout>
    )
}

export default Loguout
