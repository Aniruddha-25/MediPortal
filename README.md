# MediPortal

A full-stack Hospital Management System built with **Django** and **React**.

---

# Installation (Linux)

## 1. Clone the Repository

* Clone the repository:

```bash
git clone https://github.com/Aniruddha-25/MediPortal.git && cd MediPortal
```

---

## 2. Backend Setup

* Create a virtual environment:

```bash
cd backend && python3 -m venv venv
```

* Activate the virtual environment:

```bash
source venv/bin/activate
```

* Activate the Environment and Install the required dependencies:

```bash
pip install -r requirements.txt
```

* Apply database migrations:

```bash
python3 manage.py migrate
```

* Create a superuser (Optional):

```bash
python3 manage.py createsuperuser
```

---

## 3. Frontend Setup

```bash
cd frontend && npm install
```

---

## 4.    Running the Project

Note :- The backend and frontend are two long-running servers, so run them in **two separate terminals** — the backend from the `backend/` directory and the frontend from `frontend/`. Do **not** chain the two servers with `&&` — `runserver` never exits, so the second command would never start.

## Terminal 1 – Backend (Django API)

* Enter the backend directory, activate the virtual environment, and start the Django server:

```bash
cd backend && source venv/bin/activate && python3 manage.py runserver
```

## Terminal 2 – Frontend (React UI)

* Start the Frontend

```bash
cd frontend && nvm use 24 && npm run dev
```



