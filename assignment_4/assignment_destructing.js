const { warn } = require("console");

async function getData() {
    try {
        const response = await fetch("https://656ca88ee1e03bfd572e9c16.mockapi.io/products");
        const products = await response.json();

        // using destructuring to extract properties
        const { id, name, avatar, price, features, description } = products[1]; // destructuring object. Now features property is guaranteed to be defined

        // Clone destructured object
        const cloneProduct = {
            id,
            name,
            price,
            avatar,
            features: {
                ...features, // spread operator to clone features object
                warranty: '2 years' // override warranty property
            },
            description
        };
        console.log(cloneProduct);

    } catch (error) {
        console.error('Error fetching products', error);
    }
}

getData();
