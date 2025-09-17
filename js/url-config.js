// URL Configuration for TECHSHEQ Website
// This file manages clean URL routing and redirects

const URL_CONFIG = {
    // Base domain configuration
    LIVE_DOMAIN: 'www.techsheq.com',
    LIVE_DOMAIN_ALT: 'techsheq.com',
    
    // URL mappings for clean URLs
    URL_MAPPINGS: {
        // Clean URLs -> Actual file paths
        '/': 'pages/homepage_b2b_service_provider_platform.html',
        '/home': 'pages/homepage_b2b_service_provider_platform.html',
        '/services': 'pages/services_overview_two_pillar_architecture.html',
        '/industries': 'pages/industries_sector_specific_solutions.html',
        '/about': 'pages/about_sri_lankan_business_advantage.html',
        '/contact': 'pages/contact_discovery_call_booking.html',
        '/managed-it': 'pages/managed_it_services_flagship_service_detail.html'
    },
    
    // Redirect mappings for old URLs
    REDIRECT_MAPPINGS: {
        'pages/homepage_b2b_service_provider_platform.html': '/',
        'pages/services_overview_two_pillar_architecture.html': '/services',
        'pages/industries_sector_specific_solutions.html': '/industries',
        'pages/about_sri_lankan_business_advantage.html': '/about',
        'pages/contact_discovery_call_booking.html': '/contact',
        'pages/managed_it_services_flagship_service_detail.html': '/managed-it'
    }
};

// Check if we're on the live domain
function isLiveDomain() {
    const hostname = window.location.hostname;
    return hostname === URL_CONFIG.LIVE_DOMAIN || hostname === URL_CONFIG.LIVE_DOMAIN_ALT;
}

// Get clean URL for a given file path
function getCleanUrl(filePath) {
    if (!isLiveDomain()) {
        return filePath; // Return original path for local development
    }
    
    // Find the clean URL for this file path
    for (const [cleanUrl, actualPath] of Object.entries(URL_CONFIG.URL_MAPPINGS)) {
        if (actualPath === filePath) {
            return cleanUrl;
        }
    }
    
    return filePath; // Return original if no mapping found
}

// Get actual file path for a clean URL
function getActualPath(cleanUrl) {
    if (!isLiveDomain()) {
        return cleanUrl; // Return original for local development
    }
    
    return URL_CONFIG.URL_MAPPINGS[cleanUrl] || cleanUrl;
}

// Handle URL redirects
function handleUrlRedirects() {
    if (!isLiveDomain()) {
        return; // Only handle redirects on live domain
    }
    
    const currentPath = window.location.pathname;
    
    // Check if current path needs redirecting
    for (const [oldPath, newPath] of Object.entries(URL_CONFIG.REDIRECT_MAPPINGS)) {
        if (currentPath.includes(oldPath)) {
            // Redirect to clean URL
            window.history.replaceState({}, '', newPath);
            break;
        }
    }
}

// Initialize URL handling
document.addEventListener('DOMContentLoaded', function() {
    handleUrlRedirects();
});

// Export for use in other files
window.URL_CONFIG = URL_CONFIG;
window.getCleanUrl = getCleanUrl;
window.getActualPath = getActualPath;
window.isLiveDomain = isLiveDomain;
