# CoreTeam

CoreTeam is a robust employee management system that allows businesses to efficiently manage employees, track work progress, and handle payroll processing securely. The platform supports different user roles—Admin, HR, and Employee—ensuring smooth workflow operations.

## 🌐 Live Site
🔗 [CoreTeam Live Link](https://core-team-eb32c.web.app/)

## 🔑 Admin Credentials
- **Email:** shahadatsohel514@gmail.com  
- **Password:** Sohel1122@

## 🚀 Features

- **User Authentication**
  - Email & Password authentication
  - Google & GitHub login (Social login defaults to Employee role)
  - Role-based access (Employee, HR, Admin)
  - Image upload for profile picture

- **Dashboard (Private Routes Based on Role)**
  - Employee Dashboard
    - Work Submission (Task, Hours, Date) with Edit/Delete functionality
    - Monthly salary payment history
  - HR Dashboard
    - Employee List with verification toggle
    - Employee salary payment requests
    - Employee work progress tracking with filtering
  - Admin Dashboard
    - Manage all employees (Promote to HR, Fire Employee)
    - Salary adjustment (Only increase allowed)
    - Payroll approval system
    - Secure JWT authentication for role-specific API protection

- **Homepage**
  - Interactive Banner/Slider
  - Company Services Section
  - Testimonials (Carousel)
  - Additional Business-Relevant Sections

- **Navbar**
  - Conditional Login/Register or User Profile with Logout Option
  - Navigation Links: Dashboard (Private), Contact Us (Public)

- **Payment System**
  - Payroll request by HR, Admin approval required
  - Secure payment gateway integration (Optional Challenge)
  - Prevent duplicate salary payments in the same month/year

- **Contact Us Page**
  - Users can send messages
  - Admin can view and manage messages

## 📌 Technologies Used
- **Frontend:** React.js (Vite), Tailwind CSS (Alternative UI Library to Daisy UI)
- **State Management:** React Context API / Redux (if needed)
- **Database & Authentication:** Firebase (Firestore, Authentication, Storage)
- **Backend:** Node.js, Express.js
- **Security:** JWT for API route protection
- **UI Components:** Material Tailwind / ShadCN / Flowbite / Ant Design
- **Tables:** TanStack Table (For managing employee data efficiently)

## 🔥 Additional Features
- JWT token-based role verification for secured operations
- Pagination or Infinite Scroll for large datasets
- Summation of work hours based on filters
- Toggle between Table View and Card Grid View for better usability
- Headless UI for dropdowns & modals

## 📌 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-url.git
   ```
2. Navigate to the project folder:
   ```sh
   cd coreteam
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and configure Firebase credentials.
5. Start the development server:
   ```sh
   npm run dev
   ```

## 📩 Contribution
Feel free to contribute to CoreTeam by submitting pull requests or reporting issues!

---
**CoreTeam** - A complete workforce management solution 🚀