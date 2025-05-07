import { useNotificationValue } from "../hook/notification"


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const message = useNotificationValue()

  if (message == null) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}


export default Notification
