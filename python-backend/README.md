# BAIF Translation Platform Backend

A Python backend scaffold for the BAIF Translation Platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python** (version 3.8 or higher)
- **Poetry** (Python dependency manager). If you don't have it, you can install it by following the [official installation guide](https://python-poetry.org/docs/#installation).

## Setup

1.  **Configure Environment:**
    The application uses a `.env` file for configuration. An example file `.env.example` is provided. To get started quickly, just rename it:
    ```bash
    # In the 'python-backend' directory
    copy .env.example .env
    ```
    This will configure the application to use a simple SQLite database, which is perfect for local development and requires no extra setup.

    > **Note:** If you see a `psycopg.errors.ConnectionTimeout` error, it means the app is trying to connect to a PostgreSQL database that isn't available. The `.env` file is the correct way to solve this by pointing to a local SQLite file instead.

2.  **Install Dependencies:**
    Use Poetry to install the project dependencies. The `pydantic[email]` extra is required for email validation.
    ```bash
    poetry add "pydantic[email]"
    poetry install
    ```

3.  **Run the Application:**
    Activate the virtual environment and start the development server with live reload and detailed logging.
    ```bash
    poetry env activate
    uvicorn baif_translation.main:app --reload --port 8000 --log-level debug
    ```

## Features

- FastAPI application skeleton
- Upload endpoint for media/text files
- Translation job list endpoint
- Job detail endpoint
- Test coverage with pytest
