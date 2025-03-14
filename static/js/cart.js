document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        return;
    }
    

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'card mb-3';
        cartItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Quantity: ${item.quantity}</p>
                <p class="card-text text-primary">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    const checkoutButton = document.createElement('button');
    checkoutButton.className = 'btn btn-success btn-block';
    checkoutButton.innerText = 'Checkout';
    checkoutButton.onclick = checkout;
    cartContainer.appendChild(checkoutButton);
});

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerId = prompt("Enter your Customer ID:");
    
    fetch('/create_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: customerId, items: cart })
    })
        .then(response => response.json())
        .then(data => {
            alert("Order created successfully! Order ID: " + data.order_id);
            localStorage.removeItem('cart');
            window.location.href = "/";
        })
        .catch(error => console.error('Error during checkout:', error));
}
