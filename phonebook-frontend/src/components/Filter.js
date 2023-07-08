const Filter = ({filter, callback}) => {
    return (
        <div>
            filter shown with: <input value={filter} onChange={callback}/>
        </div>
    )
}

export default Filter