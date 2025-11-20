// Mock Data with working images
const mockNFTs = [
    {
        id: 1,
        name: "Cosmic Dream #123",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
        creator: "digitalartist",
        price: 1.25,
        verified: true,
        auction: true,
        timeLeft: "02:15:30",
        highestBid: 2.1
    },
    {
        id: 2,
        name: "Neon Samurai",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        creator: "tokyoart",
        price: 0.89,
        verified: true,
        auction: false
    },
    {
        id: 3,
        name: "Abstract Emotions",
        image: "https://images.unsplash.com/photo-1620336655055-bd87c797d062?w=400&h=400&fit=crop",
        creator: "emotionart",
        price: 3.45,
        verified: false,
        auction: true,
        timeLeft: "01:45:12",
        highestBid: 4.2
    },
    {
        id: 4,
        name: "Cyber Punk Cat",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
        creator: "cyberartist",
        price: 0.75,
        verified: true,
        auction: false
    },
    {
        id: 5,
        name: "Digital Garden",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",
        creator: "naturedigital",
        price: 2.15,
        verified: true,
        auction: true,
        timeLeft: "04:20:45",
        highestBid: 2.8
    },
    {
        id: 6,
        name: "Quantum Mechanics",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop",
        creator: "scienceart",
        price: 1.95,
        verified: false,
        auction: false
    },
    {
        id: 7,
        name: "Neural Network",
        image: "https://images.unsplash.com/photo-1634979149798-e9a118734e93?w=400&h=400&fit=crop",
        creator: "aiartist",
        price: 4.25,
        verified: true,
        auction: true,
        timeLeft: "12:30:15",
        highestBid: 5.1
    },
    {
        id: 8,
        name: "Metaverse Portal",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
        creator: "metacreator",
        price: 3.75,
        verified: true,
        auction: false
    }
];

const mockCollections = [
    {
        id: 1,
        name: "CryptoPunks",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop",
        volume: "45.2K",
        items: 10000,
        floorPrice: 65.5
    },
    {
        id: 2,
        name: "Bored Ape Yacht Club",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
        volume: "32.1K",
        items: 10000,
        floorPrice: 89.2
    },
    {
        id: 3,
        name: "Art Blocks",
        image: "https://images.unsplash.com/photo-1620336655055-bd87c797d062?w=300&h=300&fit=crop",
        volume: "28.7K",
        items: 5000,
        floorPrice: 12.3
    },
    {
        id: 4,
        name: "Doodles",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop",
        volume: "15.6K",
        items: 10000,
        floorPrice: 8.9
    }
];

const mockCreators = [
    {
        id: 1,
        name: "Digital Da Vinci",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        sales: "2.4K",
        volume: "45.2 ETH",
        verified: true,
        trending: true
    },
    {
        id: 2,
        name: "Crypto Picasso",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        sales: "1.8K",
        volume: "32.1 ETH",
        verified: true,
        trending: true
    },
    {
        id: 3,
        name: "Neon Dreams",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        sales: "1.2K",
        volume: "28.7 ETH",
        verified: false,
        trending: false
    },
    {
        id: 4,
        name: "Quantum Artist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        sales: "956",
        volume: "15.6 ETH",
        verified: true,
        trending: false
    }
];

// State Management
let currentPage = 'home';
let isWalletConnected = false;
let isMobileMenuOpen = false;
let isFiltersOpen = false;
let currentViewMode = 'grid';
let likedNFTs = new Set();
let isDarkMode = false; // Start with light mode

// Initialize the app
function init() {
    renderNFTs();
    renderCollections();
    renderCreators();
    renderExploreNFTs();
    Lucide.createIcons();
    
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// Toggle Theme Function
function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        localStorage.setItem('theme', 'light');
    }
}

// Page Navigation
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    currentPage = page;
    
    // Close mobile menu when navigating
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Toggle Filters
function toggleFilters() {
    isFiltersOpen = !isFiltersOpen;
    const filtersPanel = document.getElementById('filtersPanel');
    filtersPanel.classList.toggle('active');
}

