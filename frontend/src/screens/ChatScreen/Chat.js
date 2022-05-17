import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import io from 'socket.io-client'
import './Chat.css'
import Message from "./Message/Message";
import { AiFillCloseCircle, AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Image, Button, Popover, OverlayTrigger } from "react-bootstrap";

function Chat({ socket, sender, room, messages, receiver, adId }) {
    const [currentMessage, setCurrentMessage] = useState();
    const [messageList, setMessageList] = useState();
    const [sock, setSock] = useState();
    useEffect(() => {
        setMessageList(messages);
    }, []);
    useEffect(() => {
        sock?.on("receive_message", (data) => {
            let temp2 = JSON.stringify(data)
            setMessageList((list) => [...list, temp2]);
        });
    }, [sock]);
    useEffect(() => {
        setSock(socket);
        // console.log(sock);
    }, [socket]);
    const updateHandler = async () => {
        const chat_update = await axios.put("/api/chat/update", {
            room_id: room,
            messages: messageList
        });
        // console.log(chat_update);
    }
    useEffect(() => {
        updateHandler();
        setCurrentMessage("");
    }, [messageList])
    const sendMessage = async () => {
        // e.preventDefault();
        try {
            if (currentMessage !== "") {
                const messageData = {
                    room: room,
                    author: sender?._id,
                    message: currentMessage,
                    time:
                        new Date(Date.now()).toLocaleString()
                };
                let temp = JSON.stringify(messageData);
                // console.log(temp);
                setMessageList((list) => ([...list, temp]));
                sock.emit("send_message", messageData);
                // console.log(messageList);
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const link = `https://www.google.com/maps/search/?api=1&query=${pos.coords.latitude},${pos.coords.longitude}`;
            setCurrentMessage(link);
            document.getElementById('chatInput').focus();
            // sendMessage();
        })
    }
    // useEffect(() => {
    //     sock?.on("receive_message", (data) => {
    //         let temp2 = JSON.stringify(data)
    //         setMessageList((list) => [...list, temp2]);
    //     });
    // }, [sock]);

    // useEffect(() => {

    //     return () => {
    //         const chat_update = axios.put("http://localhost:5000/api/chat/update", {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //             },
    //             room_id: room,
    //             messages: messageList
    //         }).then((data) => {
    //             // console.log(data)
    //         }).catch((e) => {
    //             console.log('Error in Chat js')
    //         })
    //     }
    // })

    return (

        <div className="chatPage">
            <div className="chatContainer">
                <Button href={`/ad/${adId}`} target="_blank" size='sm'>Ad Link</Button>
                <div className="header">
                    <h2>NIT-OLX CHAT</h2>
                    <Button onClick={getLocation} size='sm'>Location</Button>
                    <h2>
                        <Image src={receiver?.image} fluid responsive
                            style={{ width: '1.5em', height: '1.5em', borderRadius: '2em', marginRight: '-0.2rem' }}
                        />
                        {' '}
                        {receiver?.name?.split(' ')[0]}
                    </h2>

                </div>
                <ReactScrollToBottom className="chatBox">
                    {messageList?.map((msg) => {
                        let messageContent = JSON.parse(msg);
                        return (
                            <Message user={sender?._id === messageContent.author ? '' : sender?.name} message={messageContent.message} time={messageContent.time} classs={sender?._id === messageContent.author ? 'right' : 'left'} />
                        );
                    })}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input
                        type="text"
                        id="chatInput"
                        value={currentMessage}
                        name="Message"
                        placeholder="Hey..."
                        autoFocus
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            (event.key === "Enter") && sendMessage();
                        }}
                    />
                    <button onClick={sendMessage} className="sendBtn"><AiOutlineSend /></button>
                </div>
            </div>

        </div>
    );
}

export default Chat;