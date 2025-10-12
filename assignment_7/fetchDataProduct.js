const API_URL = "https://68ea1cc6f1eeb3f856e635dc.mockapi.io/api/v1/products";

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        displayProducts(data);
    } catch (err) {
        console.error('Fetch error:', err);
        const tbody = document.getElementById('productTable');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Error loading products</td></tr>`;
        }
    }
}

function displayProducts(products) {
    const tbody = document.getElementById("productTable");
    if (!tbody) {
        console.error('Element with id "productTable" not found.');
        return;
    }

    tbody.innerHTML = "";

    if (!Array.isArray(products) || products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No products found</td></tr>`;
        return;
    }

    products.forEach(p => {
        const name = p.name || p.productName || 'N/A';
        const imageHtml = p.image
            ? `<img src="${p.image}" alt="${escapeHtml(name)}" class="w-16 h-16 object-cover rounded">`
            : `<div class="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-500 rounded">No Image</div>`;

        const priceVal = p.price !== undefined && p.price !== null ? p.price : (p.priceFormatted || '0');
        const priceText = typeof priceVal === 'number' ? priceVal.toLocaleString() : priceVal;

        const created = p.createdDate || p.createdAt || p.createdOn;
        const createdDate = created ? new Date(created).toLocaleDateString() : 'N/A';

        const category = p.category || p.department || '—';

        const row = `
            <tr class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-3 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${escapeHtml(name)}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="h-20 w-20 flex-shrink-0">
                        <img class="h-20 w-20 rounded-md object-cover"
                        src="${p.image || 'https://via.placeholder.com/80?text=No+Image'}"
                        alt="">
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${escapeHtml(priceText)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <p class="px-2 inline-flex text-sm font-semibold rounded-full bg-green-100 text-green-800">${createdDate}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</a>
                    <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
                </td>
            </tr>`;

        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// Minimal HTML-escape to avoid accidental injection from API
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"]|'/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}

// Create a new Product
async function createProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const imageFile = document.getElementById('productImage').files[0];

    if (!name || isNaN(price) || price <= 0) {
        alert('Please enter a valid product name and price.');
        return;
    }

    let imageUrl = '';
    if (imageFile) {
        try {
            imageUrl = await uploadImage(imageFile);
        } catch (err) {
            alert('Image upload failed: ' + err.message);
            console.error('Image upload error:', err);
            return;
        }
    }

    const newProduct = {
        name,
        price,
        image: imageUrl || '',
        createdDate: new Date().toLocaleDateString()
    }

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        alert('Product created successfully!');
        document.getElementById('createProductForm').reset();

        // Hide the modal after successful creation
        const modalElement = document.getElementById('authentication-modal');
        const modal = new Modal(modalElement);
        modal.hide();

        // Reload product list
        fetchProducts();
    } catch (err) {
        console.log(err);
        alert('Failed to create product: ' + err.message);
    }
}

async function uploadImage(file) {
    const cloudName = 'dt6k5lgow';
    const uploadPreset = 'nodejs'; // unsigned preset for demo upload

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error(`Image upload failed with status ${res.status}`);

    const data = await res.json();
    if (!data.secure_url) throw new Error(data.error?.message || "Missing image URL");
    return data.secure_url;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    // add event listener for form submission
    const form = document.getElementById('createProductForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await createProduct();
        })
    }
});