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
            // Pulling out the parameters from the URL (using react-router-dom)
            socketRef.current.emit("join room", props.match.params.roomID);

            socketRef.current.on("other user", userID => {
                callUser(userID);
                otherUser.current = userID;
            })

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            })

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