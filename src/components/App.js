import { useState } from "react";


function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
//
  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need to pack?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input
        type="text"
        placeholder="Enter item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Item({ item, handleTogglePacked, handleRemoveItem }) {
  return (
    <li>
      <span
        style={{
          textDecoration: item.packed ? "line-through" : "none",
        }}
      >
        {item.description} (Quantity: {item.quantity})
      </span>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => handleTogglePacked(item.id)}
      />
      <button onClick={() => handleRemoveItem(item.id)} style={{backgroundColor:"red",color:"white",border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer"}}>Remove</button>
    </li>
  );
}

function PackingList({ items, handleTogglePacked, handleRemoveItem }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleTogglePacked={handleTogglePacked}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </ul>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

return (
    <footer style={{ textAlign: "center", marginTop: "20px" }}>
      {packedPercentage === 100 ? (
        <em style={{ color: "green", fontWeight: "bold", fontSize: "1.2em" }}>
          You got everything!
        </em>
      ) : (
        <em>
          You have {totalItems} items in the list. You already packed {packedItems}{" "}
          ({packedPercentage}%).
        </em>
      )}
    </footer>
  );

}

function handleAddItem(item) {
    setItems((prevItems) => [item, ...prevItems]);
  }
 
function handleTogglePacked(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }

function handleRemoveItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

function App() {
  const [items, setItems] = useState([]);
  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleTogglePacked={handleTogglePacked}
        handleRemoveItem={handleRemoveItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
