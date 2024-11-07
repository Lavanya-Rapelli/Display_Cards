// User data array
const users = [
    { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz" },
    { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv" },
    { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net" },
    { id: 4, name: "Patricia Lebsack", username: "Karianne", email: "Julianne.OConner@kory.org" },
    { id: 5, name: "Chelsey Dietrich", username: "Kamren", email: "Lucio_Hettinger@annie.ca" },
    { id: 6, name: "Mrs. Dennis Schulist", username: "Leopoldo_Corkery", email: "Karley_Dach@jasper.info" },
    { id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles", email: "Telly.Hoeger@billy.biz" },
    { id: 8, name: "Nicholas Runolfsdottir V", username: "Maxime_Nienow", email: "Sherwood@rosamond.me" },
    { id: 9, name: "Glenna Reichert", username: "Delphine", email: "Chaim_McDermott@dana.io" },
    { id: 10, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "Rey.Padberg@karina.biz" },
    { id: 11, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "Rey.Padberg@karina.biz" },
    { id: 12, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "Rey.Padberg@karina.biz" },


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
            <p>${user.username}</p>
            <p>${user.email}</p>
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
        alert(`${user.name} has been added to your cart!`); // Notify user
    } else {
        alert(`${user.name} is already in your cart.`); // Notify user if already in cart
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

// Initialize user cards on load
document.addEventListener('DOMContentLoaded', renderUserCards);
