// URL Helper Functions for TECHSHEQ Website
// This file provides helper functions for generating clean URLs

// Load URL configuration
if (typeof URL_CONFIG === 'undefined') {
    console.warn('URL_CONFIG not loaded. Please include url-config.js first.');
}

// Helper function to generate clean URLs for internal links
function getCleanUrl(filePath) {
    if (typeof getCleanUrl === 'function' && typeof URL_CONFIG !== 'undefined') {
        return window.getCleanUrl(filePath);
    }
    
    // Fallback for when URL_CONFIG is not available
    return filePath;
}

// Helper function to generate href attributes for links
function href(filePath) {
    return getCleanUrl(filePath);
}

// Helper function to generate action attributes for forms
function action(filePath) {
    return getCleanUrl(filePath);
}

// Helper function to generate src attributes for redirects
function src(filePath) {
    return getCleanUrl(filePath);
}

// Predefined clean URLs for easy use
const CLEAN_URLS = {
    HOME: '/',
    HOME_ALT: '/home',
    SERVICES: '/services',
    INDUSTRIES: '/industries',
    ABOUT: '/about',
    CONTACT: '/contact',
    MANAGED_IT: '/managed-it'
};

// Auto-update all internal links on page load
function updateInternalLinks() {
    if (typeof URL_CONFIG === 'undefined' || !isLiveDomain()) {
        return; // Only update on live domain
    }
    
    // Find all internal links
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip external links, anchors, and already clean URLs
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('/') || href.includes('mailto:') || href.includes('tel:')) {
            return;
        }
        
        // Convert to clean URL
        const cleanUrl = getCleanUrl(href);
        if (cleanUrl !== href) {
            link.setAttribute('href', cleanUrl);
        }
    });
    
    // Find all form actions
    const forms = document.querySelectorAll('form[action]');
    
    forms.forEach(form => {
        const action = form.getAttribute('action');
        
        // Skip external actions and already clean URLs
        if (action.startsWith('http') || action.startsWith('/')) {
            return;
        }
        
        // Convert to clean URL
        const cleanUrl = getCleanUrl(action);
        if (cleanUrl !== action) {
            form.setAttribute('action', cleanUrl);
        }
    });
}

// Initialize URL helpers
document.addEventListener('DOMContentLoaded', function() {
    updateInternalLinks();
});

// Export for use in other files
window.href = href;
window.action = action;
window.src = src;
window.CLEAN_URLS = CLEAN_URLS;
window.updateInternalLinks = updateInternalLinks;
