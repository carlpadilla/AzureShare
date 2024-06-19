

# AzureShare

Welcome to AzureShare! This is a web application designed to help you securely upload files to Azure Blob Storage and generate a unique, time-limited link for sharing. You can also shorten the generated link for easy sharing. This project includes both a backend (Node.js with Express) and a frontend (React).

## Features

- **Secure File Uploads:** Upload files directly to Azure Blob Storage.
- **Time-Limited Links:** Generate links that expire after a specified duration (up to 24 hours).
- **Shortened URLs:** Use Bitly to shorten the generated links for easy sharing.
- **Responsive Design:** Mobile-friendly interface.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)
- Azure account
- Bitly account

## Getting Started

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the `backend` directory with the following content:**
   ```env
   AZURE_STORAGE_CONNECTION_STRING=<Your Azure Storage Connection String>
   AZURE_STORAGE_ACCOUNT_NAME=<Your Storage Account Name>
   AZURE_STORAGE_ACCOUNT_KEY=<Your Storage Account Key>
   BITLY_ACCESS_TOKEN=<Your Bitly Access Token>
   PORT=3001
   ```

4. **Run the backend server:**
   ```sh
   node server.js
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd ../share-safely
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the React app:**
   ```sh
   npm start
   ```

### Running the Application Locally

- The backend server should be running on `http://localhost:3001`.
- The frontend React app should be running on `http://localhost:3000`.

### Deploying to Azure Web Apps

1. **Build the React app:**
   ```sh
   npm run build
   ```

2. **Deploy the backend and frontend to Azure:**
   - Ensure you have the Azure CLI installed and logged in.
   - Use the following command to deploy:
     ```sh
     az webapp up --name <Your-Web-App-Name> --resource-group <Your-Resource-Group-Name> --plan <Your-App-Service-Plan-Name>
     ```

3. **Update the backend CORS settings to allow requests from your deployed React app domain.**

4. **Configure environment variables in Azure for both the frontend and backend applications.**

## Project Structure

```
project-root/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── node_modules/
│   ├── package.json
│   └── .gitignore
├── share-safely/
│   ├── public/
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   ├── .gitignore
│   ├── .env
│   └── README.md
```

## Acknowledgments

- **Node.js**: For the backend server.
- **Express**: For simplifying the server setup.
- **Multer**: For handling file uploads.
- **Azure Storage Blob SDK**: For interacting with Azure Blob Storage.
- **Bitly API**: For shortening URLs.
- **React**: For the frontend application.
- **Axios**: For making HTTP requests from the frontend.

## Contact

If you have any questions or need further assistance, feel free to reach out!

Happy sharing! 🚀

