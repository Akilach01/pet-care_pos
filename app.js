// Product Data Array
let products = [];
let cart = [];

// Add Product to the List
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);
    const sku = document.getElementById("productSKU").value;

    const product = { name, price, stock, sku };
    products.push(product);
    renderProductTable();
    renderProductGrid();
    this.reset();
});

// Render Product Table
function renderProductTable() {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
    products.forEach((p, i) => {
        const row = `<tr>
            <td>${p.name}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>${p.stock}</td>
            <td>${p.sku}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Delete Product
function deleteProduct(index) {
    products.splice(index, 1);
    renderProductTable();
    renderProductGrid();
}

// Render Product Grid (Sales Tab)
function renderProductGrid() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";

    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                    <h6 class="card-title">${product.name}</h6>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button class="btn btn-sm btn-primary" onclick="addToCart(${index})">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add to Cart
function addToCart(productIndex) {
    const product = products[productIndex];
    const existing = cart.find(item => item.sku === product.sku);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
    updateCheckout();
}

// Render Cart
function renderCart() {
    const cartDiv = document.getElementById("cart-items");
    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "d-flex justify-content-between align-items-center mb-2";
        cartItem.innerHTML = `
            <div>
                ${item.name} ($${item.price.toFixed(2)} x 
                <input type="number" min="1" value="${item.quantity}" style="width:60px;" onchange="updateQuantity(${index}, this.value)">
                )
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartDiv.appendChild(cartItem);
    });
}

// Update Quantity in Cart
function updateQuantity(index, value) {
    const qty = parseInt(value);
    if (qty > 0) {
        cart[index].quantity = qty;
    } else {
        cart[index].quantity = 1;
    }
    renderCart();
    updateCheckout();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
    updateCheckout();
}

// Update Checkout Details
function updateCheckout() {
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);

    const discountPercent = parseFloat(document.getElementById("discount").value || 0);
    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;

    const paid = parseFloat(document.getElementById("paidAmount").value || 0);
    const balance = paid - total;
    const points = Math.floor(total / 10); // e.g., 1 point per $10 spent

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("total-price").innerText = total.toFixed(2);
    document.getElementById("balance").innerText = balance.toFixed(2);
    document.getElementById("points").innerText = points;
}

// Checkout Process
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const total = parseFloat(document.getElementById("total-price").innerText);
    const paid = parseFloat(document.getElementById("paidAmount").value || 0);

    if (paid < total) {
        alert("Paid amount is less than total.");
        return;
    }

    alert("Checkout successful! Thank you.Come Again");
    cart = [];
    document.getElementById("paidAmount").value = "";
    document.getElementById("discount").value = 0;
    renderCart();
    updateCheckout();
}

// Customer Management
document.getElementById("customerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const phone = document.getElementById("customerPhone").value;

    const row = `<tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Delete</button></td>
    </tr>`;

    document.querySelector("#customerTable tbody").innerHTML += row;
    this.reset();
});
