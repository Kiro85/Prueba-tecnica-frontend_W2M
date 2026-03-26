# 🔧 Application Set up

To start the web application, you must perform the checks and actions described below

# 🏗️ Installation

1. Ensure Node.js **22.12.0** or higher is installed.
2. Ensure Angular **20** is installed.
3. Clone the repository and enter the directory:

   ```bash
   git clone https://github.com/Kiro85/Prueba-tecnica-frontend_W2M.git
   ```

   ```bash
   cd Prueba-tecnica-frontend_W2M
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

# 🔌 Start development environment

Run the development server:

```bash
ng serve
```

Run json-server:

```bash
json-server --watch mocks/heroes.json --port 3000
```

> [!CAUTION]
> If you're using Windows, this command may not be compatible with **CMD**. I recommend using a compatible terminal such as **GitBash**

Open `http://localhost:4200/` in your browser.

# 🧪 Set up for testing

Run the following command:

```bash
ng test
```

# 📖 More documentation

## ☘️ [General Readme](README.md)

## 🏗️ [Structure readme](README-structure.md)
