import {useState} from "react";
import Logo from "./Logo";
import Form from "./Form";
import {PackingLIst} from "./PackingLIst";
import {Stats} from "./Stats";


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

    function clearList(){
        const confirmed = window.confirm("Are you sure you want to delete all items?")
        if (confirmed) setItems([])
    }


    return <div className="app">
        <Logo/>
        <Form onAddItems={handleAddItems}/>
        <PackingLIst items={items} onCle arItems={clearList} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
        <Stats items={items}/>
    </div>
}


export default App;
