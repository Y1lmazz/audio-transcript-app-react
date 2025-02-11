import React from 'react'
import { FaPlus } from "react-icons/fa";


function Header() {
    return (
        <div className='header'>
            <a href="/">
                <h1>Script<span className='span'>Flow</span></h1>
            </a>

            <a href="/">
                <button className="new-btn">
                    <span>New</span>
                    <FaPlus />
                </button>
            </a>

        </div>
    )
}

export default Header