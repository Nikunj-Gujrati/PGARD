const feedbackModal = document.getElementById("feedbackModal");
        const aboutModal = document.getElementById("aboutModal");
        const linkFeedbackModal = document.getElementById("linkFeedbackModal");
        const linkAboutModal = document.getElementById("linkAboutModal");
        const closeFeedbackModal = document.querySelector(".closeFeedbackModal");
        const closeAboutModal = document.querySelector(".closeAboutModal");
        const sendFeedbackButton = document.getElementById("sendFeedbackButton");
        const feedbackTextarea = document.getElementById("feedbackTextarea");

        linkFeedbackModal.onclick = function (event) {
            event.preventDefault(); 
            feedbackModal.style.display = "block";
        }

        linkAboutModal.onclick = function (event) {
            event.preventDefault();
            aboutModal.style.display = "block";
        }

        closeFeedbackModal.onclick = function () {
            feedbackModal.style.display = "none";
        }

        closeAboutModal.onclick = function () {
            aboutModal.style.display = "none";
        }

        sendFeedbackButton.onclick = function () {
            const feedback = feedbackTextarea.value;
            if (feedback) {
                const email = "nikunjgujrati23@gmail.com";
                const subject = "Feedback from PGARD";
                const body = encodeURIComponent(feedback);
                window.open(`mailto:${email}?subject=${subject}&body=${body}`);
                feedbackTextarea.value = ""; 
                feedbackModal.style.display = "none"; 
            } else {
                alert("Please enter your feedback before sending.");
            }
        }

        window.onclick = function (event) {
            if (event.target == feedbackModal) {
                feedbackModal.style.display = "none";
            }
            if (event.target == aboutModal) {
                aboutModal.style.display = "none";
            }
        }