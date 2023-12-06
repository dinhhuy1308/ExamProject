import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";


const ManageUser = () => {
    const LIMIT_USER = 1;
    const [pageCount, setPagecount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listUsers, setListUsers] = useState([]);


    const fetchListUsers = async () => {
        const resp = await getAllUsers();
        if(resp.EC === 0) {
            setListUsers(resp.DT);
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        const resp = await getUserWithPaginate(page, LIMIT_USER);
        if(resp.EC === 0) {
            setListUsers(resp.DT.users);
            setPagecount(resp.DT.totalPages);
        }
    }

    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    return (
        <div className='manage-users-container'>
            <div className="title">
                Manage Users
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={()=>setShowModalCreateUser(true)}> <FcPlus /> Add new users</button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete} /> */}

                    <TableUserPaginate 
                        listUsers={listUsers} 
                        handleClickBtnUpdate={handleClickBtnUpdate} 
                        handleClickBtnDelete={handleClickBtnDelete} 
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate} 
                        pageCount={pageCount} 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setShowModalCreateUser} 
                    fetchListUsers={fetchListUsers} 
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser 
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser} 
                    dataUpdate={dataUpdate} 
                    fetchListUsers={fetchListUsers} 
                    resetUpdateData={resetUpdateData} 
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser 
                    show={showModalDeleteUser}  
                    setShow={setShowModalDeleteUser} 
                    dataDelete={dataDelete}  
                    fetchListUsers={fetchListUsers} 
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageUser;