
const InputField = ({name, values: {value, callback}}) => {
    return (
        <div>
            {name}: <input value={value} onChange={callback}/>
        </div>
    )
}

const PersonForm = ({submitCallback, inputData: {name, number}}) => {
    return (
        <form onSubmit={submitCallback}>
            <InputField name="name" values={name} /> 
            <InputField name="number" values={number} /> 
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm 