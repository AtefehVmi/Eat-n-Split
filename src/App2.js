import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    phoneNumber: "09123456547",
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    phoneNumber: "09872635489",
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    phoneNumber: "09876543243",
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleSetFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
    setShowContactInfo(true);
  }

  function handleShowContactInfo() {
    setShowContactInfo((friend) => !friend);
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ContactList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddContact onAddFriends={handleSetFriends} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add contact"}
        </Button>
      </div>
      <div>
        {selectedFriend && (
          <FormShowContactInfo
            handleShowContactInfo={handleShowContactInfo}
            selectedFriend={selectedFriend}
          />
        )}

        {showContactInfo && (
          <Button onClick={handleShowContactInfo}>close</Button>
        )}
      </div>
    </div>
  );
}

function ContactList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Contact
            friend={friend}
            key={friend.id}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        ))}
      </ul>
    </div>
  );
}

function Contact({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
}

function FormAddContact({ onAddFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [phoneNumber, setPhoneNumber] = useState("");

  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image || !phoneNumber) return;

    const newContact = {
      name,
      id,
      image: `${image}?=${id}`,
      phoneNumber,
    };

    onAddFriends(newContact);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🦱Name</label>
      <input
        type="text"
        placeholder="Enter a name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌇Image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label>📱Phone number</label>
      <input
        type="text"
        placeholder="Enter a phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormShowContactInfo({ selectedFriend, handleShowContactInfo }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <img src={selectedFriend.image} alt={selectedFriend.id} />
      <h2>{selectedFriend.name}'s information🧍</h2>
      <p>📱{selectedFriend.phoneNumber}</p>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
