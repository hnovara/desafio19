document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const productName = document.getElementById('productName').value;

    buscarProducto(productName)
        .then(function(productos) {
            mostrarResultados(productos);
        })
        .catch(function(error) {
            mostrarError(error);
        });
});

function buscarProducto(productName) {
    return new Promise(function(resolve, reject) {
        fetch('url_de_tu_api/productos?nombre=' + productName)
        // Asegúrate de reemplazar 'url_de_tu_api/productos?nombre=' con la URL real de tu API donde se buscarán los productos. 
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('No se pudo completar la solicitud');
                }
                return response.json();
            })
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

function mostrarResultados(productos) {
    const searchResults = document.getElementById('searchResults');

    if (productos.length > 0) {
        const listaProductos = document.createElement('ul');
        productos.forEach(function(producto) {
            const listItem = document.createElement('li');
            listItem.textContent = `${producto.nombre} - Precio: ${producto.precio}`;
            listaProductos.appendChild(listItem);
        });
        searchResults.innerHTML = '';
        searchResults.appendChild(listaProductos);
    } else {
        searchResults.innerHTML = 'No se encontraron productos';
    }
}

function mostrarError(error) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `Error: ${error.message}`;
}