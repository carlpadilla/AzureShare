const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { BlobServiceClient, generateBlobSASQueryParameters, StorageSharedKeyCredential, BlobSASPermissions } = require('@azure/storage-blob');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const CONTAINER_NAME = 'uploads';
const BITLY_ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Change this to your frontend's domain or IP
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.options('*', cors()); // Enable pre-flight requests for all routes

app.post('/upload', upload.single('file'), async (req, res) => {
    const { expirationTime } = req.body;
    console.log('Upload endpoint hit');
    if (!req.file) {
        console.error('No file received');
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blobName = req.file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        console.log('Uploading file to Azure Blob Storage');
        await blockBlobClient.uploadData(req.file.buffer);
        const sasUrl = generateSasUrl(blockBlobClient, AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY, expirationTime);
        console.log('File uploaded successfully', sasUrl);

        const shortenedUrl = await shortenUrl(sasUrl);
        res.status(200).json({ url: shortenedUrl });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

function generateSasUrl(blockBlobClient, accountName, accountKey, expirationTime) {
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const sasOptions = {
        containerName: blockBlobClient.containerName,
        blobName: blockBlobClient.name,
        permissions: BlobSASPermissions.parse('r'), // Grant read permissions
        startsOn: new Date(new Date().valueOf() - 5 * 60 * 1000), // Set the start time to 5 minutes in the past
        expiresOn: new Date(new Date().valueOf() + expirationTime * 3600 * 1000) // Link valid for specified hours
    };

    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
    return `${blockBlobClient.url}?${sasToken}`;
}

async function shortenUrl(longUrl) {
    const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
        long_url: longUrl,
        domain: "bit.ly"
    }, {
        headers: {
            'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.link;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
