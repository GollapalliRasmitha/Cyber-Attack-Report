document.addEventListener('DOMContentLoaded', () => {

    // Detection Guide Interactivity
    const points = document.querySelectorAll('.point');
    const scanLine = document.querySelector('.scan-line');
    const statusText = document.querySelector('.status-text');

    points.forEach(point => {
        point.addEventListener('mouseenter', () => {

            points.forEach(p => p.classList.remove('active'));
            point.classList.add('active');

            const target = point.getAttribute('data-target');
            updateDetectionDemo(target);
        });
    });

    function updateDetectionDemo(target) {
        let message = "ANALYZING...";
        let color = "#ff2a6d";

        switch (target) {
            case 'eyes':
                message = "ANALYZING: BLINK RATE IRREGULAR";
                break;
            case 'mouth':
                message = "ANALYZING: LIP SYNC MISMATCH DETECTED";
                break;
            case 'edges':
                message = "ANALYZING: MASK EDGE ARTIFACTS";
                break;
            case 'skin':
                message = "ANALYZING: SKIN TONE INCONSISTENCY";
                break;
            default:
                message = "SCANNING SUBJECT...";
        }

        statusText.textContent = message;
        statusText.style.color = color;

        scanLine.style.animation = 'none';
        scanLine.offsetHeight;
        scanLine.style.animation = 'scanMove 1.5s infinite alternate';
    }


    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

        });
    });


    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {

            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {

                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.background = '#0a0f1c';
                navLinks.style.width = '100%';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }

        });
    }


    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }

        });

    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .concept').forEach(el => {

        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        observer.observe(el);

    });


    const styleSheet = document.createElement("style");

    styleSheet.innerText = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(styleSheet);



    // ===============================
    // REPORT FORM BACKEND CONNECTION
    // ===============================

    const reportForm = document.getElementById("reportForm");

    if (reportForm) {

        reportForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const formData = new FormData(reportForm);

            fetch("http://127.0.0.1:5000/report", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                const msg = document.getElementById("responseMessage");

                if(msg){
                    msg.innerText = data.message;
                }

                reportForm.reset();

            })
            .catch(error => {

                const msg = document.getElementById("responseMessage");

                if(msg){
                    msg.innerText = "Error submitting report";
                }

                console.error(error);

            });

        });

    }

});