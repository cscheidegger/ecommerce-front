
# Proteus.lab - 3D Printing Service Platform

This is the main repository for the Proteus.lab 3D printing service platform, an e-commerce solution for custom 3D printing services.

## Repository Structure

The project is divided into three separate repositories:

1. **[proteuslab-frontend](https://github.com/yourusername/proteuslab-frontend)**: React frontend application
2. **[proteuslab-api](https://github.com/yourusername/proteuslab-api)**: FastAPI backend application
3. **[proteuslab-devops](https://github.com/yourusername/proteuslab-devops)** (this repository): DevOps, orchestration, and microservices

This structure separates concerns and allows for independent development and deployment of each component.

## Overview

Proteus.lab is a full-featured platform that provides:

- Product catalog and 3D printing services
- Custom quotation system for 3D models
- Order management and tracking
- Portfolio showcase with Instagram integration
- Admin dashboard for content management

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Git
- Make (optional, for using Makefile commands)

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/proteuslab-devops.git
   cd proteuslab-devops
   ```

2. Create a `.env` file based on the `.env.example` template:
   ```bash
   cp .env.example .env
   ```

3. Start all services:
   ```bash
   make up
   # or
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - API Documentation: http://localhost:8000/docs

## Services

This DevOps repository orchestrates and coordinates all services:

- **Frontend**: React application for user interface
- **Backend API**: FastAPI application providing REST endpoints
- **Instagram Service**: Python microservice for Instagram integration
- **PostgreSQL**: Database storage
- **Redis**: Caching and session management

## Configuration

All services can be configured through environment variables in the `.env` file.
See `.env.example` for available options.

## Development

For development purposes, you can work on each repository independently:

- [proteuslab-frontend](https://github.com/yourusername/proteuslab-frontend): Frontend development
- [proteuslab-api](https://github.com/yourusername/proteuslab-api): Backend development
- This repository: DevOps and infrastructure

## Deployment

The application is containerized and can be deployed using Docker Compose or to a Kubernetes cluster.
Refer to the deployment documentation for more details.

## License

[MIT License](LICENSE)
