Setup Instructions

Backend

Go to the backend folder:

cd backend

Install dependencies:

npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon

Start the backend:

npm run dev

Frontend

Go to the frontend folder:

cd frontend

Install dependencies:

npm install react react-dom react-router-dom axios lucide-react
npm install -D vite @vitejs/plugin-react typescript tailwindcss postcss autoprefixer eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh @types/react @types/react-dom @types/node typescript-eslint globals tailwindcss-cli

Initialize Tailwind:

npx tailwindcss init -p

Start the frontend:

npm run dev
