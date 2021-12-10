import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";

import styles from "./message.module.scss";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  if (!text) return null;

  return (
    <section className={styles.message}>
      <div className={styles.info}>
        {photoURL ? (
          <img
            src={photoURL}
            alt="Avatar"
            className="rounded-full mr-4"
            width={45}
            height={45}
          />
        ) : null}

        <div className={styles.msg}>
          {displayName ? <small>{displayName}</small> : null}
          {createdAt?.seconds ? (
            <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
          ) : null}
        </div>
      </div>

      <div className={styles.text}>
        <p>{text}</p>
      </div>
    </section>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
