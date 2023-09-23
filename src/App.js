import {useState} from "react";


// const initialItems = [
//     {id: 1, description: "Passports", quantity: 2, packed: false},
//     {id: 2, description: "Socks", quantity: 12, packed: true},
//     {id: 2, description: "Charger", quantity: 1, packed: false},
// ];

function App() {
    const [items, setItems] = useState([])

    function handleAddItems(item) {
        setItems(items => [...items, item])
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter((item) => item.id !== id))
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed}
            : item))
    }

    return <div className="app">
        <Logo/>
        <Form onAddItems={handleAddItems}/>
        <PackingLIst items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
        <Stats items={items}/>
    </div>
}

const Logo = () => {
    return <h1>🌴Far Away💼</h1>
}
const Form = ({onAddItems}) => {
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)


    function handleSubmit(e) {
        e.preventDefault()
        if (!description) return
        const newItem = {
            description,
            quantity,
            packed: false,
            id: new Date()
        }

        onAddItems(newItem)

        setDescription('')
        setQuantity(1)
    }

    return <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select name="" id="" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            {Array.from({length: 20}, (_, i) => i + 1)
                .map((num) => <option value={num} key={num}>{num}</option>)}

        </select>
        <input type="text" placeholder={'Item...'} value={description} onChange={
            (e) => setDescription(e.target.value)
        }/>
        <button>Add</button>
    </form>
}
const PackingLIst = ({items, onDeleteItem, onToggleItem}) => {
    const [sortBy, setSortBy] = useState("input")
    let sortedItems

    if (sortBy === 'input') sortedItems = items

    if (sortBy === 'description')
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description))
    if (sortBy === 'packed')
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed))

    return <div className="list">
        <ul>
            {sortedItems.map(item => <Item onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} item={item}
                                           key={item.id}/>)}
        </ul>
        <div className="actions">
            <select name="" id="" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="input">Sort by input order</option>
                <option value="description">Sort by description</option>
                <option value="packed">Sort by packed status</option>

            </select>
        </div>
    </div>

}

const Item = ({item, onDeleteItem, onToggleItem}) => {
    return <li>
        <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}/>
        <span style={item.packed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>
        {item.quantity} {item.description}
    </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
}

const Stats = ({items}) => {
    if (!items.length) return <p
        className={"stats"}><em>Start adding some items to
        your packing list 🚀
    </em></p>
    const numItems = items.length
    const packedItems = items.filter(item => item.packed === true).length
    const percentage = Math.round(packedItems / numItems * 100)
    return <footer className={'stats'}>
        {percentage === 100 ? 'You got everything! Ready to go ✈️'
            : <em>
                💼 You have {numItems} items on your list, and you already packed {packedItems} ({percentage}%)
            </em>
        }

    </footer>
}
export default App;
