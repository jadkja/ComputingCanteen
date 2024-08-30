// Function to add item to the cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex !== -1) {
        // If the item exists, increment the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If the item does not exist, add it with quantity 1
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
    displayCart(); // Update cart display after adding item
    displayTotalPrice(); // Update total price display after adding item
}

// Function to remove item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index].quantity > 1) {
        // If quantity is more than 1, decrement the quantity
        cart[index].quantity -= 1;
    } else {
        // If quantity is 1, remove the item from the cart
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Update cart display after removing item
    displayTotalPrice(); // Update total price display after removing item
}

// Function to calculate total price
function calculateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}

// Function to display total price
function displayTotalPrice() {
    const totalPriceContainer = document.getElementById('total-price');
    const totalPrice = calculateTotalPrice();
    totalPriceContainer.textContent = `Your total price comes to: $${totalPrice.toFixed(2)}`;
}

// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    
    cartContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <p>${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }
}

// Call the function to display cart items and total price when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    displayTotalPrice();
});
