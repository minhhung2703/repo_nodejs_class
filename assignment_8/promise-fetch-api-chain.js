async function fetchProducts() {
    return await fetch("https://68ea1cc6f1eeb3f856e635dc.mockapi.io/api/v1/products")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP Status Error: ` + res.status);
            return res.json();
        })
}

async function fetchProductDetail(id) {
    return await fetch(`https://68ea1cc6f1eeb3f856e635dc.mockapi.io/api/v1/products/${id}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP Status Error: ` + res.status);
            return res.json();
        })
}

// Fetch Chaining API được xử dụng để xử lý tất cả call API cùng một lúc
fetchProducts()
    .then(products => {
        console.log("Product: ", products)
        if (products.length > 0) {
            const first = products[0];
            return fetchProductDetail(first.id);
        } else {
            throw new Error("Product is not found");
        }
    })
    .then(productDetails => {
        console.log("Product Details: ", productDetails);
    })
    .catch(err => console.log(err))
    .finally(() => console.log("Finished fetch API"))