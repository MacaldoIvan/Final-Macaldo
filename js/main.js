document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting & Date
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('currentDate');
    if (greetingEl && dateEl) {
        const hour = new Date().getHours();
        const greetingText = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
        greetingEl.textContent = greetingText;
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', dateOptions);
    }

    // 2. Page Navigation Switch
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinksContainer = document.getElementById('navLinks');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.dataset.page;
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            pageSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetPage) section.classList.add('active');
            });
            // Ensure mobile menu closes after choosing a menu category link
            navLinksContainer.classList.add('hidden');
            navLinksContainer.classList.remove('flex');
        });
    });

    // 3. Mobile Menu Toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        navLinksContainer.classList.toggle('hidden');
        navLinksContainer.classList.toggle('flex');
    });

    // 4. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Clean/Reset styles and states before evaluation
            document.querySelectorAll('.error').forEach(err => {
                err.textContent = '';
                err.style.display = 'none';
            });
            document.getElementById('successMsg').style.display = 'none';

            // Validate Name
            const name = document.getElementById('name').value.trim();
            const nameError = document.getElementById('nameError');
            if (name.length < 2) {
                nameError.textContent = "Name must be at least 2 characters";
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = document.getElementById('emailError');
            if (!emailRegex.test(email)) {
                emailError.textContent = "Enter a valid email address";
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validate Message
            const message = document.getElementById('message').value.trim();
            const messageError = document.getElementById('messageError');
            if (message.length < 10) {
                messageError.textContent = "Message must be at least 10 characters";
                messageError.style.display = 'block';
                isValid = false;
            }

            // If completely valid, issue success callback
            if (isValid) {
                document.getElementById('successMsg').style.display = 'block';
                contactForm.reset();
            }
        });
    }
});
