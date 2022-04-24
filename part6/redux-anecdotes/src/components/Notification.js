import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notificationReducer)
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
export default Notification