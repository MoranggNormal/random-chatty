import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import { useFirestoreQuery } from "../../hooks/hooks";
// Components
import Message from "../Message/Index";
import Header from "../Header";

// Styles
import styles from './channel.module.scss'

const Channel = ({ user = null }) => {
  const db = firebase.firestore();
  const messagesRef = db.collection("messages");
  const messages = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "desc").limit(100)
  );

  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef();
  const bottomListRef = useRef();

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    bottomListRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      // Clear input field
      setNewMessage("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header photo={user.photoURL} name={user.displayName} />

        <div className={styles.messages}>
          <ul>
            {messages
              .sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              .map((message) => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef}></div>
      </div>

        <form className={styles.form} onSubmit={handleOnSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
          />
          <button type="submit" disabled={!newMessage}>
            <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/send-256.png" alt="" width="12" height="12"/>
            Send
          </button>
        </form>
    </>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Channel;
