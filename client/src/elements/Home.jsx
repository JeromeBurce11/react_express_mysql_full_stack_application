import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function Home() {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    useEffect(() => {
        if (deleted) {
            setDeleted(false)
            axios.get('/acccounts')
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [deleted])

    function handleDelete(id) {
        axios.delete(`/delete/${id}`)
            .then((res) => {
                setDeleted(true)
            })
            .catch((err) => console.log(err))
    }
    return (

        <div className='container-fluid vh-100 vw-100'>
            <h3>Accounts</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/create'>Add Account</Link>
            </div>
            
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((account) => {
                            return (<tr>
                                <td>{account.id}</td>
                                <td>{account.name}</td>
                                <td>{account.email}</td>
                                <td>{account.age}</td>
                                <td>{account.gender}</td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/read/${account.id}`}>Read</Link>
                                    <Link className='btn mx-2 btn-success' to={`/edit/${account.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(account.id)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )   
}

export default Home