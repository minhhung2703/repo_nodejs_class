function addData(url, data, callback) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(result => callback(null, result))
        .catch(error => callback(error, null))
}

function handleAddData(error, result) {
    if (error) {
        console.error("Error when adding data:", error);
        return;
    }
    if (result) {
        console.log('Added data successfully:', result);
    }
}

// URL API - Adding the Data
const apiURL = 'https://656d3ffbbcc5618d3c22ee91.mockapi.io/product';
const newData = {
    name: 'LV Glasses',
    price: '1000000',
    description: 'An elegant après-ski option, this Monogram Miroir Side Trunk MM makes a fashion statement with its light-catching finish. It is crafted from leather in a bold Silver colorway that adds a futuristic feel, and is adorned with a signature S-lock in a tonal finish. Echoing the original design, this seasonal edition includes metallic corners, paying tribute to the House’s luggage-making heritage. A day-to-evening bag that transitions effortlessly from winter outings to sophisticated soirées.'
};

addData(apiURL, newData, handleAddData);
