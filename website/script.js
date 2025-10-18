document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle for Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close navbar when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty links

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get the height of the fixed navbar and announcement bar
                const topAnnouncementHeight = document.querySelector('.top-announcement')?.offsetHeight || 0;
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const offset = topAnnouncementHeight + navbarHeight + 10; // Add some extra padding

                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Navbar Active State
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLi.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Adjust this as needed for when a section becomes 'active'
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Counter Animation for Stats Section
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.counter');
    let countersActivated = false;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const countSuffix = counter.nextSibling ? counter.nextSibling.textContent : ''; // Get "Cr" or "+"

        let current = 0;
        const increment = target / 200; // Adjust speed

        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersActivated) {
                counters.forEach(startCounter);
                countersActivated = true;
                statsObserver.unobserve(statsSection); // Stop observing once activated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Function to load the documentation page dynamically
function loadDocumentationPage() {
    const mainContent = document.getElementById('main-content'); // Assuming you have a main-content div
    if (!mainContent) return;

    mainContent.innerHTML = `
        <section class="documentation-page">
            <div class="container">
                <aside class="doc-sidebar">
                    <h3>Documentation</h3>
                    <ul>
                        <li><a href="#doc-overview" class="active">Overview</a></li>
                        <li><a href="#doc-getting-started">Getting Started</a></li>
                        <li><a href="#doc-seller-guide">Seller Guide</a></li>
                        <li><a href="#doc-buyer-guide">Buyer Guide</a></li>
                        <li><a href="#doc-api">API Reference</a></li>
                        <li><a href="#doc-faq">FAQ</a></li>
                        <li><a href="#doc-support">Support</a></li>
                    </ul>
                </aside>
                <article class="doc-content">
                    <section id="doc-overview">
                        <h2>UDBHAV Documentation Overview</h2>
                        <p>Welcome to the UDBHAV documentation. This guide provides comprehensive information on how to use, integrate with, and understand the UDBHAV platform, designed to empower local Indian sellers and foster economic growth for Viksit Bharat Buildathon 2025.</p>
                        <p>Our goal is to create a seamless and intuitive experience for both sellers and buyers, bridging the digital divide and bringing unique local products to a national audience.</p>
                    </section>

                    <section id="doc-getting-started">
                        <h3>Getting Started with UDBHAV</h3>
                        <p>This section will walk you through the initial steps to begin your journey with UDBHAV.</p>
                        <h4>1. Account Creation</h4>
                        <p>Registering an account on UDBHAV is straightforward. Follow these steps:</p>
                        <ul>
                            <li>Visit the <a href="#">Sign Up</a> page.</li>
                            <li>Provide your basic details (Name, Email, Phone Number).</li>
                            <li>Verify your email address.</li>
                            <li>Choose whether to register as a Seller or a Buyer.</li>
                        </ul>
                        <h4>2. Setting up your Seller Profile</h4>
                        <p>If you choose to be a seller, you'll need to complete your business profile. This includes:</p>
                        <ul>
                            <li>Business Name and Address.</li>
                            <li>GSTIN (optional, but recommended for professional sellers).</li>
                            <li>Bank Account details for payouts.</li>
                            <li>Upload relevant business licenses or permits.</li>
                        </ul>
                        <p>Example of a seller registration API call:</p>
                        <pre><code>
POST /api/v1/sellers/register
Content-Type: application/json

{
  "businessName": "Handicrafts by Rajesh",
  "email": "rajesh@example.com",
  "phone": "+919876543210",
  "address": {
    "street": "123 Market Rd",
    "city": "Jaipur",
    "state": "Rajasthan",
    "pincode": "302001"
  },
  "gstin": "22ABCDE1234F1Z5"
}
                        </code></pre>
                    </section>

                    <section id="doc-seller-guide">
                        <h3>Seller Guide</h3>
                        <p>A detailed guide for sellers to manage their products, orders, and storefront.</p>
                        <h4>Listing Products</h4>
                        <p>To add a new product:</p>
                        <ol>
                            <li>Navigate to 'My Listings' in your Seller Dashboard.</li>
                            <li>Click 'Add New Product'.</li>
                            <li>Fill in product details: Name, Description, Category, Price, Stock, Images.</li>
                            <li>Ensure high-quality images for better visibility.</li>
                        </ol>
                        <h4>Managing Orders</h4>
                        <p>Monitor and fulfill orders efficiently through your dashboard. You can view:</p>
                        <ul>
                            <li>New Orders: Awaiting acceptance/processing.</li>
                            <li>Pending Shipment: Ready for dispatch.</li>
                            <li>Shipped: Items on their way to the buyer.</li>
                            <li>Delivered: Orders successfully completed.</li>
                        </ul>
                    </section>

                    <section id="doc-buyer-guide">
                        <h3>Buyer Guide</h3>
                        <p>Everything buyers need to know to find amazing products and make secure purchases.</p>
                        <h4>Searching and Discovery</h4>
                        <p>Use our advanced search and filtering options to find exactly what you're looking for:</p>
                        <ul>
                            <li>Search by product name, category, or seller.</li>
                            <li>Filter by price range, location, ratings, and more.</li>
                            <li>Explore curated collections and featured local products.</li>
                        </ul>
                        <h4>Secure Checkout</h4>
                        <p>UDBHAV ensures a safe and secure checkout process with multiple payment options:</p>
                        <ul>
                            <li>Credit/Debit Cards</li>
                            <li>Net Banking</li>
                            <li>UPI</li>
                            <li>Digital Wallets</li>
                        </ul>
                        <p>All transactions are encrypted and protected.</p>
                    </section>

                    <section id="doc-api">
                        <h3>API Reference</h3>
                        <p>For developers looking to integrate with UDBHAV, our API provides access to product listings, seller information, and order management functionalities.</p>
                        <h4>Authentication</h4>
                        <p>All API calls require authentication using a Bearer token obtained after seller registration.</p>
                        <pre><code>
Authorization: Bearer YOUR_API_TOKEN
                        </code></pre>
                        <h4>Endpoints</h4>
                        <ul>
                            <li><code>GET /api/v1/products</code>: Retrieve all listed products.</li>
                            <li><code>GET /api/v1/products/{id}</code>: Get details of a specific product.</li>
                            <li><code>POST /api/v1/products</code>: Create a new product listing.</li>
                            <li><code>GET /api/v1/sellers/{id}/orders</code>: Get orders for a specific seller.</li>
                        </ul>
                    </section>

                    <section id="doc-faq">
                        <h3>Frequently Asked Questions</h3>
                        <h4>For Sellers:</h4>
                        <p><strong>Q: What are the fees for selling on UDBHAV?</strong></p>
                        <p>A: UDBHAV charges a small commission on successful sales, with no upfront listing fees. Detailed fee structures are available in your seller dashboard.</p>
                        <p><strong>Q: How do I receive payments?</strong></p>
                        <p>A: Payments are settled directly to your registered bank account on a weekly basis, after deducting commissions.</p>
                        <h4>For Buyers:</h4>
                        <p><strong>Q: Is cash on delivery available?</strong></p>
                        <p>A: Yes, Cash on Delivery (COD) is available for eligible products and locations.</p>
                        <p><strong>Q: How do I track my order?</strong></p>
                        <p>A: You can track your order status directly from your 'My Orders' section in your buyer profile.</p>
                    </section>

                    <section id="doc-support">
                        <h3>Support & Contact</h3>
                        <p>If you have any further questions or require assistance, our support team is here to help.</p>
                        <ul>
                            <li>Email: <a href="mailto:support@udbhav.in">support@udbhav.in</a></li>
                            <li>Phone: +91 98765 43210 (Mon-Fri, 9 AM - 6 PM IST)</li>
                            <li>Live Chat: Available on the UDBHAV platform during business hours.</li>
                        </ul>
                    </section>
                </article>
            </div>
        </section>
    `;

    // Add event listeners for sidebar navigation
    document.querySelectorAll('.doc-sidebar ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active from all links
            document.querySelectorAll('.doc-sidebar ul li a').forEach(link => link.classList.remove('active'));
            // Add active to the clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Ensure initial scroll to overview
    document.getElementById('doc-overview').scrollIntoView({ behavior: 'auto', block: 'start' });
}

// Check if current page is documentation and load content
if (window.location.pathname.includes('documentation.html')) {
    // This part should technically be rendered by the server or loaded via JS after the basic HTML structure is there.
    // For a single-page app like simulation, you'd replace the main content.
    // For this example, assuming 'documentation.html' itself has basic HTML and we populate a 'main-content' div.
    // If documentation.html is completely blank, the above `loadDocumentationPage` would build it.
}
