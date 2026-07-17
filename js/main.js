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
            document.getElementById('navLinks').classList.remove('show');
        });
    });

    // 3. Mobile Menu Toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('show');
    });

    // 4. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            document.querySelectorAll('.error').forEach(err => err.textContent = '');
            document.getElementById('successMsg').style.display = 'none';

            const name = document.getElementById('name').value.trim();
            if (name.length < 2) {
                document.getElementById('nameError').textContent = "Name must be at least 2 characters";
                isValid = false;
            }

            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = "Enter a valid email address";
                isValid = false;
            }

            const message = document.getElementById('message').value.trim();
            if (message.length < 10) {
                document.getElementById('messageError').textContent = "Message must be at least 10 characters";
                isValid = false;
            }

            if (isValid) {
                document.getElementById('successMsg').style.display = 'block';
                contactForm.reset();
            }
        });
    }
});
