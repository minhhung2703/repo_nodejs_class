const API_URL = "https://68ea1cc6f1eeb3f856e635dc.mockapi.io/api/v1/products";

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error("HTTP error status: " + res.status);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Fetching error: ", err);
        throw new Error(err);
    } finally {
        console.log("Finished fecth API");
    }
}

(async () => {
    try {
        const products = await fetchProducts();
        console.log("List All Products:", products);
    } catch (err) {
        console.error("Handling the error:", err);
    }
})();