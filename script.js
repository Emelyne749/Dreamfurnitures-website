document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  
    // Handle product clicks to open order form
    document.querySelectorAll('.product-item').forEach(item => {
      item.addEventListener('click', () => {
        const productName = item.querySelector('img').alt;
        const productPrice = item.querySelector('.price').textContent;
        showOrderForm(productName, productPrice);
      });
    });
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          window.scrollTo({
            top: targetElement.offsetTop - 50, // Offset to account for the navbar height
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Optional: Animations for elements when they come into view
    const animateOnScrollElements = document.querySelectorAll('.service-item, .review');
    window.addEventListener('scroll', () => {
      animateOnScrollElements.forEach(item => {
        if (isInViewport(item)) {
          item.classList.add('fadeIn');
        }
      });
    });
  
    // Map toggle functionality (optional)
    const toggleMapBtn = document.getElementById('toggle-map');
    const mapSection = document.getElementById('map-section');
    if (toggleMapBtn && mapSection) {
      toggleMapBtn.addEventListener('click', () => {
        const isMapVisible = mapSection.style.display !== 'none';
        mapSection.style.display = isMapVisible ? 'none' : 'block';
        toggleMapBtn.textContent = isMapVisible ? 'Show Map' : 'Hide Map';
      });
    }
  });
  
  function showOrderForm(product, price) {
    const formHTML = `
      <div class="overlay" onclick="closeForm()"></div>
      <div class="form-popup">
        <h2>Order: ${product}</h2>
        <p>Price: ${price}</p>
        <form id="orderForm">
          <input type="text" id="name" placeholder="Full Name" required />
          <input type="email" id="email" placeholder="Email" required />
          <input type="tel" id="phone" placeholder="Phone Number" required />
          <textarea id="address" placeholder="Delivery Address" required></textarea>
          <button type="submit">Place Order via WhatsApp</button>
          <button type="button" onclick="closeForm()">Cancel</button>
        </form>
      </div>
    `;
  
    const popupContainer = document.getElementById('popup-container');
    popupContainer.innerHTML = formHTML;
  
    document.getElementById('orderForm').addEventListener('submit', (e) => {
      e.preventDefault();
      sendOrder(product, price);
    });
  }
  
  function closeForm() {
    document.getElementById('popup-container').innerHTML = '';
  }
  
  function sendOrder(product, price) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
  
    const message = `*New Furniture Order*%0A%0A*Product:* ${product}%0A*Price:* ${price}%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Address:* ${address}`;
    const whatsappURL = `https://wa.me/2507XXXXXXXX?text=${message}`; // Replace with your WhatsApp number
  
    window.open(whatsappURL, '_blank');
    closeForm();
  }
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }
  
  // Form validation for the contact form
  function validateForm(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Validate inputs
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return false;
    }
  
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    alert("Form submitted successfully!");
    document.querySelector("form").submit();
  }
  