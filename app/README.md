"# 🇵🇸 Gaza Charity Website

A full-stack charity platform for Palestine/Gaza relief efforts, enabling donations via PayPal and cryptocurrency while sharing impactful stories of children in need.

![Gaza Charity](https://img.shields.io/badge/Charity-Gaza%20Relief-green)
![React](https://img.shields.io/badge/React-19.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)

## 🌟 Features

- **💰 Multiple Donation Methods**
  - PayPal integration
  - Bitcoin (BTC) wallet
  - Ethereum (ETH) wallet
  - USDT (Tether) wallet
  - Copy-to-clipboard functionality

- **📖 Impactful Stories**
  - Real stories of children in Gaza
  - Photos and testimonials
  - Emotional connection with donors

- **📊 Impact Statistics**
  - Families helped
  - Meals provided
  - Emergency shelters
  - Real-time updates

- **🎨 Modern UI/UX**
  - Responsive design
  - Tailwind CSS styling
  - Smooth scrolling
  - Interactive elements

## 🏗️ Tech Stack

### Frontend
- React 19.0
- Tailwind CSS
- Axios for API calls
- Lucide React icons
- React Router DOM

### Backend
- FastAPI (Python)
- Motor (Async MongoDB driver)
- Pydantic for data validation
- Uvicorn ASGI server

### Database
- MongoDB 7.0

## 📦 Project Structure

```
gaza-charity-website/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies (full)
│   ├── requirements-minimal.txt # Python dependencies (minimal)
│   ├── .env.example          # Environment variables template
│   └── .env                  # Environment config (create this)
│
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styles
│   │   └── index.js          # Entry point
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   ├── .env.example         # Environment variables template
│   └── .env                 # Environment config (create this)
│
├── README.md                 # This file
└── DEPLOYMENT_GUIDE.md      # Detailed deployment instructions
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 20.x
- Yarn 1.22+
- MongoDB 7.0+
- Ubuntu 22.04 LTS (or similar Linux)

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/gaza-charity-website.git
cd gaza-charity-website
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements-minimal.txt

# Create .env file
cp .env.example .env

# Start MongoDB (if not running)
sudo systemctl start mongod

# Run backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend will run on: http://localhost:8001

### 3. Setup Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies
yarn install

# Create .env file
cp .env.example .env

# Run frontend
yarn start
```

Frontend will run on: http://localhost:3000

## 🌐 API Endpoints

### GET `/api/`
Health check endpoint
```json
{ \"message\": \"Gaza Charity API\" }
```

### GET `/api/stories`
Get all stories of children in Gaza
```json
[
  {
    \"id\": \"uuid\",
    \"name\": \"Fatima\",
    \"age\": 8,
    \"location\": \"Gaza City\",
    \"story\": \"Story text...\",
    \"image_url\": \"https://...\",
    \"timestamp\": \"2025-01-01T00:00:00Z\"
  }
]
```

### GET `/api/donation-info`
Get donation information (PayPal and crypto wallets)
```json
{
  \"id\": \"uuid\",
  \"paypal_link\": \"https://www.paypal.com/donate\",
  \"paypal_email\": \"donations@gazacharity.org\",
  \"btc_wallet\": \"bc1q...\",
  \"eth_wallet\": \"0x...\",
  \"usdt_wallet\": \"TRC20: ...\"
}
```

### POST `/api/donations`
Record a donation
```json
{
  \"donor_name\": \"John Doe\",
  \"amount\": 100.00,
  \"currency\": \"USD\",
  \"payment_method\": \"PayPal\"
}
```

### GET `/api/donations`
Get all recorded donations

## 🎨 Customization

### Update Donation Information

Edit `backend/server.py` → `get_donation_info()` function:
```python
return {
    \"paypal_email\": \"YOUR_PAYPAL_EMAIL\",
    \"btc_wallet\": \"YOUR_BTC_WALLET\",
    \"eth_wallet\": \"YOUR_ETH_WALLET\",
    \"usdt_wallet\": \"YOUR_USDT_WALLET\"
}
```

### Update Stories

Edit `backend/server.py` → `get_stories()` function to add/modify stories.

### Change Color Scheme

Edit `frontend/src/App.js` and modify Tailwind classes:
- Green theme: `bg-green-700`, `text-green-600`
- Change to blue: `bg-blue-700`, `text-blue-600`

## 🧪 Testing

### Test Backend
```bash
# Test API endpoints
curl http://localhost:8001/api/
curl http://localhost:8001/api/stories
curl http://localhost:8001/api/donation-info

# View API documentation
open http://localhost:8001/docs
```

### Test Frontend
1. Open http://localhost:3000
2. Click \"Donate Now\" buttons
3. Test copy-to-clipboard for crypto wallets
4. Navigate through sections
5. Test responsive design (resize browser)

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1920px+)

## 🔒 Environment Variables

### Backend `.env`
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=gaza_charity
CORS_ORIGINS=http://localhost:3000
```

### Frontend `.env`
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🚢 Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### Quick Deploy Options:

**Frontend:**
- Vercel (recommended)
- Netlify
- GitHub Pages

**Backend:**
- Railway
- Render
- Heroku
- DigitalOcean

**Database:**
- MongoDB Atlas (cloud)

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check if port 8001 is free
sudo lsof -i :8001

# Activate virtual environment
source venv/bin/activate
```

### Frontend won't start
```bash
# Clear cache
rm -rf node_modules
yarn install

# Check if port 3000 is free
sudo lsof -i :3000
```

### CORS errors
- Verify backend `.env` has correct `CORS_ORIGINS`
- Verify frontend `.env` has correct `REACT_APP_BACKEND_URL`
- Restart both services

## 📝 License

This project is open source and available for humanitarian purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💝 Support the Cause

This website helps raise funds for Palestine/Gaza relief. Every donation counts!

### Ways to Donate:
- 💳 **PayPal**: donations@gazacharity.org
- ₿ **Bitcoin**: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
- ⟠ **Ethereum**: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
- 💵 **USDT**: TRC20: TNDTZVbY7h3xJJCJZrG9YM8SRMJzjLXzKL

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**🇵🇸 Free Palestine! Stand with Gaza! 🕊️**

Made with ❤️ for humanitarian relief
"