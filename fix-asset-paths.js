// Asset Path Fix Script for TECHSHEQ Website
// This script fixes all relative asset paths to use absolute paths

const fs = require('fs');
const path = require('path');

// Files to process
const filesToProcess = [
    'index.html',
    'pages/homepage_b2b_service_provider_platform.html',
    'pages/about_sri_lankan_business_advantage.html',
    'pages/contact_discovery_call_booking.html',
    'pages/industries_sector_specific_solutions.html',
    'pages/managed_it_services_flagship_service_detail.html',
    'pages/services_overview_two_pillar_architecture.html'
];

// Asset path mappings
const assetMappings = {
    // CSS files
    'href="../css/main.css"': 'href="/css/main.css"',
    'href="css/main.css"': 'href="/css/main.css"',
    
    // JavaScript files
    'src="../js/': 'src="/js/',
    'src="js/': 'src="/js/',
    
    // Image files
    'src="../public/': 'src="/public/',
    'src="public/': 'src="/public/',
    
    // Other assets
    'href="../assets/': 'href="/assets/',
    'href="assets/': 'href="/assets/',
    'src="../assets/': 'src="/assets/',
    'src="assets/': 'src="/assets/'
};

// Process each file
filesToProcess.forEach(filePath => {
    try {
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;
            
            // Apply all asset mappings
            Object.entries(assetMappings).forEach(([oldPath, newPath]) => {
                if (content.includes(oldPath)) {
                    content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
                    modified = true;
                }
            });
            
            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Fixed asset paths in: ${filePath}`);
            } else {
                console.log(`ℹ️  No changes needed in: ${filePath}`);
            }
        } else {
            console.log(`❌ File not found: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
});

console.log('\n🎉 Asset path fixing completed!');
console.log('\n📋 Summary of changes:');
console.log('- All CSS files now use absolute paths (/css/main.css)');
console.log('- All JavaScript files now use absolute paths (/js/)');
console.log('- All image files now use absolute paths (/public/)');
console.log('- All other assets now use absolute paths (/assets/)');
console.log('\n✅ Your website should now load correctly regardless of URL structure!');
