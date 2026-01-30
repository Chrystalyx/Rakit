# Rakit 🪑🛠️

**Rakit** is a platform dedicated to custom furniture services, designed to connect the urban community with personalized furniture solutions. Built with a modern monolithic architecture using Laravel and React (via Inertia.js), Rakit offers a seamless and responsive user experience.

## ✨ Key Features

* **🔐 Secure Authentication:** Complete login, registration, and password reset functionality (Laravel Breeze/Jetstream).
* **👤 User Dashboard:** Personalized dashboard for users to manage their profiles and orders.
* **🎨 Custom Furniture Requests:** (Add description: e.g., Interface for users to submit custom furniture designs).
* **📱 Responsive Design:** Fully responsive interface built with Tailwind CSS, accessible on mobile and desktop.
* **⚡ SPA Feel:** seamless page transitions provided by Inertia.js without the complexity of a separate API.

## 🛠️ Tech Stack

* **Backend:** [Laravel](https://laravel.com/) (PHP)
* **Frontend:** [React.js](https://react.dev/)
* **Adapter:** [Inertia.js](https://inertiajs.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Database:** MySQL (Recommended)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* PHP >= 8.2
* Composer
* Node.js & NPM
* MySQL

### Installation Steps

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/username/rakit.git](https://github.com/username/rakit.git)
    cd rakit
    ```

2.  **Install PHP dependencies**
    ```bash
    composer install
    ```

3.  **Install JavaScript dependencies**
    ```bash
    npm install
    ```

4.  **Environment Configuration**
    Copy the example environment file and configure your database details.
    ```bash
    cp .env.example .env
    ```
    *Open the `.env` file and update `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` to match your local database.*

5.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

6.  **Run Database Migrations**
    Create the necessary tables in your database.
    ```bash
    php artisan migrate
    ```

7.  **Run the Application**
    You need to run both the Laravel development server and the Vite build server (in two separate terminals).

    *Terminal 1 (Laravel):*
    ```bash
    php artisan serve
    ```

    *Terminal 2 (Vite):*
    ```bash
    npm run dev
    ```

8.  **Access the App**
    Open your browser and visit `http://127.0.0.1:8000`.

## 📂 Project Structure


```

rakit/
├── app/                 # Laravel Core (Controllers, Models)
├── database/            # Migrations & Seeders
├── resources/
│   ├── css/             # Tailwind imports
│   ├── js/              # React Components & Pages (Inertia)
│   └── views/           # Blade templates (Root view)
├── routes/              # Web & API routes
└── public/              # Static assets

```

## 📄 License

The Rakit project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
