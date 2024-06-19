

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

### 1. Set Up Azure Resources

#### a. Create an Azure Storage Account

1. Go to the [Azure Portal](https://portal.azure.com).
2. Click on "Create a resource" and select "Storage account".
3. Fill in the required details:
   - **Subscription:** Select your subscription.
   - **Resource Group:** Create a new resource group or select an existing one.
   - **Storage account name:** Provide a unique name.
   - **Region:** Choose a region close to your users.
   - **Performance:** Standard.
   - **Replication:** LRS (Locally-redundant storage) for development purposes, adjust based on your needs.
4. Click "Review + create" and then "Create".

#### b. Create a Blob Container

1. Once the storage account is created, navigate to it.
2. In the left menu, under "Data storage," click on "Containers".
3. Click "+ Container" to create a new container.
4. Provide a name (e.g., `uploads`) and set the Public access level to "Private (no anonymous access)".
5. Click "Create".

#### c. Configure Security Settings

1. In the storage account, go to "Encryption" under "Settings".
2. Ensure that encryption is enabled (it should be by default).

### 2. Backend Setup

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

### 3. Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd ../azure-share
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the React app:**
   ```sh
   npm start
   ```

### 4. Deploying to Azure Web Apps

#### a. Build the React App

1. **Build the React app:**
   ```sh
   npm run build
   ```

#### b. Deploy the Backend and Frontend to Azure

1. Ensure you have the Azure CLI installed and logged in.
2. Deploy the backend:
   ```sh
   cd backend
   az webapp up --name <Your-Backend-Web-App-Name> --resource-group <Your-Resource-Group-Name> --plan <Your-App-Service-Plan-Name>
   ```

3. Deploy the frontend:
   ```sh
   cd ../azure-share
   az webapp up --name <Your-Frontend-Web-App-Name> --resource-group <Your-Resource-Group-Name> --plan <Your-App-Service-Plan-Name>
   ```

#### c. Update Backend CORS Settings

Ensure your backend `server.js` allows requests from your deployed React app domain. Update the CORS settings accordingly.

#### d. Configure Environment Variables in Azure

1. Navigate to your Azure Web App in the Azure Portal.
2. Go to "Configuration" under "Settings".
3. Add the environment variables listed in your `.env` file for both backend and frontend applications.

### Project Structure

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

### Acknowledgments

- **Node.js**: For the backend server.
- **Express**: For simplifying the server setup.
- **Multer**: For handling file uploads.
- **Azure Storage Blob SDK**: For interacting with Azure Blob Storage.
- **Bitly API**: For shortening URLs.
- **React**: For the frontend application.
- **Axios**: For making HTTP requests from the frontend.

### Contact

If you have any questions or need further assistance, feel free to reach out!

Happy sharing! 🚀

