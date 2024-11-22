## Data Scanner - MERN Stack Implementation

## Overview
This application is a data scanning tool built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It scans uploaded files for sensitive information such as PII (Personally Identifiable Information), PHI (Protected Health Information), and PCI (Payment Card Information), classifies them accordingly, and stores the results in a database.

## Features
- File upload and scanning capability
- Detection and classification of sensitive data types:
  - PII: PAN card numbers, US Social Security Numbers (SSN)
  - PHI: Medical record numbers, medical test results, health insurance information
  - PCI: Credit card numbers
- Secure storage of scan results in MongoDB
- User-friendly web interface for file uploads and scan results
- API endpoints for data management
- Ability to view scan history
- Option to delete scan records
- Docker support for easy deployment

## Project Structure
```
project-root/
├── client/                 # Frontend React application
│   ├── Dockerfile         # Frontend Docker configuration
│   ├── src/
│   │   ├── components/    # React components
│   │   
│   │   
│   │   
│   └── public/           # Static files
├── server/                # Backend Node.js application
│   ├── Dockerfile        # Backend Docker configuration
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
|   └── utils/          # Uploaded Images
└── docker-compose.yml    # Docker Compose configuration
```

## Installation and Setup

### Option 1: Local Development with npm

#### Backend Setup
```bash
cd server
npm install
# Create a .env file with your MongoDB connection string and other configurations
npm start
```

#### Frontend Setup
```bash
cd client
npm install
npm start
```

### Option 2: Docker Deployment

#### Prerequisites
- Docker
- Docker Compose

#### Running with Docker Compose
1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://mongo:27017/datascan
NODE_ENV=production
REACT_APP_API_URL=http://localhost:8000
```

3. Build and run the containers:
```bash
docker-compose up --build
```

This will:
- Build the frontend and backend images
- Start MongoDB container
- Start the backend service
- Start the frontend service
- Set up networking between containers

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Docker Commands
```bash
# Start all services
docker-compose up

# Start services in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs [service_name]

# Rebuild containers
docker-compose up --build

# Remove all containers and volumes
docker-compose down -v
```

## Environment Variables
Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

For Docker deployment, additional variables in root `.env`:
```
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGODB_URI=mongodb://mongo:27017/datascan
NODE_ENV=production
REACT_APP_API_URL=http://localhost:8000
```

## API Endpoints

### File Operations
- `POST /api/upload` - Upload and scan a file
- `GET /api/scans` - Retrieve all scan records
- `DELETE /api/scans/:id` - Delete a specific scan record


## Data Classification Patterns
The application uses regular expressions to identify:
- SSN: XXX-XX-XXXX format
- Credit Card Numbers: Major card provider formats
- PAN Card: Standard Indian PAN card format
- Medical Record Numbers: Common healthcare record formats


## Usage
1. Start the application using either npm or Docker
2. Navigate to `http://localhost:3000` in your browser
3. Use the upload form to scan files
4. View scan results in the dashboard
5. Manage scan records using the provided interface

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting Docker Deployment
1. If containers fail to start:
   - Check if ports 3000 or 5000 are already in use
   - Verify MongoDB connection string in .env
   - Check Docker logs for specific errors

2. If services can't connect:
   - Ensure all containers are running (`docker-compose ps`)
   - Check network configuration in docker-compose.yml
   - Verify environment variables are properly set

## License
This project is licensed under the MIT License - see the LICENSE file for details
