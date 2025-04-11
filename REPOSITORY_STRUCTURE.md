
# Repository Structure Plan

To meet the MVP requirement of having each component in a separate repository, we will organize our codebase into the following repositories:

## 1. proteuslab-frontend

**Repository URL**: `https://github.com/yourusername/proteuslab-frontend`

**Contains**:
- React application (current src/ directory)
- Frontend Dockerfile
- Frontend-specific documentation

**Steps to Create**:
1. Create a new repository on GitHub
2. Copy all frontend-related files:
   - src/
   - public/
   - index.html
   - vite.config.ts
   - tsconfig.json
   - tailwind.config.js
   - Dockerfile (frontend)
   - .env.example (frontend specific)
   - Other configuration files

## 2. proteuslab-api

**Repository URL**: `https://github.com/yourusername/proteuslab-api`

**Contains**:
- FastAPI backend application (current backend/ directory)
- API Dockerfile
- API-specific documentation

**Steps to Create**:
1. Create a new repository on GitHub
2. Copy all backend-related files:
   - backend/
   - backend/Dockerfile
   - backend/requirements.txt
   - backend/README.md
   - backend-specific .env.example

## 3. proteuslab-instagram-service

**Repository URL**: `https://github.com/yourusername/proteuslab-instagram-service`

**Contains**:
- Instagram service (current scripts/instagram-service directory)
- Instagram service Dockerfile
- Service-specific documentation

**Steps to Create**:
1. Create a new repository on GitHub
2. Copy all Instagram service-related files:
   - scripts/instagram-service/
   - scripts/instagram-service/Dockerfile
   - scripts/instagram-service/requirements.txt
   - scripts/instagram-service/README.md

## 4. proteuslab-main (Optional - for orchestration)

**Repository URL**: `https://github.com/yourusername/proteuslab-main`

**Contains**:
- docker-compose.yml for orchestrating all services
- Global .env.example file
- Global README.md with project overview
- ARCHITECTURE.md with system diagrams
- Scripts for setup and initialization

## Repository Communication Configuration

Each repository should include configuration for connecting to other services:

1. **Frontend** needs to know the API URL:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

2. **API** needs to know Instagram service details:
   ```
   INSTAGRAM_SERVICE_URL=http://instagram-service:5000
   ```

3. **Instagram Service** needs to know the API URL:
   ```
   API_URL=http://api:8000/api
   ```

## Deployment Configuration

For deploying the complete system, the docker-compose.yml file in the main repository will reference the individual Dockerfiles from each repository:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: https://github.com/yourusername/proteuslab-frontend.git
    # ... rest of the configuration

  api:
    build:
      context: https://github.com/yourusername/proteuslab-api.git
    # ... rest of the configuration
    
  instagram-service:
    build:
      context: https://github.com/yourusername/proteuslab-instagram-service.git
    # ... rest of the configuration
    
  # Database and other services
```

This structure ensures each component is in its own repository while maintaining the ability to deploy the entire system together.
