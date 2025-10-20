// profile.js — Django integrated and fixed version

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("profileForm");
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;

    // --- Live skill tag display ---
    const skillsInput = document.getElementById('skillsInput');
    const skillsDisplay = document.getElementById('skillsDisplay');

    function updateSkillsDisplay() {
        const skillsArray = skillsInput.value
            .split(',')
            .map(s => s.trim())
            .filter(s => s);

        skillsDisplay.innerHTML = '';
        skillsArray.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            skillsDisplay.appendChild(tag);
        });
    }

    skillsInput.addEventListener('input', updateSkillsDisplay);
    updateSkillsDisplay();

    // --- Submit profile via AJAX ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(window.location.href, {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                    "X-Requested-With": "XMLHttpRequest" // tells Django it's an AJAX request
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                alert(result.message || "Profile saved successfully!");
                window.location.href = "/dashboard/";
            } else {
                alert(result.message || "Something went wrong while saving your profile.");
            }

        } catch (error) {
            console.error("Error saving profile:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
