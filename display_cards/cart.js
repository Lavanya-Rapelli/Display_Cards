// User data array
const users = [
    { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz" },
    { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv" },
    // Other users...
];

// Load users from local storage if available, otherwise use the initial array
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : users;
}

// Save users to local storage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to render user cards
function renderUserCards() {
    const userCardsContainer = document.getElementById('userCards');
    userCardsContainer.innerHTML = '';
    const users = loadUsers();

    users.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        userCardsContainer.appendChild(card);
    });
}

// Function to add user to cart
function addToCart(index) {
    const users = loadUsers();
    const user = users[index];
    const cart = loadCart();

    // Check if the user is already in the cart
    if (!cart.find(u => u.email === user.email)) {
        cart.push(user);
        saveCart(cart);
        alert(`${user.name} has been added to your cart!`);
    } else {
        alert(`${user.name} is already in your cart.`);
    }
}

// Load cart from local storage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load items from local storage into the cart
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = ''; // Clear existing items

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach((item) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.setAttribute('data-id', item.id);
        cartItemDiv.innerHTML = `
            <h2>${item.name}</h2>
            <p>Username: ${item.username}</p>
            <p>Email: ${item.email}</p>
            <div class="button-container">
                <button class="buy-button" onclick="buyItem(${item.id})">Buy</button>
                <button class="delete-button" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
}

// Function to delete an item from the cart
function deleteItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove the item from the cart
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Reload the cart items
    loadCartItems();
}

// Function to handle the buying action
function buyItem(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        alert(`Buying ${item.name}`);
        deleteItem(itemId);
    }
}

// Initialize user cards on load
document.addEventListener('DOMContentLoaded', renderUserCards);

// Load items into the cart on page load
window.onload = loadCartItems;
