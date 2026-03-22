import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { Heart, Copy, Check, DollarSign, Users, Home, Package } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [stories, setStories] = useState([]);
  const [donationInfo, setDonationInfo] = useState(null);
  const [copiedWallet, setCopiedWallet] = useState(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationData, setDonationData] = useState({
    donor_name: "",
    amount: "",
    currency: "USD",
    payment_method: "PayPal"
  });

  useEffect(() => {
    fetchStories();
    fetchDonationInfo();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API}/stories`);
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const fetchDonationInfo = async () => {
    try {
      const response = await axios.get(`${API}/donation-info`);
      setDonationInfo(response.data);
    } catch (error) {
      console.error("Error fetching donation info:", error);
    }
  };

  const copyToClipboard = (text, walletType) => {
    navigator.clipboard.writeText(text);
    setCopiedWallet(walletType);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/donations`, {
        ...donationData,
        amount: parseFloat(donationData.amount)
      });
      alert("Thank you for your donation intent! Please complete the payment using the links below.");
      setShowDonationForm(false);
      setDonationData({
        donor_name: "",
        amount: "",
        currency: "USD",
        payment_method: "PayPal"
      });
    } catch (error) {
      console.error("Error recording donation:", error);
      alert("Error recording donation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 fill-current" />
            <h1 className="text-2xl font-bold">Gaza Relief Fund</h1>
          </div>
          <button
            onClick={() => document.getElementById('donate').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-all"
            data-testid="header-donate-button"
          >
            Donate Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20" data-testid="hero-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6" data-testid="hero-title">
              Stand With Gaza 🇵🇸
            </h2>
            <p className="text-2xl mb-4 opacity-90">
              Help the Children of Palestine
            </p>
            <p className="text-xl mb-8 opacity-80">
              Every donation saves lives. Provide food, shelter, medical care, and hope to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.getElementById('donate').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-green-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition-all transform hover:scale-105"
                data-testid="hero-donate-button"
              >
                💚 Donate Now
              </button>
              <button
                onClick={() => document.getElementById('stories').scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition-all"
                data-testid="hero-stories-button"
              >
                Read Their Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white" data-testid="impact-stats-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-green-50 rounded-lg" data-testid="stat-families">
              <Users className="w-12 h-12 mx-auto mb-3 text-green-700" />
              <div className="text-4xl font-bold text-green-700 mb-2">50,000+</div>
              <div className="text-gray-600 font-semibold">Families Helped</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg" data-testid="stat-meals">
              <Package className="w-12 h-12 mx-auto mb-3 text-green-700" />
              <div className="text-4xl font-bold text-green-700 mb-2">2M+</div>
              <div className="text-gray-600 font-semibold">Meals Provided</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg" data-testid="stat-shelters">
              <Home className="w-12 h-12 mx-auto mb-3 text-green-700" />
              <div className="text-4xl font-bold text-green-700 mb-2">15,000+</div>
              <div className="text-gray-600 font-semibold">Emergency Shelters</div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Alert */}
      <section className="py-12 bg-red-50" data-testid="crisis-alert-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
            <h3 className="text-3xl font-bold text-red-600 mb-4" data-testid="crisis-title">🚨 Urgent: Humanitarian Crisis</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="mb-3"><strong>2.3 million people</strong> are in desperate need of humanitarian assistance</p>
                <p className="mb-3"><strong>1 million children</strong> lack access to clean water and food</p>
                <p className="mb-3"><strong>70% of homes</strong> have been destroyed or damaged</p>
              </div>
              <div>
                <p className="mb-3"><strong>Healthcare system</strong> on the brink of collapse</p>
                <p className="mb-3"><strong>Thousands of families</strong> living in refugee camps</p>
                <p className="mb-3"><strong>Winter is coming</strong> - urgent need for shelter and warmth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-16 bg-gray-50" data-testid="stories-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" data-testid="stories-title">Their Stories, Our Responsibility</h2>
            <p className="text-xl text-gray-600">Meet the children who need your help today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all" data-testid={`story-card-${index}`}>
                <img
                  src={story.image_url}
                  alt={story.name}
                  className="w-full h-64 object-cover"
                  data-testid={`story-image-${index}`}
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800" data-testid={`story-name-${index}`}>{story.name}</h3>
                      <p className="text-gray-600" data-testid={`story-age-${index}`}>Age {story.age} • {story.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed" data-testid={`story-content-${index}`}>{story.story}</p>
                  <button
                    onClick={() => document.getElementById('donate').scrollIntoView({ behavior: 'smooth' })}
                    className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    data-testid={`story-help-button-${index}`}
                  >
                    Help {story.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white" data-testid="video-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8" data-testid="video-title">See the Impact of Your Support</h2>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <p className="text-gray-600 text-lg mb-4">Video content placeholder</p>
                  <p className="text-gray-500 text-sm">Relief efforts and aid distribution videos</p>
                </div>
              </div>
              <p className="text-gray-600">Watch how your donations are making a real difference on the ground</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-16 bg-gradient-to-b from-green-50 to-white" data-testid="donate-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4" data-testid="donate-title">💚 Make Your Donation</h2>
              <p className="text-xl text-gray-600">Every contribution helps save lives and rebuild hope</p>
            </div>

            {donationInfo && (
              <div className="space-y-8">
                {/* PayPal Donation */}
                <div className="bg-white rounded-lg shadow-lg p-8" data-testid="paypal-section">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Donate via PayPal</h3>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <a
                      href={donationInfo.paypal_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
                      data-testid="paypal-donate-button"
                    >
                      Donate with PayPal
                    </a>
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Or send directly to:</p>
                      <p className="text-lg font-mono bg-gray-100 p-3 rounded" data-testid="paypal-email">{donationInfo.paypal_email}</p>
                    </div>
                  </div>
                </div>

                {/* Crypto Donation */}
                <div className="bg-white rounded-lg shadow-lg p-8" data-testid="crypto-section">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Donate with Cryptocurrency</h3>
                  <div className="space-y-4">
                    {/* Bitcoin */}
                    <div className="border border-gray-200 rounded-lg p-4" data-testid="btc-wallet">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">Bitcoin (BTC)</span>
                        <button
                          onClick={() => copyToClipboard(donationInfo.btc_wallet, 'btc')}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                          data-testid="copy-btc-button"
                        >
                          {copiedWallet === 'btc' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          <span>{copiedWallet === 'btc' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all" data-testid="btc-address">{donationInfo.btc_wallet}</p>
                    </div>

                    {/* Ethereum */}
                    <div className="border border-gray-200 rounded-lg p-4" data-testid="eth-wallet">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">Ethereum (ETH)</span>
                        <button
                          onClick={() => copyToClipboard(donationInfo.eth_wallet, 'eth')}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                          data-testid="copy-eth-button"
                        >
                          {copiedWallet === 'eth' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          <span>{copiedWallet === 'eth' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all" data-testid="eth-address">{donationInfo.eth_wallet}</p>
                    </div>

                    {/* USDT */}
                    <div className="border border-gray-200 rounded-lg p-4" data-testid="usdt-wallet">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">USDT (Tether)</span>
                        <button
                          onClick={() => copyToClipboard(donationInfo.usdt_wallet, 'usdt')}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                          data-testid="copy-usdt-button"
                        >
                          {copiedWallet === 'usdt' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          <span>{copiedWallet === 'usdt' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all" data-testid="usdt-address">{donationInfo.usdt_wallet}</p>
                    </div>
                  </div>
                </div>

                {/* Track Your Donation */}
                <div className="bg-green-50 rounded-lg p-6 text-center" data-testid="track-donation-section">
                  <p className="text-gray-700 mb-4">After making your donation, you can record it here for our records:</p>
                  <button
                    onClick={() => setShowDonationForm(!showDonationForm)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    data-testid="record-donation-button"
                  >
                    {showDonationForm ? 'Hide Form' : 'Record My Donation'}
                  </button>
                </div>

                {/* Donation Form */}
                {showDonationForm && (
                  <form onSubmit={handleDonationSubmit} className="bg-white rounded-lg shadow-lg p-8" data-testid="donation-form">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Record Your Donation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                        <input
                          type="text"
                          required
                          value={donationData.donor_name}
                          onChange={(e) => setDonationData({...donationData, donor_name: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter your name"
                          data-testid="donor-name-input"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Amount</label>
                        <input
                          type="number"
                          required
                          min="1"
                          step="0.01"
                          value={donationData.amount}
                          onChange={(e) => setDonationData({...donationData, amount: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter amount"
                          data-testid="amount-input"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Currency</label>
                        <select
                          value={donationData.currency}
                          onChange={(e) => setDonationData({...donationData, currency: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          data-testid="currency-select"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                          <option value="USDT">USDT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
                        <select
                          value={donationData.payment_method}
                          onChange={(e) => setDonationData({...donationData, payment_method: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          data-testid="payment-method-select"
                        >
                          <option value="PayPal">PayPal</option>
                          <option value="Bitcoin">Bitcoin</option>
                          <option value="Ethereum">Ethereum</option>
                          <option value="USDT">USDT</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                        data-testid="submit-donation-button"
                      >
                        Submit Donation Record
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact of Donations */}
      <section className="py-16 bg-white" data-testid="impact-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12" data-testid="impact-title">How Your Donation Helps</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-lg p-6" data-testid="impact-item-1">
                <img src="https://images.pexels.com/photos/6647010/pexels-photo-6647010.jpeg" alt="Food Aid" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">$50 - Emergency Food Pack</h3>
                <p className="text-gray-600">Provides a family with essential food supplies for one week</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6" data-testid="impact-item-2">
                <img src="https://images.pexels.com/photos/6646989/pexels-photo-6646989.jpeg" alt="Medical Care" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">$100 - Medical Treatment</h3>
                <p className="text-gray-600">Covers essential medical care for an injured child</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6" data-testid="impact-item-3">
                <img src="https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg" alt="Shelter" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">$200 - Emergency Shelter</h3>
                <p className="text-gray-600">Provides temporary shelter materials for a displaced family</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6" data-testid="impact-item-4">
                <img src="https://images.unsplash.com/photo-1759061729114-20124807fcd2" alt="Support" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">$500 - Comprehensive Aid</h3>
                <p className="text-gray-600">Complete support package including food, medical care, and shelter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8" data-testid="footer">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-8 h-8 fill-current text-red-500" />
              <h3 className="text-2xl font-bold">Gaza Relief Fund</h3>
            </div>
            <p className="text-gray-300 mb-4">Together, we can bring hope and relief to Gaza 🇵🇸</p>
            <p className="text-gray-400 text-sm">© 2025 Gaza Relief Fund. All donations go directly to humanitarian aid.</p>
            <div className="mt-6">
              <p className="text-green-400 font-semibold">Free Palestine 🕊️</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;