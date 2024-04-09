fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        data.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            const image = document.createElement('img');
            image.src = item.src;
            slide.appendChild(image);
            swiperWrapper.appendChild(slide);
        });
        const swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    })
    .catch(error => console.error('Error fetching data:', error));

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const productList = document.querySelector('.product-list');
    const searchBar = document.querySelector('.search-bar input[type="text"]');

    let productsData;

function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        const imageElement = document.createElement('img');
        imageElement.src = product.thumbnail;
        imageElement.alt = product.title;
        imageElement.classList.add('product-image');

        const titleElement = document.createElement('h2');
        titleElement.textContent = product.title;
        titleElement.classList.add('product-title');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = product.description;
        descriptionElement.classList.add('product-description');

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${product.price}`;
        priceElement.classList.add('product-price');

        const ratingElement = document.createElement('p');
        ratingElement.textContent = `Rating: ${product.rating}`;
        ratingElement.classList.add('product-rating');

        const stockElement = document.createElement('p');
        stockElement.textContent = `Stock: ${product.stock}`;
        stockElement.classList.add('product-stock');

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.classList.add('buy-button');
        buyButton.addEventListener('click', function() {
            console.log(`Вы купили продукт: ${product.title}`);
        });

        const productInfoContainer = document.createElement('div');
        productInfoContainer.classList.add('product-info');
        productInfoContainer.appendChild(titleElement);
        productInfoContainer.appendChild(descriptionElement);
        productInfoContainer.appendChild(priceElement);
        productInfoContainer.appendChild(ratingElement);
        productInfoContainer.appendChild(stockElement);
        productInfoContainer.appendChild(buyButton); 

        productElement.addEventListener('click', function() {
            productElement.classList.toggle('product-fullscreen');
        });

        productElement.appendChild(imageElement);
        productElement.appendChild(productInfoContainer);

        productList.appendChild(productElement);
    });
}

    function filterProducts(category) {
        let filteredProducts;
        if (category === 'all') {
            filteredProducts = productsData;
        } else {
            filteredProducts = productsData.filter(product => product.category === category);
        }
        displayProducts(filteredProducts);
    }

    function searchProducts(query) {
        const filteredProducts = productsData.filter(product => {
            return product.title.toLowerCase().includes(query.toLowerCase());
        });
        displayProducts(filteredProducts);
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.value;
            filterProducts(selectedCategory);
        });
    });

    searchBar.addEventListener('input', function() {
        const searchQuery = this.value.trim();
        if (searchQuery === '') {
            displayProducts(productsData);
        } else {
            searchProducts(searchQuery);
        }
    });
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            displayProducts(productsData);
        })
});

fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        draw_prod(data.products);
    });

function draw_prod(products) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';
    products.forEach(product => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const image = document.createElement('img');
        image.src = product.thumbnail;
        slide.appendChild(image);
        swiperWrapper.appendChild(slide);
    });

    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2500, 
            disableOnInteraction: false,
        },
    });

    const slides = document.querySelectorAll('.swiper-slide');

    slides.forEach((slide, index) => {
        slide.addEventListener('mouseenter', () => {
            swiper.slideTo(index);
        });
    });

    swiperWrapper.addEventListener('mouseleave', () => {
        swiper.slideTo(swiper.activeIndex);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartButton = document.querySelector('nav .menu li:last-child a');
    const closeButton = document.querySelector('.close');

    cartButton.addEventListener('click', function() {
        cartOverlay.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        cartOverlay.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const productList = document.querySelector('.product-list');
    const searchBar = document.querySelector('.search-bar input[type="text"]');
    const cartItems = document.querySelector('.cart-items');
    const totalPrice = document.querySelector('.total-price');
    const clearCartButton = document.querySelector('.clear-cart');

    let productsData;

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            
            const imageElement = document.createElement('img');
            imageElement.src = product.thumbnail;
            imageElement.alt = product.title;
            imageElement.classList.add('product-image');

            const titleElement = document.createElement('h2');
            titleElement.textContent = product.title;
            titleElement.classList.add('product-title');

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = product.description;
            descriptionElement.classList.add('product-description');

            const priceElement = document.createElement('p');
            priceElement.textContent = `Price: $${product.price}`;
            priceElement.classList.add('product-price');

            const ratingElement = document.createElement('p');
            ratingElement.textContent = `Rating: ${product.rating}`;
            ratingElement.classList.add('product-rating');

            const stockElement = document.createElement('p');
            stockElement.textContent = `Stock: ${product.stock}`;
            stockElement.classList.add('product-stock');
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy';
            buyButton.classList.add('buy-button');
            buyButton.addEventListener('click', function() {
                addToCart(product);
            });
            const productInfoContainer = document.createElement('div');
            productInfoContainer.classList.add('product-info');
            productInfoContainer.appendChild(titleElement);
            productInfoContainer.appendChild(descriptionElement);
            productInfoContainer.appendChild(priceElement);
            productInfoContainer.appendChild(ratingElement);
            productInfoContainer.appendChild(stockElement);
            productInfoContainer.appendChild(buyButton); // Добавляем кнопку "Купить" к контейнеру

            productElement.addEventListener('click', function() {
                productElement.classList.toggle('product-fullscreen');
            });

            productElement.appendChild(imageElement);
            productElement.appendChild(productInfoContainer);

            productList.appendChild(productElement);
        });
    }

    function addToCart(product) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.textContent = `${product.title} - $${product.price}`;
        cartItems.appendChild(cartItem);
        updateTotal(product.price);
    }
    function updateTotal(price) {
        let currentTotal = parseFloat(totalPrice.textContent.replace('$', ''));
        currentTotal += price;
        totalPrice.textContent = `$${currentTotal.toFixed(2)}`;
    }

    function filterProducts(category) {
        let filteredProducts;
        if (category === 'all') {
            filteredProducts = productsData;
        } else {
            filteredProducts = productsData.filter(product => product.category === category);
        }
        displayProducts(filteredProducts);
    }

    function searchProducts(query) {
        const filteredProducts = productsData.filter(product => {
            return product.title.toLowerCase().includes(query.toLowerCase());
        });
        displayProducts(filteredProducts);
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.value;
            filterProducts(selectedCategory);
        });
    });

    searchBar.addEventListener('input', function() {
        const searchQuery = this.value.trim();
        if (searchQuery === '') {
            displayProducts(productsData);
        } else {
            searchProducts(searchQuery);
        }
    });

    clearCartButton.addEventListener('click', function() {
        cartItems.innerHTML = '';
        totalPrice.textContent = '$0.00';
    });

    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            displayProducts(productsData);
        });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar input[type="text"]');
    const productList = document.querySelector('.product-list');

    searchBar.addEventListener('focus', function() {
        productList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
