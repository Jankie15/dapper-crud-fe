import { useState, useEffect } from 'react';
import axios from 'axios';

function DatGrid() {
    const [data, setData] = useState([{}]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dataBaseData();
    }, [setData, data]);

    const dataBaseData = async () => {
       const a = await axios({
            method: 'get',
            url: `http://localhost:29448/api/Fpt?Offset=${offset}&Limit=${limit}`,
            headers: { },
            data : data
          })
        setData(a.data);    
    }

    const getData = () => {
        if (!data) {
            return '';
        }
        else {
            return data.map(value => (
                <tr>
                    <td>{value.name}</td>
                    <td>{value.phoneNumber}</td>
                    <td>{value.email}</td>
                    <td>{value.notes}</td>
                    <td> <input type="checkbox" defaultChecked={value.state}></input> </td>
                </tr>
            ))
        }
    }

    const limitChange = (value) => {
        setLimit(Number(value));
    }

    const changeCurrentPage = (offsetTable) => {
        const actualOffset = currentPage + offsetTable
        setCurrentPage(actualOffset > 0 ? actualOffset : 0);
        setOffset(actualOffset * limit);
    }
    return (
        <div className='container'>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Notes</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {getData()}
                </tbody>
            </table>
            <div className='paginationContainer'>
                <div>
                    <button className='btn btn-outline-primary' onClick={() => changeCurrentPage(-1)}>&laquo; Before</button>
                    <button className='btn btn-outline-primary' onClick={() => changeCurrentPage(1)}>After &raquo;</button>
                </div>
                <div>
                    <select className='form-select' onChange={(event) => limitChange(event.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DatGrid;
