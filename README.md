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

![Customer Journey Map (2)](https://github.com/user-attachments/assets/83425d4f-d8de-40cb-b9c6-884f4efca36d)

**Key Components:**

1. **Client:** The frontend of the application, built using Angular, handles user interactions and displays data.
2. **Angular:** A powerful JavaScript framework for building robust and scalable web applications. It facilitates the creation of dynamic and interactive user interfaces.
3. **Google Analytics 4:** This is a web analytics service provided by Google that allows you to track user behavior and website performance. It's likely integrated to collect data on user interactions with your application.
4. **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications. It provides a structured approach to organizing code and handling API requests.
5. **TypeORM:** An object-relational mapper (ORM) that simplifies database interactions by providing a type-safe and intuitive way to work with data models. It connects the NestJS backend to the MongoDB database.
6. **MongoDB:** A flexible NoSQL database that excels in handling large volumes of unstructured data. It serves as the data storage layer for the application.
7. **Cloudinary:** A cloud-based platform designed to optimize, store, and deliver image and video assets efficiently. It integrates with a NestJS backend to handle raw document uploads.
8. **LangChain:** An AI framework that orchestrates the interaction between various components, including embeddings, vector stores, and large language models (LLMs).
9. **Hugging Face Inference Embeddings:** A service for generating embeddings (numerical representations of text data) using Hugging Face's models.
10. **Gemini Pro:** A large language model (LLM) that can be used for generating text, translating languages, and other natural language tasks.
11. **MemoryVectorStore:** A component that stores and retrieves embeddings, allowing the LLM to access and process information from the database.

**Data Flow and Interactions**

1. **Client to Angular:** The user interacts with the Angular-based frontend, triggering actions like making requests or submitting forms.
2. **Angular to NestJS:** Angular sends requests to the NestJS backend, which handles the business logic and data processing.
3. **NestJS to TypeORM:** NestJS interacts with the database using TypeORM to fetch or store data as needed.
4. **NestJS to Cloudinary:** NestJS interacts with Cloudinary to manage documents, uploading, or fetching them.
5. **NestJS to LangChain:** NestJS sends data to LangChain for processing and analysis.
6. **LangChain to Hugging Face Inference Embeddings:** LangChain sends document data to the Hugging Face service to generate embeddings.
7. **LangChain to MemoryVectorStore:** LangChain stores the generated embeddings in the MemoryVectorStore for later retrieval and analysis.
8. **LangChain to Gemini:** LangChain interacts with the Gemini LLM to perform tasks like text generation, translation, or summarization.
9. **LangChain to NestJS:** LangChain returns the processed data (e.g., generated text, embeddings) to NestJS for further processing or sending back to the client.
10. **NestJS to Angular:** NestJS sends the processed data or responses to Angular, which updates the user interface accordingly.
