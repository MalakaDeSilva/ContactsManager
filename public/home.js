'use strict'

import React, { useState, useEffect } from 'react';
import NavBar from './extra/navbar';

import './App.scss';
import { CDataTable, CCard, CImg, CSpinner } from '@coreui/react';

const Home = () => {
    const [data, setData] = useState([])

    const fields = [
        { key: 'image', _style: { width: '10%' } },
        { key: 'name' },
        'number',
    ]

    useEffect(() => {
        fetch('/contacts', { method: 'GET' })
            .then((res) => res.json())
            .then((resJson) => {
                setData(resJson)
                let contacts = []
                resJson.forEach((contact) => {
                    contacts.push({
                        "name": contact['names'][0]['displayName'],
                        "number": contact['phoneNumbers'][0]['value'],
                        "image": contact['photos'][0]['url']
                    })
                })
                setData(contacts)
            })
            .catch((err) => {
                console.log("Error", err)
            });
    }, [])

    let content = null;
    if (data.length == 0) {
        content = <div style={{ margin: "auto" }}><CSpinner color="info" /></div>
    } else {
        content = <div>
            <CDataTable
                items={data}
                fields={fields}
                tableFilter
                itemsPerPage={5}
                itemsPerPageSelect
                hover
                sorter
                pagination
                scopedSlots={{
                    'image':
                        (person) => (
                            <td>
                                <CImg src={person.image} style={{ width: 35 }} />
                            </td>
                        )
                }}
            />
        </div>
    }

    return (
        <div>
            <NavBar />
            <CCard className="card">
                {content}
            </CCard>
            <div>Icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    );
};

export default Home;