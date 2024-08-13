import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import Loader from './Loader'
import UserCard from './UserCards/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../ReduxConfig/usersSlice'

const UserProfile = () => {
    const { status } = useSelector((state) => state.users);

    return (
        <div className='mainWrapper'>
            <Loader isLoading={status} />
            <UserCard/>
        </div>
    )
}

export default UserProfile