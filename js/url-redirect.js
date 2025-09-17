// TECHSHEQ URL Redirect Solution
// This script handles URL redirects and clean URL routing

(function() {
    'use strict';
    
    // URL mapping configuration
    const URL_MAPPINGS = {
        // Old URLs -> Clean URLs
        'pages/homepage_b2b_service_provider_platform.html': '/',
        'pages/services_overview_two_pillar_architecture.html': '/services',
        'pages/industries_sector_specific_solutions.html': '/industries',
        'pages/about_sri_lankan_business_advantage.html': '/about',
        'pages/contact_discovery_call_booking.html': '/contact',
        'pages/managed_it_services_flagship_service_detail.html': '/managed-it',
        'index.html': '/'
    };
    
    // Check if we're on the live domain
    function isLiveDomain() {
        const hostname = window.location.hostname;
        return hostname === 'www.techsheq.com' || hostname === 'techsheq.com';
    }
    
    // Get current path without domain
    function getCurrentPath() {
        return window.location.pathname;
    }
    
    // Check if current URL needs redirecting
    function needsRedirect() {
        if (!isLiveDomain()) {
            return false; // Only redirect on live domain
        }
        
        const currentPath = getCurrentPath();
        
        // Check if current path matches any old URL pattern
        for (const [oldUrl, newUrl] of Object.entries(URL_MAPPINGS)) {
            if (currentPath.includes(oldUrl)) {
                return newUrl;
            }
        }
        
        return false;
    }
    
    // Perform redirect
    function performRedirect(newUrl) {
        if (newUrl) {
            // Use replaceState to avoid adding to browser history
            window.history.replaceState({}, '', newUrl);
            
            // Optional: Show a message to user
            console.log(`TECHSHEQ: Redirected to clean URL: ${newUrl}`);
        }
    }
    
    // Update all internal links to use clean URLs
    function updateInternalLinks() {
        if (!isLiveDomain()) {
            return; // Only update on live domain
        }
        
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip external links, anchors, and already clean URLs
            if (href.startsWith('http') || href.startsWith('#') || href.startsWith('/') || 
                href.includes('mailto:') || href.includes('tel:')) {
                return;
            }
            
            // Convert to clean URL
            for (const [oldUrl, newUrl] of Object.entries(URL_MAPPINGS)) {
                if (href.includes(oldUrl)) {
                    link.setAttribute('href', newUrl);
                    break;
                }
            }
        });
    }
    
    // Initialize URL redirect system
    function init() {
        // Check if current page needs redirecting
        const redirectUrl = needsRedirect();
        if (redirectUrl) {
            performRedirect(redirectUrl);
        }
        
        // Update internal links
        updateInternalLinks();
        
        // Update links when new content is loaded (for dynamic content)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    updateInternalLinks();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for global access
    window.TECHSHEQ_URL_REDIRECT = {
        isLiveDomain: isLiveDomain,
        needsRedirect: needsRedirect,
        performRedirect: performRedirect,
        updateInternalLinks: updateInternalLinks
    };
    
})();
