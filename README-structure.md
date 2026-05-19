# 📁 Main project structure

```text
Prueba-tecnica-frontend_w2m/
├── node_modules/
├── public/
│ └───assets
│     ├───heroes
│     └───social-media-icons              
├── src/
│ ├───app
│ │   ├───components
│ │   │   ├───dynamics
│ │   │   │   ├───app-button
│ │   │   │   ├───app-cards
│ │   │   │   │   └───app-card-hero
│ │   │   │   ├───app-messages
│ │   │   │   │   ├───app-message
│ │   │   │   │   └───app-message-snackbar
| |   |   |   └───app-modals
| |   |   |       └───app-modal-delete
│ │   │   └───statics
│ │   │       ├───app-banner
│ │   │       ├───app-forms
│ │   │       │   ├───app-form-hero-field
│ │   │       │   └───app-form-hero
│ │   │       ├───app-search-bar
│ │   │       └───app-spinner
| |   ├───constants
| |   ├───interfaces
| |   ├───shared
| |   │   └───pipes
│ │   ├───models
│ │   ├───pages
│ │   │   └───page-home
│ │   ├───sections
│ │   │   ├───section-cards
│ │   │   └───section-footer
│ │   └───services
| |       └───forms
│ └───styles
|    └───abstract           
├── angular.json               
├── package.json               
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── tsconfig.base.json    
├── README.md
├── README-setup.md
└── README-structure.md                
```


## 🏠 app/
This is the core directory of the application. It contains all UI components, sections, pages, and logic.

## 📦 app/components/
This folder groups all reusable UI components.  
It is divided into two main categories: **dynamic** and **static** components.


### 🔄 components/dynamics/
Components that interact with user input, trigger actions, or display dynamic content.

#### **app-buttons/**
A base button component that can be extended for various styles and functionalities.

#### **app-cards/**
- **app-card-hero** – Displays hero information in a card format.

#### **app-messages/**
Component for displaying messages, such as error or success notifications.

- **app-message** - Display a single message
- **app-message-snackbar** - Display a message in a snackbar format

### app-modals
Components for displaying modal dialogs for user interactions.

- **app-modal-delete** - Modal for confirming deletion actions.

### 🖼️ components/statics/
Components that do not contain dynamic behavior. They provide structure or visual elements.

#### **app-banner/**
Displays a header or hero banner.

#### **app-forms/**
Contains form components:

- **app-form-field** – A reusable form field component.
- **app-form-hero** – A form specifically for creating or editing hero information.

#### **app-search-bar/**
Search bar component for filtering or querying content.

#### **app-spinner/**
Loading spinner component used during async operations.


## 📘 app/models/
Defines the data models that arrived from the backend and are used across the application.

## 📗 interfaces/
Contains TypeScript interfaces used across the application.

## 🔒 constants/
Contains constant values used across the application, such a configuration settings.

## 🛜 shared/
Contains shared utilities, functions, or services that can be used across multiple components or sections.

### shared/pipes/
Contains custom pipes for transforming data in templates.

## 📄 app/pages/
Contains all application pages.

- **page-home** – The main landing page of the application.


## 🧱 app/sections/
Sections are larger UI blocks composed of multiple components.

- **section-cards** – Displays a section containing multiple hero cards.
- **section-footer** – Footer section of the application.


## 🔧 app/services/
Contains service files responsible for handling business logic, API calls, and state management.

These services abstract business logic from UI components.


## 🖼️ public/assets/
Contains static files such as images and icons.

- **heroes** – Images used for hero cards.
- **social-media-icons** – Icons for social media links.


## 🎨 styles/
Stores all global styling files using SASS.

### styles/abstract/
Contains custom styles, variables, and mixins.

## 🛡️ interceptors/
Contains HTTP interceptors for handling API requests and responses.

# 📖 More documentation
## ☘️ [General Readme](README.md)
## 🔨 [Setup readme](README-setup.md)
