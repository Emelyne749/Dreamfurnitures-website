document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Toggle navigation menu visibility
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Handle image clicks to redirect to order form and store image data in localStorage
    document.querySelectorAll('.product-image, .order-image').forEach(img => {
        img.style.cursor = "pointer"; // Show cursor pointer for clickable images
        img.addEventListener('click', () => {
            const imageUrl = img.getAttribute('data-image') || img.src.split('/').pop(); // Get image file name
            localStorage.setItem('selectedImage', imageUrl); // Store the selected image in localStorage
            window.location.href = 'order-form.html'; // Redirect to order form page
        });
    });

    // If there's an image stored in localStorage, display it in the order form
    const selectedImage = localStorage.getItem('selectedImage');
    if (selectedImage) {
        const imageElement = document.getElementById('order-image');
        if (imageElement) {
            imageElement.src = `images/${selectedImage}`; // Set the image source to the selected image
        }
    }

    // Handle form submission on the order form page
    const orderForm = document.getElementById('orderForm');
    const popup = document.getElementById('popup');
    const popupCloseButton = document.getElementById('popup-close');

    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission for demo purposes

            // Display the popup upon form submission
            popup.style.display = 'flex';

            // Clear form fields after submission
            orderForm.reset();

            // Optionally, clear the stored image from localStorage
            localStorage.removeItem('selectedImage');
        });

        // Close the popup when clicking the close button
        if (popupCloseButton) {
            popupCloseButton.addEventListener('click', function() {
                popup.style.display = 'none';
            });
        }
    }

    // Handle form submission to WhatsApp
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const product = document.getElementById('product').value;
            const quantity = document.getElementById('quantity').value;
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const notes = document.getElementById('notes').value;

            // Create WhatsApp message string
            const message = encodeURIComponent(`Order Details:\nProduct: ${product}\nQuantity: ${quantity}\nFull Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nDelivery Address: ${address}\nAdditional Notes: ${notes}`);

            // Redirect to WhatsApp with the message
            const whatsappNumber = "+250788916928";
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

            // Redirect to WhatsApp
            window.location.href = whatsappLink;
        });
    }
});
