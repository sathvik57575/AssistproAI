# 🚀 AssistPro AI - Full Stack AI SaaS Platform

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-purple)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-orange)
![Gemini](https://img.shields.io/badge/Gemini-AI-red)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

🌐 **Live Demo:** https://assistpro-ai.vercel.app/

## 🌟 Overview

**AssistPro AI** is a production-ready AI SaaS platform that enables users to create, transform, analyze, and manage content using multiple AI-powered tools through a modern subscription-based web application.

The platform combines **AI content generation**, **image processing**, **resume analysis**, **community sharing**, **authentication**, **subscription management**, and **cloud-based media storage** into a single seamless experience.

---

# ✨ Features

## 🤖 AI Article Generator

Generate high-quality articles on any topic using Google's Gemini AI.

### Features

* Generate long-form AI articles
* Custom article length selection
* Dynamic prompt generation
* Real-time content creation
* Loading states and user feedback
* Creation history storage

---

## 🖼️ AI Image Generator

Generate unique AI-powered images from text prompts.

### Features

* Text-to-image generation
* Custom prompt support
* AI-generated artwork creation
* Cloud image storage
* Community publishing support
* User creation history

---

## 🎨 Background Removal

Automatically remove backgrounds from uploaded images.

### Features

* Image upload support
* Cloudinary AI background removal
* Instant processing
* Processed image storage
* Download-ready output

---

## ✂️ Object Removal

Remove unwanted objects from images using AI.

### Features

* AI-powered object detection
* Generative object removal
* Cloudinary Generative AI transformations
* High-quality image reconstruction
* Cloud storage integration

---

## 📝 AI Resume Reviewer

Upload resumes and receive AI-powered feedback.

### Features

* PDF upload support
* Resume text extraction
* PDF parsing
* AI-powered review generation
* Improvement suggestions
* Resume analysis storage

---

## 🏷️ AI Title Generator

Generate engaging and optimized titles using AI.

### Features

* Title suggestions
* SEO-friendly titles
* Content-specific recommendations
* Instant generation

---

# 👥 Community Platform

A complete community sharing system allowing users to showcase AI-generated creations.

## Features

### Public Publishing

Users can:

* Publish creations publicly
* Keep creations private
* Manage visibility settings

### Community Feed

* View public creations
* Explore community-generated content
* Browse AI-generated images

### Engagement System

* Like creations
* Unlike creations
* Real-time engagement tracking
* Community interaction features

---

# 🔐 Authentication & Authorization

Implemented using **Clerk Authentication**.

## Authentication Features

### User Management

* User Sign Up
* User Login
* User Logout
* Session Management
* Secure Authentication

### Route Protection

Protected:

* Dashboard
* Article Generator
* Image Generator
* Background Removal
* Object Removal
* Resume Review
* Community Features

### JWT Authorization

* Secure API access
* Token validation
* Backend authorization middleware
* Protected server routes

---

# 💎 Subscription System

Implemented a Free vs Premium subscription model.

## Free Plan

* Limited feature access
* Usage tracking
* Restricted premium tools

## Premium Plan

* Full access to AI tools
* Image generation
* Background removal
* Object removal
* Resume review

---

## Subscription Logic

Implemented using:

* Clerk Plans
* Clerk Protect Component
* Private Metadata
* Usage Tracking
* Feature Gating

---

# 📊 Dashboard

Personal dashboard for every user.

## Dashboard Features

### Analytics Cards

* Total Creations
* Active Plan Status

### User Activity

* Recent creations
* Creation history
* AI-generated content tracking

### Creation Management

* View previous generations
* Access generated content
* Manage creations

---

# 🗄️ Database Design

Built using **Neon PostgreSQL**.

## Creations Table

Stores:

* Creation ID
* User ID
* Prompt
* Content URL/Text
* Creation Type
* Publish Status
* Likes
* Created Date
* Updated Date

### Features

* PostgreSQL Arrays
* Relational Design
* Timestamp Tracking
* Content Management

---

# ☁️ Cloudinary Integration

Used Cloudinary for media management and AI image processing.

## Features

### Image Storage

* Secure cloud storage
* Optimized delivery
* Image hosting

### AI Transformations

* Background Removal
* Object Removal
* Image Optimization

### Folder Management

* Organized asset storage
* Project-specific folders
* Cloud-based delivery

---

# 🧠 AI Integrations

## Google Gemini API

Used for:

* Article Generation
* Resume Analysis
* Title Generation

### Features

* Prompt Engineering
* Dynamic Content Generation
* AI-powered Responses

---

## ClipDrop API

Used for:

* AI Image Generation
* Text-to-Image Conversion

---

# 📄 File Processing

## PDF Parsing

Implemented using:

* pdf-parse

### Capabilities

* Resume Upload
* Text Extraction
* Content Analysis
* AI Feedback Generation

---

# 📤 File Upload System

Implemented using:

## Multer

### Features

* Image Uploads
* PDF Uploads
* Multipart Form Data Handling
* Secure File Processing

---

# 🏗️ Backend Architecture

Built using:

* Node.js
* Express.js

## REST API Features

### AI Routes

* Generate Article
* Generate Image
* Remove Background
* Remove Object
* Review Resume
* Generate Title

### User Routes

* Get User Creations
* Get Community Creations
* Toggle Likes

### Middleware

* Clerk Middleware
* Authentication Middleware
* Authorization Logic
* Usage Tracking
* Error Handling

---

# 🎨 Frontend Architecture

Built using:

* React
* Vite
* React Router
* Axios
* Tailwind CSS

## UI Features

### Responsive Design

* Mobile Friendly
* Tablet Friendly
* Desktop Optimized

### Modern Components

* Sidebar Navigation
* Protected Layouts
* Dashboard Cards
* AI Tool Forms
* Community Feed
* User Profile Section

### User Experience

* Loading Indicators
* Toast Notifications
* Smooth Transitions
* Interactive UI

---

# 🔄 State Management

Implemented using:

* React Hooks
* useState
* useEffect
* Context API

### Features

* Authentication State
* User State
* Loading States
* Content Management

---

# 🔒 Security Features

## Backend Security

* JWT Authentication
* Protected API Routes
* Clerk Authorization
* Premium Feature Validation
* Secure User Identification

## Frontend Security

* Protected Routes
* Authentication Guards
* Conditional Rendering
* Secure Token Handling

---

# ⚡ API Communication

Implemented using:

## Axios

### Features

* Authenticated Requests
* Bearer Token Authorization
* Error Handling
* Async Data Fetching

---

# 🚀 Deployment

Successfully deployed to production.

## Frontend

* Vercel Deployment
* React SPA Routing Support
* Production Build Optimization

## Backend

* Express Deployment
* Environment Variables
* Secure API Configuration

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* Lucide React

## Backend

* Node.js
* Express.js

## Database

* Neon PostgreSQL

## Authentication

* Clerk

## AI Services

* Google Gemini API
* ClipDrop API

## Cloud Services

* Cloudinary

## File Processing

* Multer
* pdf-parse

## Deployment

* Vercel

---

# 🏆 Key Accomplishments

✅ Built a complete Full Stack AI SaaS Platform

✅ Implemented Authentication & Authorization

✅ Developed Subscription-Based Access Control

✅ Integrated Multiple AI APIs

✅ Created AI Image Processing Workflows

✅ Implemented Community Sharing Features

✅ Designed Relational Database Architecture

✅ Built Cloud Media Storage Pipelines

✅ Developed PDF Parsing & Resume Analysis

✅ Implemented Protected Routes & Middleware

✅ Created Responsive Production-Ready UI

✅ Successfully Deployed Full Application

---

# 📈 Project Highlights

* 6+ AI-powered tools
* Full SaaS architecture
* Authentication & subscriptions
* Cloud media processing
* Community engagement system
* PostgreSQL database design
* AI-powered content workflows
* Production deployment
* End-to-end full stack implementation

---

## 🎯 Final Result

AssistPro AI is a fully functional AI SaaS platform that combines content generation, image processing, resume analysis, cloud media management, authentication, subscriptions, and community engagement into a single production-ready application.

🚀 Built from scratch, deployed successfully, and designed with real-world SaaS architecture principles.

# 👨‍💻 Developer
**Sathvik Reddy**

Project Goal
Create a all in one production-ready AI SaaS platform for students, and professionals to automate content creation that brings together content generation, image creation, media transformation, resume analysis, cloud storage, authentication, and community engagement into a single intelligent ecosystem.

⭐ If you found this project interesting, consider giving the repository a star!
