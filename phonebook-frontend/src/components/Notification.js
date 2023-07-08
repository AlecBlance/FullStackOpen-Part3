const Notification = ({notification: {message, success}}) => {
    if (!message) return
    return (
        <div className={`notification ${success ? 'success': 'error'}`}>
            {message}
        </div>
    )
}

export default Notification