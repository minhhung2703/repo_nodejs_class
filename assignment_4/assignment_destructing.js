async function getData() {
    try {
        const response = await fetch("https://656ca88ee1e03bfd572e9c16.mockapi.io/products");
        const products = await response.json();

        console.log(products);

        // using destructuring to extract properties
        const { id, name, avatar, price, description } = products[1];

        // Clone destructured object
        const cloneProduct = {
            id,
            name,
            price,
            avatar,
            description
        };
    } catch (error) {

    }
}

getData();