// Set View Mode
function setViewMode(mode) {
    currentViewMode = mode;
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const grid = document.getElementById('exploreGrid');
    if (mode === 'list') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    }
}

// Connect Wallet
function connectWallet() {
    const walletModal = document.getElementById('walletModal');
    walletModal.classList.add('active');
}

function connectMetaMask() {
    isWalletConnected = true;
    const walletText = document.getElementById('wallet-text');
    walletText.textContent = '0x742d...d4c5';
    
    const walletModal = document.getElementById('walletModal');
    walletModal.classList.remove('active');
    
    // Show success message
    showToast('Wallet connected successfully!', 'success');
}

function connectWalletConnect() {
    isWalletConnected = true;
    const walletText = document.getElementById('wallet-text');
    walletText.textContent = '0x8a3b...e9f2';
    
    const walletModal = document.getElementById('walletModal');
    walletModal.classList.remove('active');
    
    showToast('Wallet connected successfully!', 'success');
}

function connectCoinbase() {
    isWalletConnected = true;
    const walletText = document.getElementById('wallet-text');
    walletText.textContent = '0x5c1d...b7a8';
    
    const walletModal = document.getElementById('walletModal');
    walletModal.classList.remove('active');
    
    showToast('Wallet connected successfully!', 'success');
}

// Like NFT
function toggleLike(nftId) {
    if (likedNFTs.has(nftId)) {
        likedNFTs.delete(nftId);
    } else {
        likedNFTs.add(nftId);
    }
    renderNFTs();
    renderExploreNFTs();
}

// Buy NFT
function buyNFT(nftId) {
    const nft = mockNFTs.find(n => n.id === nftId);
    showToast(`Purchasing "${nft.name}" for ${nft.price} ETH!`, 'success');
}

// Handle File Upload
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('uploadPreview');
            preview.src = e.target.result;
            
            const uploadArea = input.closest('.upload-area');
            uploadArea.classList.add('has-file');
        };
        reader.readAsDataURL(file);
    }
}

