window.onload = function() {
    // --- Clients slider ---
    async function clientSlider() {
        return await new Promise((resolve, reject) => {
            var slideClientIndex = 1;
            showClientSlides(slideClientIndex);

            function sliderClientPlusSlides() {
                showClientSlides((slideClientIndex += 1));
            }

            function sliderClientMinusSlides() {
                showClientSlides((slideClientIndex -= 1));
            }

            function sliderClientCurrentSlide(n) {
                showClientSlides((slideClientIndex = n));
            }

            function showClientSlides(n) {
                console.log("Show slides clients");
                var i;
                var slides = document.getElementsByClassName(
                    "clients__slide-slide-content"
                );
                var dots = document.getElementsByClassName("slider-clients__control");
                if (n > slides.length) {
                    slideClientIndex = 1;
                }
                if (n < 1) {
                    slideClientIndex = slides.length;
                }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(
                        " slider-clients__slider-control_active",
                        ""
                    );
                }
                slides[slideClientIndex - 1].style.display = "grid";
                dots[slideClientIndex - 1].className +=
                    " slider-clients__slider-control_active";
            }
            window.sliderClientPlusSlides = sliderClientPlusSlides;
            window.sliderClientMinusSlides = sliderClientMinusSlides;
            window.sliderClientCurrentSlide = sliderClientCurrentSlide;
            window.showClientSlides = showClientSlides;
            resolve("complete add clientSlider");
        });
    }
    // --- Fullscreen slider ---
    async function fullscreenSlider() {
        return await new Promise((resolve, reject) => {
            var slideIndex = 1;
            showSlides(slideIndex);

            function sliderFsPlusSlides() {
                showSlides((slideIndex += 1));
            }

            function sliderFsMinusSlides() {
                showSlides((slideIndex -= 1));
            }

            function sliderFsCurrentSlide(n) {
                showSlides((slideIndex = n));
            }

            function showSlides(n) {
                console.log("Show slides");
                var i;
                var slides = document.getElementsByClassName(
                    "slider-fullscreen__slide_fade"
                );
                var dots = document.getElementsByClassName("slider-control");
                if (n > slides.length) {
                    slideIndex = 1;
                }
                if (n < 1) {
                    slideIndex = slides.length;
                }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(
                        " slider-fullscreen__slider-control_active",
                        ""
                    );
                }
                slides[slideIndex - 1].style.display = "block";
                dots[slideIndex - 1].className +=
                    " slider-fullscreen__slider-control_active";
            }
            window.sliderFsPlusSlides = sliderFsPlusSlides;
            window.sliderFsMinusSlides = sliderFsMinusSlides;
            window.sliderFsCurrentSlide = sliderFsCurrentSlide;
            window.showSlides = showSlides;
            resolve("complete add fullscreenSlider");
        });
    }
    // --- Review slider ---
    async function reviewSlider() {
        return await new Promise((resolve, reject) => {
            var slideReviewIndex = 1;
            showSlides(slideReviewIndex);

            function reviewPlusSlides() {
                showSlides((slideReviewIndex += 1));
            }

            function reviewMinusSlides() {
                showSlides((slideReviewIndex -= 1));
            }

            function reviewCurrentSlide(n) {
                showSlides((slideReviewIndex = n));
            }

            function showSlides(n) {
                console.log("Show slides review");
                var i;
                var slides = document.getElementsByClassName(
                    "review__slide-slide-content"
                );
                var dots = document.getElementsByClassName("slider-review__control");
                if (n > slides.length) {
                    slideReviewIndex = 1;
                }
                if (n < 1) {
                    slideReviewIndex = slides.length;
                }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(
                        " slider-review__slider-control_active",
                        ""
                    );
                }
                slides[slideReviewIndex - 1].style.display = "block";
                dots[slideReviewIndex - 1].className +=
                    " slider-review__slider-control_active";
            }
            window.reviewPlusSlides = reviewPlusSlides;
            window.reviewMinusSlides = reviewMinusSlides;
            window.reviewCurrentSlide = reviewCurrentSlide;
            window.showSlides = showSlides;
            resolve("complete add reviewSlider");
        });
    }
    // --- connect sliders ---
    clientSlider().then(fullscreenSlider().then(reviewSlider()));
};