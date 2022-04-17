import React from 'react'
import "./Message.css";


const Message = ({ user, message,time, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
                {`${user}: ${message}`}
                <p style={{ color: 'rgb(34, 134, 173)', fontFamily: 'cursive', fontWeight: '100', fontSize: '0.75em', marginBottom: '-0.8em', textAlign:'right'}}>{`${time}`}</p>
            </div>
        )
    }
    else {
        // rgb(173, 34, 34)

        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
                <p style={{ color: 'rgb(34, 134, 173)', fontFamily: 'cursive', fontWeight: '100', fontSize: '0.75em', marginBottom: '-0.8em', textAlign: 'right' }}>{`${time}`}</p>
            </div>
        )
    }
}

export default Message
