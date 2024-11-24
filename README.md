# Document Management and RAG-based Q&A Application

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Testing](#testing)
6. [Links](#links)

## Description
The Document Management and RAG-based Q&A Application is designed to manage users, documents, and an ingestion process that generates embeddings for document retrieval in a Q&A setting. It features an Angular-based frontend for user interaction with backend services.

## Features
- **User Authentication**: Sign Up, Login, and Logout interfaces.
- **User Management**: Admin-only access for managing users and assigning roles.
- **Document Management**: Interface to upload and manage documents.
- **Ingestion Management**: Interface to trigger and monitor ingestion status.
- **Q&A Interface**: User-friendly interface for asking questions and receiving answers with relevant document excerpts.

## Installation
To install this project, follow these steps:

### Clone the repository:

# Architecture Overview

This diagram illustrates the architectural design of the project, showcasing the interplay between various components and technologies.

![Customer Journey Map (1)](https://github.com/user-attachments/assets/45ec3a18-3f44-435c-b9bc-85b1a26983c8)

**Key Components:**

1. **Client:** The frontend of the application, built using Angular, handles user interactions and displays data.
2. **Angular:** A powerful JavaScript framework for building robust and scalable web applications. It facilitates the creation of dynamic and interactive user interfaces.
3. **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications. It provides a structured approach to organizing code and handling API requests.
4. **TypeORM:** An object-relational mapper (ORM) that simplifies database interactions by providing a type-safe and intuitive way to work with data models. It connects the NestJS backend to the MongoDB database.
5. **MongoDB:** A flexible NoSQL database that excels in handling large volumes of unstructured data. It serves as the data storage layer for the application.
6. **Cloudinary:** A cloud-based platform designed to optimize, store, and deliver image and video assets efficiently. It integrates with a NestJS backend to handle raw document uploads.
7. **Google Analytics 4:** This is a web analytics service provided by Google that allows you to track user behavior and website performance. It's likely integrated to collect data on user interactions with your application.

**Data Flow:**

1. The **Client** sends requests to the **Angular** frontend, which then communicates with the **NestJS** backend via API calls.
2. The **NestJS** backend interacts with the **MongoDB** database using **TypeORM** to retrieve or store data as needed.
3. When document uploads are required, the **NestJS** backend integrates with the **Cloudinary** API to handle document processing and storage.
4. The processed documents are then made accessible via Cloudinary's API for efficient delivery to the **Client**.
5. Google Analytics 4 tracks user interactions and sends data to Google for analysis.

