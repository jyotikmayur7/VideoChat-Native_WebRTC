import React, { useRef, useEffect } from 'react';
import io from "socket.io-client";

const Room = (props) => {
    const userVideo = useRef();
    const partenVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, vedio: true }).then(stream => {
            userVedio.cuurent.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", props.match.params.roomID);

        });
    }, []);

    return (
        <div>
            <vedio autoplay ref={userVideo}></vedio>
            <vedio autoplay ref={partenVideo}></vedio>
        </div>
    )
}

export default Room;