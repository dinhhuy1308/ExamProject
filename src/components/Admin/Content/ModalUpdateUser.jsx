import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCreateNewUser, putUpdateNewUser } from '../../../services/apiServices';
import _ from 'lodash';



const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUsers, dataUpdate, resetUpdateData } = props;
    const handleClose = () => {
        setShow(false)
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setPreviewImage('');
        resetUpdateData();
    };

    useEffect(()=>{
        if(!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            if(dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
            }
        }
    },[dataUpdate])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } 
    }

    const handleSubmitCreateUser = async () => {

        const data = await putUpdateNewUser(dataUpdate.id, username, role, image);
        if(data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.fetchListUsersWithPaginate(props.currentPage);
        }

        if(data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal className='modal-add-user' show={show} onHide={handleClose} size='xl' >
                <Modal.Header closeButton>
                    <Modal.Title>Update a uses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input disabled type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input disabled type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(e) => setRole(e.target.value)} value={role}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelupload'>
                                <FcPlus />
                                Upload File Image
                            </label>
                            <input type="file" id='labelupload' hidden onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage} alt="" /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default ModalUpdateUser;