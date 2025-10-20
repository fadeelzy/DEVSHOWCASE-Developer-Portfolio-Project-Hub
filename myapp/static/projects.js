// ===============================
// projects.js — Django-integrated version
// ===============================

let projects = [];
let editingProjectId = null;

// === Helper: Get CSRF token from cookie ===
function getCSRFToken() {
    const name = 'csrftoken';
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : '';
}

// === Load all projects from Django backend ===
async function loadProjects() {
    try {
        const response = await fetch("/projects/api/");
        if (!response.ok) throw new Error("Failed to fetch projects");
        projects = await response.json();
        displayProjects();
    } catch (error) {
        console.error("Error loading projects:", error);
        const container = document.getElementById("projectsList");
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted);">Failed to load projects.</p>`;
    }
}

// === Render all projects dynamically ===
function displayProjects() {
    const container = document.getElementById("projectsList");
    if (!projects.length) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted);">No projects yet. Click "Add New Project" to get started!</p>`;
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ""}
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ""}
                    ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo</a>` : ""}
                </div>
                <div class="project-actions">
                    <button class="btn-secondary" onclick="editProject(${project.id})">Edit</button>
                    <button class="btn-secondary" onclick="deleteProject(${project.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join("");
}

// === Modal controls ===
const modal = document.getElementById("projectModal");
const addBtn = document.getElementById("addProjectBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeBtn = document.querySelector(".close");

addBtn.addEventListener("click", () => {
    editingProjectId = null;
    document.getElementById("modalTitle").textContent = "Add New Project";
    document.getElementById("projectForm").reset();
    modal.style.display = "block";
});

cancelBtn.addEventListener("click", () => (modal.style.display = "none"));
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// === Edit Project ===
window.editProject = function (id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    editingProjectId = id;
    document.getElementById("modalTitle").textContent = "Edit Project";
    document.getElementById("projectTitle").value = project.title;
    document.getElementById("projectDescription").value = project.description;
    document.getElementById("projectImage").value = project.image || "";
    document.getElementById("projectGithub").value = project.github || "";
    document.getElementById("projectDemo").value = project.demo || "";
    modal.style.display = "block";
};

// === Delete Project ===
window.deleteProject = async function (id) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
        const response = await fetch(`/projects/delete/${id}/`, {
            method: "DELETE",
            headers: { "X-CSRFToken": getCSRFToken() },
        });

        if (response.ok) {
            projects = projects.filter(p => p.id !== id);
            displayProjects();
            alert("Project deleted successfully!");
        } else {
            alert("Failed to delete project.");
        }
    } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred while deleting the project.");
    }
};

// === Save (Add or Edit) Project ===
document.getElementById("projectForm").addEventListener("submit", async e => {
    e.preventDefault();

    const projectData = {
        id: editingProjectId,
        title: document.getElementById("projectTitle").value.trim(),
        description: document.getElementById("projectDescription").value.trim(),
        image: document.getElementById("projectImage").value.trim() || null,
        github: document.getElementById("projectGithub").value.trim() || null,
        demo: document.getElementById("projectDemo").value.trim() || null,
    };

    if (!projectData.title) {
        alert("Please enter a project title.");
        return;
    }

    try {
        const response = await fetch("/projects/save/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify(projectData),
        });

        if (response.ok) {
            modal.style.display = "none";
            alert("Project saved successfully!");
            loadProjects();
        } else if (response.status === 403) {
            alert("CSRF verification failed. Please refresh the page and try again.");
        } else {
            alert("Failed to save project. Please check your input.");
        }
    } catch (error) {
        console.error("Save error:", error);
        alert("An error occurred while saving the project.");
    }
});

// === Init ===
loadProjects();
