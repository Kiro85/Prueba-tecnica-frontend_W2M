# 📁 Main project structure

```text
Prueba-tecnica-frontend_w2m/
├── node_modules/              
├── src/
│ ├───app
│ │   ├───components
│ │   │   ├───dynamics
│ │   │   │   ├───app-buttons
│ │   │   │   │   ├───app-button-create
│ │   │   │   │   ├───app-button-edit
│ │   │   │   │   ├───app-button-primary
│ │   │   │   │   ├───app-button-primary-form
│ │   │   │   │   ├───app-button-search
│ │   │   │   │   └───app-button-secondary
│ │   │   │   ├───app-cards
│ │   │   │   │   └───app-card-hero
│ │   │   │   ├───app-error-message
│ │   │   │   └───app-search-bar
│ │   │   └───statics
│ │   │       ├───app-banner
│ │   │       ├───app-forms
│ │   │       │   ├───app-form-hero-create
│ │   │       │   └───app-form-hero-edit
│ │   │       ├───app-modals
│ │   │       │   ├───app-modal-confirm-delete
│ │   │       │   ├───app-modal-error-message
│ │   │       │   └───app-modal-success-message
│ │   │       └───app-spinner
│ │   ├───models
│ │   ├───pages
│ │   │   └───page-home
│ │   ├───sections
│ │   │   ├───section-cards
│ │   │   └───section-footer
│ │   └───services
│ ├───assets
│ │   ├───heroes
│ │   └───social-media-icons
│ └───sass           
├── angular.json               
├── package.json               
├── tsconfig.json              
└── README.md                 
```


## 🏠 app/
This is the core directory of the application. It contains all UI components, sections, pages, and logic.

## 📦 app/components/
This folder groups all reusable UI components.  
It is divided into two main categories: **dynamic** and **static** components.


### 🔄 components/dynamics/
Components that interact with user input, trigger actions, or display dynamic content.

#### **app-buttons/**
A collection of button components, each with a specific purpose:

- **app-button-create** – Button used for creating new heroes.
- **app-button-edit** – Button used for editing existing heroes.
- **app-button-primary** – Main action button.
- **app-button-secondary** – Secondary action button.
- **app-button-primary-form** – Primary button specifically styled for form submission.
- **app-button-search** – Button paired with search features.

#### **app-cards/**
- **app-card-hero** – Displays hero information in a card format.

#### **app-error-message/**
Reusable component to display error alerts across the app.

#### **app-search-bar/**
Search bar component for filtering or querying content.


### 🖼️ components/statics/
Components that do not contain dynamic behavior. They provide structure or visual elements.

#### **app-banner/**
Displays a header or hero banner.

#### **app-forms/**
Contains form components:

- **app-form-hero-create** – Form for creating a new hero.
- **app-form-hero-edit** – Form for editing an existing hero.

#### **app-modals/**
Popup modals for various user interactions:

- **app-modal-confirm-delete** – Confirms before deleting a hero.
- **app-modal-error-message** – Shows error notifications.
- **app-modal-success-message** – Shows success confirmations.

#### **app-spinner/**
Loading spinner component used during async operations.


## 📘 app/models/
Defines the data models or TypeScript interfaces used across the application.  


## 📄 app/pages/
Contains all application pages.

- **page-home** – The main landing page of the application.


## 🧱 app/sections/
Sections are larger UI blocks composed of multiple components.

- **section-cards** – Displays a section containing multiple hero cards.
- **section-footer** – Footer section of the application.


## 🔧 app/services/
Contains service files responsible for:

- API calls  
- Data fetching  
- External communications
- format handling
- data storage
- cache

These services abstract business logic from UI components.


## 🖼️ assets/
Contains static files such as images and icons.

- **heroes** – Images used for hero cards.
- **social-media-icons** – Icons for social media links.


## 🎨 sass/
Stores all global styling files using SASS.  

# 📖 More documentation
## ☘️ [General Readme](README.md)
## 🔨 [Setup readme](README-setup.md)
