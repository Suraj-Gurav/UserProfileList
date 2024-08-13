import React, { useEffect, useState } from 'react';
import './UserCard.css';
import { TfiEmail, TfiHeart, TfiLocationPin, TfiMobile, TfiTrash } from "react-icons/tfi";
import { PiGlobeHemisphereEastFill } from 'react-icons/pi';
import { IoBusinessSharp } from 'react-icons/io5';
import { TbHeartFilled } from 'react-icons/tb';
import { AiOutlineEdit } from 'react-icons/ai';
import { deleteUser, editUser, fetchUsers, likeClicked } from '../../ReduxConfig/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';

const UserCard = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  const handleEdit = (user) => {
    setIsEditModalOpen(true)
    setSelectedUser(user)
  }

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const saveChanges = () => {
    closeEditModal();
    dispatch(editUser({id:selectedUser.id, changes: selectedUser }));
  }
  const handleLikeClick = (userId)=>{
    dispatch(likeClicked({userId}))
  }
  return (
    <>
      <div className='UserCardMainDiv'>
        {users?.map(user =>
          <div key={user?.id} className="UserCardContainer">
            <div className="UserCardAvatarContainer">
              <img
                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user?.name}`}
                alt={user?.name}
                className="UserCardAvatar"
              />
            </div>
            <div className="UserCardContent">
              <h3>{user?.name}</h3>
              <p className="UserCardField">
                <TfiEmail className="UserCardIcon" />
                <span className='UserCardFieldValue'>
                  {user?.email}
                </span>
              </p>
              <p className="UserCardField">
                <TfiMobile className="UserCardIcon" />
                <span className='UserCardFieldValue'>
                  {user?.phone}
                </span>
              </p>
              <p className="UserCardField">
                <PiGlobeHemisphereEastFill className="UserCardIcon" />
                <span className='UserCardFieldValue'>
                  {user?.website}
                </span>
              </p>
              <p className="UserCardField">
                <IoBusinessSharp className="UserCardIcon" />
                <span className='UserCardFieldValue'>
                  {user?.company?.name}
                </span>
              </p>
              <p className="UserCardField">
                <TfiLocationPin className="UserCardIcon" />
                <span className='UserCardFieldValue'>
                  {user?.address?.suite + ", " + user?.address?.street + ","}
                  <br />{user?.address?.city + " - " + user?.address?.zipcode}
                </span>
              </p>
            </div>
            <div className="card-actions">
              <span onClick={() => handleLikeClick(user.id)}>{!user?.isLiked ? <TfiHeart color='red'/> : <TbHeartFilled color='red' />}</span>
              <AiOutlineEdit onClick={() => handleEdit(user)} />
              <TfiTrash onClick={() => handleDelete(user?.id)} />
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        user={selectedUser}
        setSelectedUser={setSelectedUser}
        onSave={saveChanges}
      />
    </>
  );
};

export default UserCard;
