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
      quantity: Number(quantity), 
      packed: false,
    };
    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {[...Array(20).keys()].map((n) => (
          <option key={n + 1} value={n + 1}>
            {n + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
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
      <button
        onClick={() => handleRemoveItem(item.id)}>
        ❌
      </button>
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
  const packedPercentage =
    totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer >
      {packedPercentage === 100 ? (
        <em>
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

function App() {
  const [items, setItems] = useState([]);

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

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleTogglePacked={handleTogglePacked}
        handleRemoveItem={handleRemoveItem}
      />
      <Stats className="stats" items={items} />
    </div>
  );
}

export default App;
