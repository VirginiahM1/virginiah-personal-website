/* ========================================
   VIRGINIAH MUTHONI — FREELANCE PORTFOLIO
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       1. MOBILE NAVIGATION
    ======================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.textContent = "☰";
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        // Close the menu after selecting a navigation link.
        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });


        // Close the menu when clicking outside the navigation.
        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

        });


        // Close the menu when Escape is pressed.
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }

        });


        // Close the menu if the screen becomes wider.
        window.addEventListener("resize", function () {

            if (window.innerWidth > 700) {
                closeMenu();
            }

        });

    }


    /* ========================================
       2. ACTIVE NAVIGATION LINK
    ======================================== */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveLink() {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 160;

        sections.forEach(function (section) {

            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(function (link) {

            const target = link.getAttribute("href");

            if (target === "#" + currentSection) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* ========================================
       3. AUTOMATIC COPYRIGHT YEAR
    ======================================== */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* ========================================
       4. BACK TO TOP BUTTON
    ======================================== */

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        function toggleBackToTop() {

            if (window.scrollY > 350) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }

        window.addEventListener("scroll", toggleBackToTop);

        toggleBackToTop();


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ========================================
       5. CONTACT FORM
    ======================================== */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        let formStatus = document.getElementById("form-status");

        // Create a status message area if it is not already in HTML.
        if (!formStatus) {

            formStatus = document.createElement("div");

            formStatus.id = "form-status";
            formStatus.className = "form-status";
            formStatus.setAttribute("role", "status");
            formStatus.setAttribute("aria-live", "polite");

            contactForm.appendChild(formStatus);

        }


        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            const originalButtonText =
                submitButton ? submitButton.textContent : "";

            const formAction =
                contactForm.getAttribute("action") || "";

            // Check that the contact form has a valid Formspree endpoint.
            if (
                formAction.includes("YOUR_FORMSPREE_FORM_ID") ||
                !formAction.includes("formspree.io/f/")
            ) {

                formStatus.textContent =
                    "The contact form is not properly configured. Please try again later.";

                formStatus.className = "form-status error show";

setTimeout(function () {
    formStatus.classList.remove("show");
}, 6000);

                return;

            }


            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            if (submitButton) {

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";

            }

            formStatus.textContent = "";
            formStatus.className = "form-status";


            try {

                const response = await fetch(formAction, {

                    method: "POST",

                    body: new FormData(contactForm),

                    headers: {
                        "Accept": "application/json"
                    }

                });


                if (response.ok) {

    formStatus.textContent =
        "Thank you! Your inquiry has been submitted successfully.";

    formStatus.className = "form-status success show";

    contactForm.reset();

    setTimeout(function () {
        formStatus.classList.remove("show");
    }, 6000);

                } else {

                    formStatus.textContent =
                        "Your message could not be submitted. Please check your form setup and try again.";

                    formStatus.className = "form-status error show";
                    setTimeout(function () {
                    formStatus.classList.remove("show");
                }, 6000);

                }

           } catch (error) {

    formStatus.textContent =
        "A connection error occurred. Please check your internet connection and try again.";

    formStatus.className = "form-status error show";

    setTimeout(function () {
        formStatus.classList.remove("show");
    }, 6000);

}
            finally {

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;

                }

            }

        });

    }

});
