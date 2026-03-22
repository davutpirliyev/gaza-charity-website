"# 🇵🇸 GAZA CHARITY WEBSITE - COMPLETE DEPLOYMENT GUIDE

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Deploy to GitHub](#deploy-to-github)
4. [Clone to Your Laptop](#clone-to-laptop)
5. [Setup on Ubuntu 22.04](#setup-on-ubuntu)
6. [Run the Application](#run-application)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Gaza Charity Website** - A full-stack charity platform for Palestine/Gaza relief:
- **Frontend**: React + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: MongoDB
- **Features**: 
  - PayPal donation integration
  - Crypto wallet addresses (BTC, ETH, USDT)
  - Stories of children in Gaza
  - Impact statistics
  - Donation tracking

---

## 📦 Prerequisites

### What you'll need:
- GitHub account
- Ubuntu 22.04 LTS laptop
- Internet connection
- Terminal/command line knowledge

---

## 🚀 STEP 1: DEPLOY TO GITHUB

### Option A: Using Emergent's \"Save to GitHub\" Button (Easiest)

1. **In Emergent Chat Interface:**
   - Look for the \"Save to GitHub\" button in the chat
   - Click it and follow the prompts
   - Authorize Emergent to access your GitHub
   - Choose repository name: `gaza-charity-website`
   - Done! ✅

### Option B: Manual GitHub Deployment

1. **Create a new repository on GitHub:**
   ```
   - Go to https://github.com
   - Click \"+\" → \"New repository\"
   - Name: gaza-charity-website
   - Description: \"Charity website for Palestine/Gaza relief\"
   - Public or Private (your choice)
   - DON'T initialize with README
   - Click \"Create repository\"
   ```

2. **Download project files from Emergent:**
   - Use the VS Code editor in Emergent
   - Download all files manually OR
   - Use Emergent's download feature

3. **Push to GitHub from your local machine:**
   ```bash
   cd ~/gaza-charity-website
   git init
   git add .
   git commit -m \"Initial commit - Gaza charity website\"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gaza-charity-website.git
   git push -u origin main
   ```

---

## 💻 STEP 2: CLONE TO YOUR LAPTOP

### 1. Open Terminal on Ubuntu

```bash
# Navigate to your projects folder
cd ~/Projects
# Or create one if it doesn't exist
mkdir -p ~/Projects && cd ~/Projects
```

### 2. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/gaza-charity-website.git

# Enter the directory
cd gaza-charity-website

# Check files
ls -la
```

You should see:
```
backend/
frontend/
README.md
DEPLOYMENT_GUIDE.md
```

---

## 🔧 STEP 3: SETUP ON UBUNTU 22.04

### A. Install System Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.10+
sudo apt install python3 python3-pip python3-venv -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
sudo npm install -g yarn

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installations
python3 --version  # Should be 3.10+
node --version     # Should be 20.x
yarn --version     # Should be 1.22+
mongod --version   # Should be 7.0+
```

### B. Setup Backend

```bash
# Go to backend directory
cd ~/Projects/gaza-charity-website/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in your prompt

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install fastapi==0.110.1
pip install uvicorn==0.25.0
pip install python-dotenv==1.0.1
pip install motor==3.3.1
pip install pymongo==4.5.0
pip install pydantic==2.6.4
pip install python-multipart==0.0.9

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=gaza_charity
CORS_ORIGINS=http://localhost:3000
EOF

# Verify .env file
cat .env
```

### C. Setup Frontend

```bash
# Open NEW terminal (keep backend terminal open)
cd ~/Projects/gaza-charity-website/frontend

# Install dependencies
yarn install

# Create .env file
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

# Verify .env file
cat .env
```

---

## 🎮 STEP 4: RUN THE APPLICATION

### Terminal 1: Run Backend

```bash
# Make sure you're in backend directory
cd ~/Projects/gaza-charity-website/backend

# Activate virtual environment
source venv/bin/activate

# Run the server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

✅ **Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using StatReload
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Terminal 2: Run Frontend

```bash
# Make sure you're in frontend directory
cd ~/Projects/gaza-charity-website/frontend

# Start React app
yarn start
```

✅ **Expected output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Open Your Browser

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:8001/api/
3. **API Docs**: http://localhost:8001/docs

---

## 🧪 STEP 5: TEST YOUR WEBSITE

### Test Backend API

```bash
# In a third terminal, test the API
curl http://localhost:8001/api/

# Should return: {\"message\":\"Gaza Charity API\"}

# Test stories endpoint
curl http://localhost:8001/api/stories

# Test donation info
curl http://localhost:8001/api/donation-info
```

### Test Frontend
1. Open http://localhost:3000 in browser
2. You should see:
   - ✅ \"Stand With Gaza 🇵🇸\" hero section
   - ✅ Impact statistics
   - ✅ Stories of children
   - ✅ PayPal donation button
   - ✅ Crypto wallet addresses
   - ✅ Copy buttons working

---

## 🛠️ TROUBLESHOOTING

### Issue 1: Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8001
sudo lsof -i :8001

# Kill the process
sudo kill -9 <PID>

# Or use different port
uvicorn server:app --host 0.0.0.0 --port 8002 --reload
```

### Issue 2: MongoDB Not Running

**Error:** `Connection refused to MongoDB`

**Solution:**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Enable auto-start
sudo systemctl enable mongod
```

### Issue 3: Module Not Found

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall packages
pip install fastapi uvicorn motor pymongo pydantic python-dotenv python-multipart
```

### Issue 4: Frontend Won't Start

**Error:** `command not found: yarn`

**Solution:**
```bash
# Install yarn
sudo npm install -g yarn

# Or use npm instead
npm install
npm start
```

### Issue 5: CORS Errors in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Make sure backend .env has: `CORS_ORIGINS=http://localhost:3000`
- Make sure frontend .env has: `REACT_APP_BACKEND_URL=http://localhost:8001`
- Restart both backend and frontend

### Issue 6: Syntax Error in server.py

**Error:** `SyntaxError: unmatched '}'`

**Solution:**
```bash
# Re-download clean server.py from GitHub
# Or manually recreate the file (see code files section)
```

---

## 📁 PROJECT STRUCTURE

```
gaza-charity-website/
├── backend/
│   ├── server.py           # FastAPI backend
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Backend config (create this)
│   └── venv/              # Virtual environment (created by you)
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   ├── public/            # Static files
│   ├── package.json       # Node dependencies
│   ├── .env              # Frontend config (create this)
│   └── node_modules/     # Dependencies (installed by yarn)
├── README.md
└── DEPLOYMENT_GUIDE.md    # This file
```

---

## 🎯 QUICK COMMAND REFERENCE

### Start Everything (After Initial Setup)

**Terminal 1 - Backend:**
```bash
cd ~/Projects/gaza-charity-website/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 - Frontend:**
```bash
cd ~/Projects/gaza-charity-website/frontend
yarn start
```

### Stop Everything

- Backend: Press `Ctrl+C` in terminal 1
- Frontend: Press `Ctrl+C` in terminal 2

### Update Code from GitHub

```bash
cd ~/Projects/gaza-charity-website
git pull origin main
```

### Push Changes to GitHub

```bash
git add .
git commit -m \"Your commit message\"
git push origin main
```

---

## 🌟 NEXT STEPS

1. **Customize Donation Info:**
   - Edit `backend/server.py`
   - Update PayPal email and crypto wallets with your real addresses

2. **Add Real Videos:**
   - Edit `frontend/src/App.js`
   - Replace video placeholder with actual YouTube/Vimeo embeds

3. **Deploy to Production:**
   - Use Vercel for frontend
   - Use Railway/Render for backend
   - Use MongoDB Atlas for database

4. **Get a Domain:**
   - Buy domain (e.g., gazacharity.org)
   - Point to your deployed app

---

## 🆘 NEED HELP?

If you're stuck:
1. Check error messages carefully
2. Verify all commands ran successfully
3. Make sure MongoDB is running
4. Ensure ports 3000 and 8001 are free
5. Check that virtual environment is activated

---

## ✅ SUCCESS CHECKLIST

- [ ] GitHub repository created
- [ ] Code cloned to laptop
- [ ] Python 3.10+ installed
- [ ] Node.js 20.x installed
- [ ] Yarn installed
- [ ] MongoDB installed and running
- [ ] Backend virtual environment created
- [ ] Backend packages installed
- [ ] Backend .env file created
- [ ] Frontend dependencies installed
- [ ] Frontend .env file created
- [ ] Backend running on port 8001
- [ ] Frontend running on port 3000
- [ ] Website accessible in browser
- [ ] All features working (donations, stories, etc.)

---

**🇵🇸 Free Palestine! Your charity website is ready to help Gaza! 🕊️**
"