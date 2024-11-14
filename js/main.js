(function ($) {
    "use strict";
    
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        // Cargar los elementos del carrito desde localStorage al cargar la página
        loadCart();
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Carrito de compras
    let cartItems = [];

    // Función para añadir productos al carrito
    window.addToCart = function(productName, productPrice) {
        const username = localStorage.getItem('username');
        
        if (!username) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            return;
        }

        const item = { name: productName, price: productPrice };
        cartItems.push(item);
        updateCartTotal();
        saveCart();
        
    };

    // Función para actualizar el total del carrito
    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });
        document.getElementById("cartTotal").textContent = total.toFixed(2);
        updateCartItems();
    }

    // Función para mostrar los elementos en la sección del carrito
    function updateCartItems() {
        const cartItemsContainer = document.getElementById("cartItems");
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <p>${item.name} - €${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})" class="btn btn-sm btn-danger">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Función para eliminar un producto del carrito
    window.removeFromCart = function(index) {
        cartItems.splice(index, 1);
        updateCartTotal();
        saveCart();
    };

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Función para cargar el carrito desde localStorage
    function loadCart() {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            updateCartTotal();
        }
    }

    // Función para mostrar y ocultar el carrito
    window.toggleCart = function() {
        const cart = document.getElementById("cart");
        cart.style.display = cart.style.display === "none" ? "block" : "none";
    };

    // Función para desplazarse a la sección del carrito
    window.scrollToCart = function() {
        document.getElementById("cart").style.display = "block";
        $('html, body').animate({
            scrollTop: $("#cart").offset().top
        }, 1000);
    };

    // Función para efectuar la compra
    window.purchaseCart = function() {
        if (cartItems.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        
        cartItems = [];
        updateCartTotal();
        saveCart();
        alert("Compra realizada");
        window.location.href = "products.html";
    };

})(jQuery);
