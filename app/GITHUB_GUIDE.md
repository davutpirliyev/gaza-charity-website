"# 📤 COMPLETE GITHUB DEPLOYMENT GUIDE

## 🎯 GOAL
Get your Gaza Charity Website from Emergent → GitHub → Your Ubuntu Laptop

---

## 🚀 METHOD 1: USING EMERGENT'S \"SAVE TO GITHUB\" (EASIEST - 2 MINUTES)

### Step 1: In Emergent Interface

1. **Look for the \"Save to GitHub\" button** in the Emergent chat interface
   - It's usually near the message input or in the toolbar
   
2. **Click \"Save to GitHub\"**
   
3. **Authorize Emergent** (first time only)
   - Grant Emergent permission to access your GitHub account
   
4. **Configure Repository**
   - Repository name: `gaza-charity-website`
   - Description: \"Charity website for Palestine/Gaza relief\"
   - Choose Public or Private
   - Click \"Create and Push\"

5. **✅ Done!** Your code is now on GitHub!

### Step 2: Clone to Your Laptop

```bash
# Open terminal on Ubuntu
cd ~/Projects

# Clone your repository
git clone https://github.com/YOUR_USERNAME/gaza-charity-website.git

# Enter directory
cd gaza-charity-website

# You should see all your files
ls -la
```

