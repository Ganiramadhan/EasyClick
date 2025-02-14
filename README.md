# EasyClick - Online Fish Store

EasyClick is a web-based e-commerce platform for selling fish with an integrated payment gateway. This system allows users to browse fish catalogs, add products to their cart, complete online payments, and track order status seamlessly.

## 🚀 Key Features
- 📖 **Product Catalog** with descriptions and images
- 🛒 **Shopping Cart** and checkout process
- 💳 **Payment Gateway Integration** (Midtrans/Xendit)
- 📦 **Order & Shipping Management**
- 🔐 **User Authentication** (Login/Register with Google)
- 📊 **Admin Dashboard** for product & order management

---

## 🛠️ Technologies Used
- **Backend:** Laravel 10
- **Frontend:** React with Inertia.js and Tailwind Css
- **Database:** MySQL
- **Payment Gateway:** Midtrans/Xendit
- **Authentication:** Laravel Breeze with Google Login

---

## 📥 Installation and Running the Project

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Ganiramadhan/EasyClick.git
cd EasyClick
```

### 2️⃣ Install Dependencies
#### Backend (Laravel)
```bash
composer install
```
#### Frontend (React + Inertia.js)
```bash
npm install
```

### 3️⃣ Database Configuration
1. Duplicate the `.env.example` file and rename it to `.env`
2. Edit the database configuration in the `.env` file
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=easyclick_db
DB_USERNAME=root
DB_PASSWORD=
```
3. Run database migration
```bash
php artisan migrate --seed
```

### 4️⃣ Generate Key and Storage Link
```bash
php artisan key:generate
php artisan storage:link
```

### 5️⃣ Running the Server
#### Backend (Laravel)
```bash
php artisan serve
```
#### Frontend (React + Vite)
```bash
npm run dev
```

---

## ⚙️ Running Payment Gateway (Midtrans/Xendit)
Make sure you have a Midtrans/Xendit account and set up the configuration in `.env`
```env
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
XENDIT_SECRET_KEY=your_xendit_secret_key
```

---

## 🔐 Google Login Configuration
To enable Google Login, configure your Google OAuth credentials in `.env`:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```
Run the following command to clear and cache configuration:
```bash
php artisan config:clear
php artisan config:cache
```

---

## 🛠️ Admin Dashboard
Admins can manage products and orders through the dashboard accessible after logging in as an admin.
```bash
URL: http://127.0.0.1:8000/admin/dashboard
Username: admin@example.com
Password: Admin123
```

---

## 🔗 API Endpoint (Postman Collection)
To test the API, import the **EasyClick.postman_collection.json** file into Postman.

---

## 🎯 Contribution
1. Fork this repository
2. Create a new branch (`git checkout -b new-feature`)
3. Commit changes (`git commit -m 'Added feature X'`)
4. Push to branch (`git push origin new-feature`)
5. Create a pull request

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 📞 Contact
If you have any questions or issues, please contact us at [support@easyclick.com](mailto:support@easyclick.com).

