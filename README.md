ServeSync ------Volunteer Management Website

Project Overview
Concept: A user-friendly platform for managing volunteer opportunities.
Problem Solved: Streamlines the process of posting and finding volunteer opportunities.
User Roles: Allows users to create, update, and delete volunteer posts and volunteer for others' posts.
Features
Volunteer Post Management:
Create, update, and delete volunteer need posts.
Track and manage volunteer requests.
User-specific post management.
Responsive Design:
Fully responsive for mobile, tablet, and desktop views.
Clean and organized layout with customizable components.
Authentication and Security:
Email/password-based authentication.
JWT token for secure private routes.
Conditional login/logout and profile display.
Technologies Used
Frontend:
React.js
Tailwind CSS
Daisy UI
Backend:
Node.js
Express.js
Database:
MongoDB
Authentication:
Firebase
Deployment:
Vercel
How to Clone and Run Locally

Clone the Repository: git clone https://github.com/your-username/volunteer-management-website.git cd volunteer-management-website
Install dependencies for both frontend and backend:
cd client npm install cd ../server npm install 3. Set up environment variables:

Create .env files in both client and server directories. Refer to .env.example files provided for necessary variables (e.g., Firebase config keys, MongoDB credentials).

Start the backend server:
cd server npm start 5. Start the frontend development server:

cd client npm start
