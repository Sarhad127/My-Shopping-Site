document.addEventListener('DOMContentLoaded', function() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const productListContainer = document.getElementById('product-list');

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('card', 'mb-3');

                const basicInfoSection = document.createElement('div');
                basicInfoSection.classList.add('card-body');

                const productName = document.createElement('h5');
                productName.classList.add('card-title');
                productName.textContent = product.title;

                const productImage = document.createElement('img');
                productImage.classList.add('card-img-top');
                productImage.setAttribute('src', product.image);
                productImage.setAttribute('alt', product.title);

                basicInfoSection.appendChild(productName);
                basicInfoSection.appendChild(productImage);

                productCard.appendChild(basicInfoSection);

                const additionalInfoSection = document.createElement('div');
                additionalInfoSection.classList.add('card-body', 'additional-info');
                additionalInfoSection.style.display = 'block';

                const productDescription = document.createElement('p');
                productDescription.classList.add('card-text');
                productDescription.textContent = product.description;

                const productPrice = document.createElement('p');
                productPrice.classList.add('card-text', 'text-muted');
                productPrice.textContent = `Price: $${product.price}`;

                const orderButton = document.createElement('button');
                orderButton.classList.add('btn', 'btn-primary');
                orderButton.textContent = 'Lägg till i varukorgen';

                orderButton.addEventListener('click', () => {
                    addToCart(product.id, product.title, product.price);
                });

                additionalInfoSection.appendChild(productDescription);
                additionalInfoSection.appendChild(productPrice);
                additionalInfoSection.appendChild(orderButton);

                productCard.appendChild(additionalInfoSection);

                function handleClickOutside(event) {
                    if (!productCard.contains(event.target)) {
                        productCard.classList.remove('expanded');
                    }
                }
                document.body.addEventListener('click', handleClickOutside);

                productListContainer.appendChild(productCard);
            
            });

            function addToCart(productId, productName, price) {
                let cart = JSON.parse(localStorage.getItem('cart')) || {};
                if (cart[productId]) {
                    cart[productId].quantity++;
                } else {
                    cart[productId] = {
                        name: productName,
                        price: price,
                        quantity: 1
                    };
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI(cart);
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
});
