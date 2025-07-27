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
    { id: 1, name: "Dog Shampoo", price: 400, image: "data:image/jpeg;base64,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" },
    { id: 2, name: "Cat Food", price: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3ZtyXnS7mqnnkDKjK8p7xmWE_I74D461pQ&s" },
    { id: 3, name: "Collar", price: 150, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZIEkrcavbEss10f1lA7pDtBcBTcjgiuUYQ&s" },
    { id: 4, name: "Dog Bowl", price: 200, image: "data:image/jpeg;base64,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" },
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
  