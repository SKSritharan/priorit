# **To-Do Task App**

A simple to-do task web application built with Laravel, Vue, and MySQL. Users can create tasks, view the latest five pending tasks, and mark tasks as completed. The project is containerized with Docker using Laravel Sail and follows clean code principles with unit tests for both frontend and backend.

![To-Do Task App](https://github.com/SKSritharan/priorit/public/screenshots/hero_shot.png)

## **Features**
✅ Create new tasks with a title and description  
✅ View the most recent 5 pending tasks  
✅ Mark tasks as completed (removes them from the UI)  
✅ REST API with Laravel  
✅ Frontend built with Vue 3 + Vite  
✅ Docker support via Laravel Sail  
✅ Unit tests using Pest (backend) and Vitest (frontend)

## **Tech Stack**
- **Backend:** Laravel 11
- **Frontend:** Vue 3 + Vite
- **Database:** MySQL
- **Testing:**
    - **Backend:** PestPHP
    - **Frontend:** Vitest + Vue Test Utils
- **Containerization:** [Docker](https://www.docker.com/) + [Laravel Sail](https://laravel.com/docs/11.x/sail)

## **Installation & Setup**

### **Prerequisites**
- Ensure you have **Docker** installed on your system.
- Laravel Sail is supported on macOS, Linux, and Windows (via [WSL2](https://docs.microsoft.com/en-us/windows/wsl/about))

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/SKSritharan/priorit.git
cd priorit
```

### **Step 2: Start the Application**
```sh
./vendor/bin/sail up -d
```
> **Note:** The first time running Sail will install dependencies and build the containers.

### **Step 3: Run Migrations**
```sh
./vendor/bin/sail artisan migrate
```

### **Step 4: Access the Application**
- Frontend: `http://localhost:80`
- Backend API: `http://localhost/api/tasks`

## **Running Tests**

### **Backend (PestPHP Tests)**
```sh
./vendor/bin/sail test
```

### **Frontend (Vitest Tests)**
```sh
npm run test
```

### **Frontend Test UI Mode**
```sh
npm run test:ui
```

## **API Endpoints**

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| `POST` | `/api/tasks`          | Create a new task               |
| `GET`  | `/api/tasks`          | Fetch the latest 5 uncompleted tasks |
| `PUT`  | `/api/tasks/{id}/complete` | Mark a task as completed |

## **License**
This project is licensed under the MIT License. 🚀

---
