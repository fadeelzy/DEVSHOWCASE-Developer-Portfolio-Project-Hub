//  DevShowcase Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
    const username = window.username; // from template script
    if (!username) {
        console.error("Username not found in template.");
        return;
    }

    async function loadPortfolio() {
        try {
            const response = await fetch(`/dashboard/api/portfolio/${username}/`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            // Fill in main info
            document.getElementById('portfolioName').textContent = data.name || username;
            document.getElementById('portfolioHeadline').textContent = data.headline || '';
            document.getElementById('portfolioBio').textContent = data.bio || '';
            document.getElementById('portfolioEmail').href = `mailto:${data.email}`;
            document.getElementById('portfolioEmail').textContent = data.email || 'Not provided';
            
            if (data.photo) {
                document.getElementById('portfolioPhoto').src = data.photo;
            }

            // Social links
            const socialContainer = document.getElementById('portfolioSocial');
            const socials = [];
            if (data.github) socials.push(`<a href="${data.github}" target="_blank">GitHub</a>`);
            if (data.linkedin) socials.push(`<a href="${data.linkedin}" target="_blank">LinkedIn</a>`);
            if (data.twitter) socials.push(`<a href="${data.twitter}" target="_blank">Twitter</a>`);
            if (data.website) socials.push(`<a href="${data.website}" target="_blank">Website</a>`);
            socialContainer.innerHTML = socials.join(' ') || '<p>No social links yet.</p>';

            // Skills
            const skillsContainer = document.getElementById('portfolioSkills');
            const skills = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
            skillsContainer.innerHTML = skills.length
                ? skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')
                : '<p style="color: var(--text-muted);">No skills listed yet.</p>';

            // Projects
            const projectsContainer = document.getElementById('portfolioProjects');
            if (data.projects && data.projects.length) {
                projectsContainer.innerHTML = data.projects.map(project => `
                    <div class="project-card">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-links">
                                ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ''}
                                ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');
            } else {
                projectsContainer.innerHTML = '<p style="color: var(--text-muted);">No projects yet.</p>';
            }

        } catch (error) {
            console.error('Error loading portfolio:', error);
            document.body.innerHTML = '<div style="text-align: center; padding: 4rem;"><h1>Error loading portfolio</h1></div>';
        }
    }

    loadPortfolio();
});
