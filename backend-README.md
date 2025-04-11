
# Proteus.lab API

This repository contains the FastAPI backend application for Proteus.lab, a 3D printing service platform.

## Features

- RESTful API endpoints for products, orders, quotes, and user management
- Authentication and authorization
- File upload handling
- Email notifications
- Google Drive integration for quote files
- Instagram feed integration

## Technologies

- Python 3.10+
- FastAPI
- SQLAlchemy
- Alembic for migrations
- PostgreSQL
- Redis for caching
- Docker

## Development

### Prerequisites

- Python 3.10+
- PostgreSQL
- Redis (optional for development)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/proteuslab-api.git
   cd proteuslab-api
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (see .env.example)

5. Run migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Project Structure

```
app/
├── models/        # SQLAlchemy models
├── routes/        # API endpoints
├── schemas/       # Pydantic schemas
├── services/      # Business logic
└── utils/         # Utility functions
```

## API Documentation

When the server is running, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Docker

To build and run the API using Docker:

```bash
# Build the Docker image
docker build -t proteuslab-api .

# Run the container
docker run -p 8000:8000 proteuslab-api
```

## Environment Variables

See `.env.example` for a complete list of required environment variables.

## Testing

Run tests with pytest:

```bash
pytest
```

## Deployment

The application can be deployed as a Docker container. See the DevOps repository for orchestration with other services.
