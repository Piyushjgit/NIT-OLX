import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import io from 'socket.io-client'
import './Chat.css'
import Message from "./Message/Message";
import { AiFillCloseCircle, AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";

function Chat({ socket, username, room, messages }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState();
    const [sock, setSock] = useState();
    // console.log(Array.isArray((messages)));
    // console.log(Array.isArray((messageList)));
    // console.log(messageList);
    // console.log(currentMessage);
    // console.log(socket);
    useEffect(() => {
        setMessageList(messages);
        sock?.on("receive_message", (data) => {
            let temp2 = JSON.stringify(data)
            setMessageList((list) => [...list, temp2]);
        });
    }, [messages]);
    useEffect(() => {
        setSock(socket);
        console.log(sock);
    }, [socket]);
    const updateHandler = async () => {
        const chat_update = await axios.put("/api/chat/update", {
            room_id: room,
            messages: messageList
        });
        console.log(chat_update);
    }
    useEffect(() => {
        updateHandler();
        setCurrentMessage("");
    }, [messageList])
    const sendMessage = async (e) => {
        // e.preventDefault();
        try {
            if (currentMessage !== "") {
                const messageData = {
                    room: room,
                    author: username,
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
        // <div className="chat-window">
        //     <div className="chat-header">
        //         <p>Live Chat</p>
        //     </div>
        //     <div className="chat-body" style={{ height: '50vh',width:'60vw', overflow: 'scroll',margin:'0 auto' }}>
        //         <ScrollToBottom className="message-container">
        //             {messageList?.map((msg) => {
        //                 let messageContent = JSON.parse(msg);
        //                 return (
        //                     <div>
        //                     {username===messageContent.author?(
        //                         <div className="message" style={{  color: 'white', backgroundColor: '#3B2A50' }}>
        //                                 {messageContent.message}{messageContent.author}
        //                         </div>
        //                     ):(
        //                     <div className="message" style={{ backgroundColor: '#CABCDC', right:0}}>
        //                                     {messageContent.message}{messageContent.author}
        //                     </div>
        //                     )}
        //                     </div>
        //                 );
        //             })}
        //         </ScrollToBottom>
        //     </div>
        //     <div className="chat-footer">
                // <input
                //     type="text"
                //     value={currentMessage}
                //     placeholder="Hey..."
                //     onChange={(event) => {
                //         setCurrentMessage(event.target.value);
                //     }}
                //     onKeyPress={(event) => {
                //         (event.key === "Enter") && sendMessage();
                //     }}
                // />
        //         <button onClick={sendMessage}>&#9658;</button>
        //     </div>
        // </div>
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>NIT-OLX CHAT</h2>
                    <h2> {username}</h2>
                </div>
                <ReactScrollToBottom className="chatBox">
                 {messageList?.map((msg) => {
                  let messageContent = JSON.parse(msg);
                  return(
                      <Message user={username === messageContent.author ? '' : messageContent.author} message={messageContent.message} time={messageContent.time} classs={username === messageContent.author ? 'right' : 'left'} />
                  );
                     })}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input
                        type="text"
                        id="chatInput"
                        value={currentMessage}
                        placeholder="Hey..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            (event.key === "Enter") && sendMessage();
                        }}
                    />
                    <button onClick={() => sendMessage} className="sendBtn"><AiOutlineSend/></button>
                </div>
            </div>

        </div>
    );
}

export default Chat;