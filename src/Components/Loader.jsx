import React from 'react'
import './Loader.css'

const Loader = ({ isLoading }) => {
    return (
        <>
            {isLoading &&
                <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>
            }
        </>
    )
}

export default Loader