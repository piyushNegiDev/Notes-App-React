# SnapNotes

SnapNotes is a React notes application for creating, viewing, updating, and deleting personal notes. It uses Firebase Authentication for user accounts and Cloud Firestore for real-time note storage.

## Features

- User signup with name, email, password, and email verification
- Login restricted to verified email accounts
- Protected dashboard and single-note pages
- Real-time note syncing from Firestore
- Create notes with a title and content
- Edit existing notes from the dashboard or note details page
- Delete notes with confirmation prompts
- View each note on its own detail page
- Notes are scoped to the signed-in user's account
- Notes are sorted by latest update
- Light and dark theme toggle with local storage persistence
- Toast notifications for auth and note actions
- Responsive layout for desktop and mobile screens

## Tech Stack

- React
- Vite
- React Router
- Firebase Authentication
- Cloud Firestore
- Formik
- Yup
- React Toastify
- React Icons
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- npm
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
```

### Run the App

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/    Reusable UI components such as Header, Modal, Notes, and SingleNote
  context/       Auth and app context providers/hooks
  hooks/         App data and note delete helpers
  pages/         Signup, Login, and Dashboard pages
  routes/        Public and private route guards
```

## Main Routes

- `/` - Signup page
- `/login` - Login page
- `/dashboard` - Protected notes dashboard
- `/note/:id` - Protected single-note view
