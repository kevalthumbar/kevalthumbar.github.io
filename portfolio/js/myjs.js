// Optimize intersection observer code for languages and skills sections

const createObserver = (sectionSelector) => {
    const section = document.querySelector(sectionSelector);
    const elements = section.querySelectorAll(".progress-element");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            elements.forEach((element) => {
                const progressTag = element.querySelector("progress");

                const label = element.querySelector(".progress-label");
                
                if (entry.isIntersecting) {
                    progressTag.classList.add("loading");

                    let i = 0;
                    const increment = setInterval(() => {
                        label.dataset.value = `${i}%`;
                        if (i >= progressTag.value) {
                            clearInterval(increment);
                        }
                        i++;
                    }, 10);
                    
                } else {
                    progressTag.classList.remove("loading");
                }
            });
        });
    });

    observer.observe(section);
};

// Create observers for both languages and skills sections
createObserver('.languages');
createObserver('.skill');