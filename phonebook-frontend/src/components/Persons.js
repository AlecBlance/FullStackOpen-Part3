const Persons = ({persons, filter, deleteCallback}) => 
    persons.filter(({name}) => 
        name.toLowerCase().includes(filter.toLowerCase()))
        .map(({name, number, id}) => 
            <p key={name}>
                {name} {number} 
                <button onClick={() => deleteCallback(id, name)}>delete</button>
            </p>
        )

export default Persons 