**✅ SUCCESS! Skip to the [Setup Section](#setup-on-your-laptop) below!**

---

## 🛠️ METHOD 2: MANUAL GITHUB DEPLOYMENT (15 MINUTES)

Use this if you don't see the \"Save to GitHub\" button.

### Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Log in** to your account
3. **Click the \"+\" icon** (top right) → \"New repository\"
4. **Fill in details:**
   - Repository name: `gaza-charity-website`
   - Description: `Charity website for Palestine/Gaza relief`
   - Choose: ☑️ Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license
5. **Click \"Create repository\"**

### Step 2: Download Files from Emergent

**Option A: Use Emergent's built-in VS Code**
1. Click the **VS Code icon** in Emergent
2. Navigate to `/app`
3. Right-click on the folder
4. Select \"Download\"
5. Save to your `~/Downloads` folder

**Option B: Download files individually**
In Emergent chat, I'll help you download specific files.

### Step 3: Push to GitHub from Your Laptop

```bash
# Go to your Downloads folder
cd ~/Downloads

# If you downloaded a zip file, extract it
unzip gaza-charity-website.zip
cd gaza-charity-website

# OR if files are in a folder named differently
cd gaza-charity-website  # adjust name as needed

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m \"Initial commit - Gaza charity website\"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/gaza-charity-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If GitHub asks for credentials:**
```bash
# Use Personal Access Token (PAT)
# Go to: https://github.com/settings/tokens
# Generate new token (classic)
# Copy the token
# Use it as your password when pushing
```

---

## 💻 SETUP ON YOUR LAPTOP

### Step 1: Navigate to Project

```bash
# If you cloned from GitHub
cd ~/Projects/gaza-charity-website

# OR if you pushed from Downloads
cd ~/Downloads/gaza-charity-website

# OR move it to Projects for better organization
mv ~/Downloads/gaza-charity-website ~/Projects/
cd ~/Projects/gaza-charity-website
```

### Step 2: Run Automated Setup (RECOMMENDED)

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

The script will automatically:
- ✅ Install Python, Node.js, Yarn, MongoDB
- ✅ Setup backend virtual environment
- ✅ Install all dependencies
- ✅ Create .env files
- ✅ Start MongoDB

### Step 3: Run Your Website

**Open Terminal 1 - Backend:**
```bash
cd ~/Projects/gaza-charity-website/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Open Terminal 2 - Frontend:**
```bash
cd ~/Projects/gaza-charity-website/frontend
yarn start
```

**Open Browser:**
- http://localhost:3000

---

## 🔄 ALTERNATIVE: MANUAL SETUP (If Script Fails)

### Install System Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install python3 python3-pip python3-venv -y

# Install Node.js
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
```

### Setup Backend

```bash
cd ~/Projects/gaza-charity-website/backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install packages
pip install --upgrade pip
pip install fastapi==0.110.1 uvicorn==0.25.0 python-dotenv==1.0.1 motor==3.3.1 pymongo==4.5.0 pydantic==2.6.4 python-multipart==0.0.9

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=gaza_charity
CORS_ORIGINS=http://localhost:3000
EOF
```

### Setup Frontend

```bash
cd ~/Projects/gaza-charity-website/frontend

# Install dependencies
yarn install

# Create .env file
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF
```

---

## 🧪 VERIFY EVERYTHING WORKS

### Test Backend

```bash
# Make sure backend is running, then in a new terminal:
curl http://localhost:8001/api/

# Should return: {\"message\":\"Gaza Charity API\"}

# Test stories
curl http://localhost:8001/api/stories

# Should return JSON with 4 stories
```

### Test Frontend

1. Open http://localhost:3000 in browser
2. You should see:
   - ✅ Green header \"Gaza Relief Fund\"
   - ✅ Hero section \"Stand With Gaza 🇵🇸\"
   - ✅ Impact statistics
   - ✅ 4 story cards with images
   - ✅ Donation section with PayPal button
   - ✅ Crypto wallet addresses
   - ✅ Copy buttons work

---

## 📝 DAILY WORKFLOW

### Starting Your Work

```bash
# Terminal 1 - Backend
cd ~/Projects/gaza-charity-website/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Terminal 2 - Frontend  
cd ~/Projects/gaza-charity-website/frontend
yarn start
```

### Making Changes

1. Edit files in your favorite editor (VS Code, PyCharm, etc.)
2. Changes auto-reload (hot reload enabled)
3. Test in browser

### Saving to GitHub

```bash
cd ~/Projects/gaza-charity-website

# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m \"Updated donation addresses\"

# Push to GitHub
git push origin main
```

### Pulling Updates (if you work from multiple computers)

```bash
cd ~/Projects/gaza-charity-website
git pull origin main
```

---

## 🆘 TROUBLESHOOTING

### Problem: \"git: command not found\"

```bash
sudo apt install git
```

### Problem: GitHub asks for username/password but rejects password

**Solution:** Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click \"Generate new token (classic)\"
3. Give it a name: \"gaza-charity-laptop\"
4. Select scopes: `repo` (all), `workflow`
5. Click \"Generate token\"
6. **Copy the token** (you won't see it again!)
7. When git asks for password, paste the token

### Problem: \"Permission denied (publickey)\"

**Solution:** Use HTTPS instead of SSH
```bash
# Check your remote
git remote -v

# If it shows git@github.com, change to HTTPS
git remote set-url origin https://github.com/YOUR_USERNAME/gaza-charity-website.git
```

### Problem: Files are different between Emergent and GitHub

**Solution:** Re-push from Emergent or re-download all files

### Problem: Port already in use

```bash
# Kill process on port 8001
sudo lsof -i :8001
sudo kill -9 <PID>

# Or use different port
uvicorn server:app --host 0.0.0.0 --port 8002 --reload
```

---

## ✅ SUCCESS CHECKLIST

Before you're done, verify:

- [ ] GitHub repository created and accessible
- [ ] Code cloned to `~/Projects/gaza-charity-website`
- [ ] All dependencies installed (Python, Node, Yarn, MongoDB)
- [ ] Backend `.env` file created
- [ ] Frontend `.env` file created
- [ ] Backend runs without errors on port 8001
- [ ] Frontend runs without errors on port 3000
- [ ] Website loads in browser at http://localhost:3000
- [ ] All sections visible (hero, stats, stories, donations)
- [ ] API calls work (check browser console - no errors)
- [ ] Copy buttons work for crypto wallets
- [ ] MongoDB is running (`sudo systemctl status mongod`)

---

## 🎓 LEARNING RESOURCES

### Git Basics
- https://try.github.io/
- https://learngitbranching.js.org/

### React
- https://react.dev/learn

### FastAPI
- https://fastapi.tiangolo.com/tutorial/

### MongoDB
- https://www.mongodb.com/docs/manual/tutorial/

---

## 🚀 NEXT STEPS

Once everything works locally:

1. **Customize the content**
   - Update donation wallet addresses
   - Add real stories
   - Change colors/branding

2. **Test thoroughly**
   - Try all features
   - Test on mobile (resize browser)
   - Share with friends for feedback

3. **Deploy to production**
   - Frontend: Vercel/Netlify
   - Backend: Railway/Render
   - Database: MongoDB Atlas

4. **Get a domain name**
   - GoDaddy, Namecheap, etc.
   - Something like: `gazarelief.org`

---

**🇵🇸 You're ready! Your charity website will help bring relief to Gaza! 🕊️**

If you get stuck at any point, check the error messages carefully and refer to the troubleshooting section. You got this! 💪
"