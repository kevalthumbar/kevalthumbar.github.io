let list = document.querySelectorAll(".progress-element");
const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        list.forEach((element) => {
            let tages = element.querySelector("progress");

            if (entry.isIntersecting) {
                tages.classList.add("loading");
                return; // if we added the class, exit the function
            }
            // We're not intersecting, so remove the class!
            tages.classList.remove("loading");
        });
        // ..............skill update..........\\
        list.forEach((p_tages) => {
            let progressTag = p_tages.querySelector("progress");
            let i = 0;
            let getProgressLable = p_tages.querySelector(".progress-label");

            const increment = setInterval(() => {
                getProgressLable.dataset.value = i + "%";
                if (i === progressTag.value) {
                    clearInterval(increment);
                }
                i++;
            }, 10);
        });
    });
});

observer.observe(document.querySelector(".progress-element"));