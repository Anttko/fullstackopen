import React from "react";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  console.log('...', notification)
  let style;

  if (notification === '') {
    style = {
    }
  } else {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 25
    }

  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notificationReducer
  }

}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification