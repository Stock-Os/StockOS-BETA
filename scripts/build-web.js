#!/usr/bin/env node

/**
 * Build Web Script for Stock OS
 * Builds the application for web deployment as PWA
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌐 Building Stock OS for Web...\n');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Build for web
  console.log('📦 Building web bundle...');
  execSync('npx expo export --platform web', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  // Create deployment info
  const deploymentInfo = {
    buildTime: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.2',
    platform: 'web',
    type: 'PWA'
  };
  
  fs.writeFileSync(
    path.join('dist', 'deployment-info.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log('\n✅ Web build completed successfully!');
  console.log('📁 Build files are in the "dist" directory');
  console.log('🚀 Ready for deployment to:');
  console.log('   - Netlify: Drag & drop dist folder');
  console.log('   - Vercel: vercel --prod dist');
  console.log('   - Firebase: firebase deploy');
  console.log('   - GitHub Pages: Upload dist contents');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}