import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { fetchChat } from '../../actions/chatActions';
import Loading from '../../components/Loading';

//To connect client to serve
let socket = ""
function temp() {
    socket = io.connect("http://127.0.0.1:5000")
}
function ChatScreen({ match }) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // console.log(userInfo);

    const userChats = useSelector((state) => state.userChats);
    const { chatInfo,loading } = userChats;
    
    // let messages = null
    // let room = ""
    // if (chatInfo) {
    //     messages = chatInfo.messages;
    //     room = chatInfo.room_id;
    // }
    useEffect(() => {
        temp();
    }, [])
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else 
        {
            dispatch(fetchChat(match?.params.id));
        }
    }, [dispatch,userInfo, history]);
    useEffect(() => {
        socket?.emit("join_room", chatInfo?.room_id);
    }, [chatInfo?.room_id])
        return (
            <>
            {loading&&<Loading/>}
            <Chat socket={socket} username={userInfo?.name} room={chatInfo?.room_id} messages={chatInfo?.messages} />
            </>
        )
}

export default ChatScreen