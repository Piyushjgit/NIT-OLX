import React from 'react'
import "./Message.css";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiOutlineGoogle } from "react-icons/ai";

const Message = ({ user, message, time, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
                {user}{': '}{message?.startsWith("https://www.google.com/maps/search/?api=1") ? (<Button size='sm' href={message} className='mbtn' target="_blank">Location</Button>)
                    : (message)}
                <p style={{ color: 'rgb(34, 134, 173)', fontFamily: 'cursive', fontWeight: '100', fontSize: '0.75em', marginBottom: '-0.8em', textAlign: 'right' }}>{`${time}`}</p>
            </div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classs}`}>
                {'You: '}{message?.startsWith("https://www.google.com/maps/search/?api=1") ? (<Button size='sm' responsive href={message} target="_blank" className='mbtn'>Location</Button>)
                    : (message)}
                <p style={{ color: 'rgb(34, 134, 173)', fontFamily: 'cursive', fontWeight: '100', fontSize: '0.75em', marginBottom: '-0.8em', textAlign: 'right' }}>{`${time}`}</p>
            </div>
        )
    }
}

export default Message
