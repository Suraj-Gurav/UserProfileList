import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, user, onSave , setSelectedUser}) => {

  const handleChange = (event)=>{
    const {name, value}= event.target;
    if(name === 'companyName'){
      setSelectedUser(prev=>{return {...prev, company:{...prev.company,name:value}}})
    }else{
      setSelectedUser(prev=>{return{...prev,[name]:value}})
    }

  }
  return (
    <>
    {isOpen &&
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Edit User</h2>
          <button onClick={onClose} className="modalCloseButton">×</button>
        </div>
        <div className="modalBody">
          <div className="modalFormGroup">
            <label>Name:</label>
            <input type="text" value={user.name} name='name' onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="modalFormGroup">
            <label>Email:</label>
            <input type="email" value={user.email} name='email' onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="modalFormGroup">
            <label>Phone:</label>
            <input type="text" value={user.phone} name='phone' onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="modalFormGroup">
            <label>Website:</label>
            <input type="text" value={user.website} name='website' onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="modalFormGroup">
            <label>Company:</label>
            <input type="text" value={user.company.name} name='companyName' onChange={(e)=>handleChange(e)}/>
          </div>
        </div>
        <div className="modalFooter">
          <button onClick={()=>onClose()} className="modalCancelButton">Cancel</button>
          <button onClick={()=>onSave()} className="modalSaveButton">OK</button>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Modal;