// Handle Search
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    if (query.length > 2) {
        
        //  mock data
        const results = mockNFTs.filter(nft => 
            nft.name.toLowerCase().includes(query) || 
            nft.creator.toLowerCase().includes(query)
        );
        
        // Show search results (in a real app, this would be more sophisticated)
        if (results.length > 0) {
            showToast(`Found ${results.length} results for "${query}"`, 'success');
        } else {
            showToast(`No results found for "${query}"`, 'error');
        }
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 
        '<svg class="toast-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' :
        '<svg class="toast-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    
    toast.innerHTML = `
        ${icon}
        <div class="toast-message">${message}</div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Render NFTs
function renderNFTs() {
    const grid = document.getElementById('nftGrid');
    if (!grid) return;
    
    grid.innerHTML = mockNFTs.slice(0, 8).map(nft => `
        <div class="nft-card">
            <div class="nft-image">
                <img src="${nft.image}" alt="${nft.name}" class="nft-img">
                <div class="nft-overlay"></div>
                <div class="nft-actions">
                    <button class="action-btn ${likedNFTs.has(nft.id) ? 'liked' : ''}" onclick="toggleLike(${nft.id})">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${likedNFTs.has(nft.id) ? 'currentColor' : 'none'}">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
                ${nft.auction ? `
                <div class="auction-timer">
                    <div class="timer-content">
                        <div class="timer-left">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${nft.timeLeft}</span>
                        </div>
                        <div class="highest-bid">${nft.highestBid} ETH</div>
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="nft-content">
                <div class="nft-header">
                    <div class="nft-name">${nft.name}</div>
                    ${nft.verified ? `
                    <div class="verified-badge">
                        <div class="verified-dot"></div>
                    </div>
                    ` : ''}
                </div>
                <div class="nft-creator">
                    <div class="creator-avatar"></div>
                    <div class="creator-name">@${nft.creator}</div>
                </div>
                <div class="nft-footer">
                    <div class="price-info">
                        <div class="price-label">Current Price</div>
                        <div class="price-value">
                            <svg class="eth-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                                <path d="M12 1v22M12 1L5 7l7 6 7-6-7-6z"></path>
                            </svg>
                            <span>${nft.price} ETH</span>
                        </div>
                    </div>
                    <button class="buy-btn" onclick="buyNFT(${nft.id})">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Collections
function renderCollections() {
    const grid = document.getElementById('collectionsGrid');
    if (!grid) return;
    
    grid.innerHTML = mockCollections.map(collection => `
        <div class="collection-card">
            <div class="collection-image">
                <img src="${collection.image}" alt="${collection.name}" class="collection-img">
            </div>
            <div class="collection-content">
                <h3 class="collection-name">${collection.name}</h3>
                <div class="collection-stats">
                    <div class="stat">
                        <div class="stat-label">Volume</div>
                        <div class="stat-value">${collection.volume} ETH</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Floor Price</div>
                        <div class="stat-value floor-price">${collection.floorPrice} ETH</div>
                    </div>
                </div>
                <button class="view-collection-btn">
                    View Collection
                </button>
            </div>
        </div>
    `).join('');
}

// Render Creators
function renderCreators() {
    const grid = document.getElementById('creatorsGrid');
    if (!grid) return;
    
    grid.innerHTML = mockCreators.map(creator => `
        <div class="creator-card">
            <div class="creator-avatar-large">
                <img src="${creator.avatar}" alt="${creator.name}" class="creator-img">
                ${creator.verified ? `
                <div class="verified-badge-large">
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="3" fill="none">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                ` : ''}
                ${creator.trending ? `
                <div class="trending-badge">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    </svg>
                </div>
                ` : ''}
            </div>
            <h3 class="creator-name-large">${creator.name}</h3>
            <div class="creator-stats">
                <div class="creator-stat">
                    <span class="stat-name">Sales:</span>
                    <span class="stat-value-creator">${creator.sales}</span>
                </div>
                <div class="creator-stat">
                    <span class="stat-name">Volume:</span>
                    <span class="stat-value-creator volume">${creator.volume}</span>
                </div>
            </div>
            <button class="follow-btn">
                Follow
            </button>
        </div>
    `).join('');
}

// Render Explore NFTs
function renderExploreNFTs() {
    const grid = document.getElementById('exploreGrid');
    if (!grid) return;
    
    grid.innerHTML = mockNFTs.map(nft => `
        <div class="nft-card">
            <div class="nft-image">
                <img src="${nft.image}" alt="${nft.name}" class="nft-img">
                <div class="nft-overlay"></div>
                <div class="nft-actions">
                    <button class="action-btn ${likedNFTs.has(nft.id) ? 'liked' : ''}" onclick="toggleLike(${nft.id})">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${likedNFTs.has(nft.id) ? 'currentColor' : 'none'}">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
                ${nft.auction ? `
                <div class="auction-timer">
                    <div class="timer-content">
                        <div class="timer-left">
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${nft.timeLeft}</span>
                        </div>
                        <div class="highest-bid">${nft.highestBid} ETH</div>
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="nft-content">
                <div class="nft-header">
                    <div class="nft-name">${nft.name}</div>
                    ${nft.verified ? `
                    <div class="verified-badge">
                        <div class="verified-dot"></div>
                    </div>
                    ` : ''}
                </div>
                <div class="nft-creator">
                    <div class="creator-avatar"></div>
                    <div class="creator-name">@${nft.creator}</div>
                </div>
                <div class="nft-footer">
                    <div class="price-info">
                        <div class="price-label">Current Price</div>
                        <div class="price-value">
                            <svg class="eth-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                                <path d="M12 1v22M12 1L5 7l7 6 7-6-7-6z"></path>
                            </svg>
                            <span>${nft.price} ETH</span>
                        </div>
                    </div>
                    <button class="buy-btn" onclick="buyNFT(${nft.id})">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Carousel Functions
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Close wallet modal when clicking outside
document.addEventListener('click', function(event) {
    const walletModal = document.getElementById('walletModal');
    if (event.target === walletModal) {
        walletModal.classList.remove('active');
    }
});

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);
