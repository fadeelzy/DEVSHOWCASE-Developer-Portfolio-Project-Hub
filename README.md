🧠 DEVSHOWCASE — Developer Portfolio & Project Hub

DevShowcase is a full-stack web application built with Django and PostgreSQL that empowers developers to create, customize, and share professional portfolios.
It allows you to present your skills, projects, and professional identity with a sleek and dynamic interface — no coding required after setup.


(A modern, developer-first portfolio platform — built for engineers, by engineers.)

🚀 Features

✅ Developer Portfolio Generator — automatically creates a portfolio page using your data.
✅ Project Showcase — add GitHub links, live demos, and images for each project.
✅ Custom Dashboard — edit your bio, skills, and social links seamlessly.
✅ AJAX-powered Profile Editor — instant save without page reloads.
✅ Responsive UI — modern HTML/CSS layout designed for all devices.
✅ PostgreSQL Integration — secure and production-ready relational database.
✅ Dynamic API Layer — JSON endpoints to power frontend interactivity.
✅ Authentication System — Django’s built-in user auth for signup/login/logout.
✅ Clean URL structure — SEO-friendly portfolio URLs like:

https://devshowcase.com/fadeelzy


🏗️ Tech Stack
Layer	Technology
Frontend	HTML5, CSS3, JavaScript (Vanilla)
Backend	Django (Python)
Database	PostgreSQL
Version Control	Git & GitHub
Deployment Ready For	Render / Vercel / Railway / Heroku
Monitoring	Prometheus & Grafana (optional extension)

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/fadeelzy/devshowcase.git
cd devshowcase

2️⃣ Create Virtual Environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Configure PostgreSQL

Update your .env file with your database credentials:

DATABASE_URL=postgresql://username:password@localhost:5432/devshowcase_db
SECRET_KEY=your_django_secret_key
DEBUG=True

5️⃣ Run Migrations
python manage.py makemigrations
python manage.py migrate

6️⃣ Start Development Server
python manage.py runserver


Your app is live at 👉 http://127.0.0.1:8000

🧩 Project Structure
devshowcase/
├── myapp/
│   ├── templates/
│   │   ├── dashboard.html
│   │   ├── profile-editor.html
│   │   ├── portfolio.html
│   │   └── project-editor.html
│   ├── static/
│   │   ├── styles.css
│   │   ├── profile.js
│   │   └── project.js
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── devproject/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── requirements.txt


🧠 API Endpoints

Endpoint	Method	Description
/api/portfolio/<username>/	GET	Fetch user’s profile + projects
/dashboard/	GET	View dashboard
/profile-editor/	POST	Update profile
/project-editor/	POST	Add new project

🌟 Portfolio Preview

Each developer gets a custom portfolio page automatically generated from their data:

https://devshowcase.com/<username>/
Example:
👉 https://devshowcase.com/fadeelzy

This page dynamically loads your profile, bio, skills, and projects — powered by Django JSON endpoints.

🧩 Database Schema (Simplified)

Profile Model
Field	Type	Description
user	OneToOneField	Links to Django User
headline	CharField	Short title (e.g. “Full Stack Developer”)
bio	TextField	Developer bio
photo	URLField	Profile image link
skills	CharField	Comma-separated skills
github, linkedin, twitter, website	URLFields	Optional social links
Project Model
Field	Type	Description
profile	ForeignKey	Linked to Profile
title	CharField	Project name
description	TextField	What it does
image	URLField	Thumbnail or screenshot
github, demo	URLFields	Project links

👨🏽‍💻 Author

Fadilah Abdulkadir
Backend Engineer | Site Reliability Engineer | Cloud Solutions Architect

🌐 Portfolio : 

💼 LinkedIn : https://linkedin.com/in/fadilah-abdulkadir-378a47269

🐙 GitHub : https://github.com/fadeelzy/

⭐ Contributing

Contributions are always welcome!

Fork this repository

Create your feature branch (git checkout -b feature/awesome-feature)

Commit changes (git commit -m "Add awesome feature")

Push to your branch (git push origin feature/awesome-feature)

Create a Pull Request

📜 License

This project is open-source under the MIT License — feel free to fork and expand it.

⚡ Final Words

“DevShowcase isn’t just a portfolio — it’s your professional brand, powered by code.”
