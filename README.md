# Task Manager Frontend

## Overview

This Angular 17 frontend application is designed as the client UI for the Task Manager backend API.  
It provides a simple, clean interface to create, view, update, filter, and delete tasks with friendly status management.

---

## 🎥 Demo

You can download or watch the demo video:

👉 [Watch Demo Video](src/assets/demo.webm)

---

## Features

- Display task list with friendly status labels and color-coded chips  
- Add new tasks via reactive forms in a modal dialog  
- Edit existing tasks via modal dialog  
- Change task status from dropdown menu on each task row  
- Delete tasks with confirmation  
- Filter tasks by status using dropdown filter  
- Instant search filter by task title or status 
- Responsive design with Angular Material components  
- Error handling and user feedback via snackbars  

---

## Technologies

- Angular 17 (latest stable)  
- Angular Material for UI components  
- RxJS for reactive programming  
- TypeScript and SCSS  
- HttpClient for REST API communication  

---

## Project Structure

```
src/
├── app/
│ ├── components/
│ ├── modules/
│ │ ├── core/
│ │ ├── shared/
│ │ └── tasks/
│ │ 	   ├── components/
│ │ 	   ├── helpers/
│ │ 	   ├── models/
│ │ 	   ├── services/
│ │ 	   ├── tasks-routing.module.ts
│ │ 	   └── tasks.module.ts
│ │ 
│ ├── app-routing.module.ts
│ ├── app.module.ts
├── assets/
└── environments/


```

---

## Getting Started

### Prerequisites

- Node.js (>=18.x recommended)  
- Angular CLI (>=17.x) installed globally:  
  ```bash
  npm install -g @angular/cli
  ```

---

### Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/task-manager-suite/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Configure Backend API URL in `src/environments/environment.ts` and `src/environments/environment.prod.ts`:  
   ```ts
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:8080/api'
   };
   ```

---

### Running the Application

Start the dev server with live reload:

```bash
ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200).

---

### Build for Production

```bash
ng build --prod
```

---

## Usage

- Use the **Add Task** button to create a new task  
- Click the **Edit** (green) icon to modify task details  
- Click the **Delete** (red) icon to remove a task  
- Click the status dropdown arrow to quickly change status  
- Use the **Filter by Status** dropdown to filter tasks by their status  
- Use the search input box to filter tasks by title or status instantly  

---

## Testing

Run unit tests with Karma:

```bash
ng test
```

---

## Coding Best Practices

- Modular architecture with feature modules  
- Reusable and isolated components  
- Reactive forms for validation  
- Strong typing with TypeScript interfaces/models  
- Angular Material for consistent UI and accessibility  
- Service layer for HTTP calls and business logic  
- Use environment variables for configuration  
- Error handling with user feedback (snackbars)  

---

## 🧠 Ideas & Improvements

Several potential enhancements (security, user management, etc.) are listed in the [Issues section](https://github.com/task-manager-suite/task-manager-backend/issues).  
These represent additional ideas beyond the challenge scope, but aligned with best practices and future extensibility.

---

## 📌 Author

**Montassar Dhahri**  
- GitHub: [@montadhr](https://github.com/montadhr)  

---

## 📄 License

This project is delivered as part of a technical challenge. All rights reserved.