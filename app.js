  // PRODUCTS
  const productForm = document.getElementById("productForm");
  const productTable = document.querySelector("#productTable tbody");
  const productNameInput = document.getElementById("productName");
  const productPriceInput = document.getElementById("productPrice");
  const productStockInput = document.getElementById("productStock");
  const productSKUInput = document.getElementById("productSKU");

  let editingProductRow = null;

  productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = productNameInput.value;
    const price = productPriceInput.value;
    const stock = productStockInput.value;
    const sku = productSKUInput.value;

    if (editingProductRow) {
      editingProductRow.cells[0].innerText = name;
      editingProductRow.cells[1].innerText = price;
      editingProductRow.cells[2].innerText = stock;
      editingProductRow.cells[3].innerText = sku;
      alert("✅ Product updated successfully!");
      editingProductRow = null;
      productForm.querySelector("button[type='submit']").textContent = "Add Product";
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${stock}</td>
        <td>${sku}</td>
        <td>
          <button class='btn btn-sm btn-warning me-1'>Update</button>
          <button class='btn btn-sm btn-danger'>Delete</button>
        </td>
      `;
      productTable.appendChild(row);
    }

    productForm.reset();
  });

  productTable.addEventListener("click", function (e) {
    const row = e.target.closest("tr");
    if (e.target.classList.contains("btn-danger")) {
      if (confirm("Are you sure you want to delete this product?")) {
        row.remove();
      }
    }
    if (e.target.classList.contains("btn-warning")) {
      editingProductRow = row;
      productNameInput.value = row.cells[0].innerText;
      productPriceInput.value = row.cells[1].innerText;
      productStockInput.value = row.cells[2].innerText;
      productSKUInput.value = row.cells[3].innerText;
      productForm.querySelector("button[type='submit']").textContent = "Update Product";
    }
  });

  // CUSTOMERS
  const customerForm = document.getElementById("customerForm");
  const customerTable = document.querySelector("#customerTable tbody");
  const customerNameInput = document.getElementById("customerName");
  const customerEmailInput = document.getElementById("customerEmail");
  const customerPhoneInput = document.getElementById("customerPhone");

  let editingCustomerRow = null;

  customerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = customerNameInput.value;
    const email = customerEmailInput.value;
    const phone = customerPhoneInput.value;

    if (editingCustomerRow) {
      editingCustomerRow.cells[0].innerText = name;
      editingCustomerRow.cells[1].innerText = email;
      editingCustomerRow.cells[2].innerText = phone;
      alert("✅ Customer updated successfully!");
      editingCustomerRow = null;
      customerForm.querySelector("button[type='submit']").textContent = "Add";
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>
          <button class='btn btn-sm btn-warning me-1'>Update</button>
          <button class='btn btn-sm btn-danger'>Delete</button>
        </td>
      `;
      customerTable.appendChild(row);
    }

    customerForm.reset();
  });

  customerTable.addEventListener("click", function (e) {
    const row = e.target.closest("tr");
    if (e.target.classList.contains("btn-danger")) {
      if (confirm("Are you sure you want to delete this customer?")) {
        row.remove();
      }
    }
    if (e.target.classList.contains("btn-warning")) {
      editingCustomerRow = row;
      customerNameInput.value = row.cells[0].innerText;
      customerEmailInput.value = row.cells[1].innerText;
      customerPhoneInput.value = row.cells[2].innerText;
      customerForm.querySelector("button[type='submit']").textContent = "Update";
    }
  });


// sales tab
const products = [
    { id: 1, name: "Dog Shampoo", price: 400, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Cat Food", price: 300, image: "https://via.placeholder.com/100" },
    { id: 3, name: "Rubber Glove", price: 150, image: "https://via.placeholder.com/100" },
    { id: 4, name: "Dog Bowl", price: 200, image: "https://via.placeholder.com/100" },
  ];
  
  const cart = [];
  
  function renderProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}"/>
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add</button>
      `;
      grid.appendChild(card);
    });
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    renderCart();
  }
  
  function renderCart() {
    const cartDiv = document.getElementById("cart-items");
    const totalDiv = document.getElementById("total-price");
    cartDiv.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      cartDiv.innerHTML += `
        <div class="cart-item">
          ${item.name} - ₹${item.price} x ${item.qty}
          <br>
          <button onclick="editItem(${index})">Edit</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
    });
  
    totalDiv.textContent = total;
  }
  
  function editItem(index) {
    const qty = prompt("Enter new quantity:", cart[index].qty);
    if (qty && !isNaN(qty) && qty > 0) {
      cart[index].qty = parseInt(qty);
      renderCart();
      alert("Item updated!");
    }
  }
  
  function removeItem(index) {
    if (confirm("Remove this item?")) {
      cart.splice(index, 1);
      renderCart();
    }
  }
  
  function checkout() {
    alert("Checkout feature coming soon!");
  }
  
  renderProducts();
  renderCart();
  