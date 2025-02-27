import React from 'react';
import { v1 as uuid } from 'uuid';

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        // Adding parameters to URL
        props.history.push(`/room/${id}`);
    }

    return (
        <button onCLick={create}>Create Room</button>
    )
}

export default CreateRoom;