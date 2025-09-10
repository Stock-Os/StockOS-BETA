import { Platform } from 'react-native';

// SVG asset paths mapping
const svgAssetPaths: Record<string, any> = {
  '3-4': require('../../assets/bodyfat/3-4.svg'),
  '5-7': require('../../assets/bodyfat/5-7.svg'),
  '8-12': require('../../assets/bodyfat/8-12.svg'),
  '13-17': require('../../assets/bodyfat/13-17.svg'),
  '18-23': require('../../assets/bodyfat/18-23.svg'),
  '24-29': require('../../assets/bodyfat/24-29.svg'),
  '30-34': require('../../assets/bodyfat/30-34.svg'),
  '35-39': require('../../assets/bodyfat/35-39.svg'),
  '40plus': require('../../assets/bodyfat/40plus.svg'),
};

export const loadSvgAsset = async (svgFile: string): Promise<string> => {
  try {
    // For React Native, try to fetch the bundled SVG content
    const assetPath = svgAssetPaths[svgFile];
    if (assetPath) {
      const response = await fetch(assetPath);
      const svgContent = await response.text();
      return svgContent;
    } else {
      console.warn(`SVG asset not found for: ${svgFile}`);
      return getSvgContent(svgFile); // fallback
    }
  } catch (error) {
    console.error(`Error loading SVG ${svgFile}:`, error);
    return getSvgContent(svgFile); // fallback
  }
};

// Fallback SVG content for mobile (will be replaced with actual content)
const getSvgContent = (svgFile: string): string => {
  const svgTemplates: Record<string, string> = {
    '3-4': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="12" fill="#fdbcb4"/>
      <rect x="40" y="47" width="20" height="25" rx="10" fill="#fdbcb4"/>
      <rect x="38" y="50" width="6" height="15" rx="3" fill="#fdbcb4"/>
      <rect x="56" y="50" width="6" height="15" rx="3" fill="#fdbcb4"/>
      <rect x="42" y="72" width="6" height="20" rx="3" fill="#fdbcb4"/>
      <rect x="52" y="72" width="6" height="20" rx="3" fill="#fdbcb4"/>
    </svg>`,
    '5-7': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="12" fill="#fdcab4"/>
      <rect x="39" y="47" width="22" height="26" rx="11" fill="#fdcab4"/>
      <rect x="37" y="50" width="7" height="16" rx="3.5" fill="#fdcab4"/>
      <rect x="56" y="50" width="7" height="16" rx="3.5" fill="#fdcab4"/>
      <rect x="42" y="73" width="6" height="20" rx="3" fill="#fdcab4"/>
      <rect x="52" y="73" width="6" height="20" rx="3" fill="#fdcab4"/>
    </svg>`,
    '8-12': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="13" fill="#fed8b4"/>
      <rect x="38" y="47" width="24" height="28" rx="12" fill="#fed8b4"/>
      <rect x="36" y="50" width="8" height="17" rx="4" fill="#fed8b4"/>
      <rect x="56" y="50" width="8" height="17" rx="4" fill="#fed8b4"/>
      <rect x="42" y="75" width="6" height="19" rx="3" fill="#fed8b4"/>
      <rect x="52" y="75" width="6" height="19" rx="3" fill="#fed8b4"/>
    </svg>`,
    '13-17': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="13" fill="#fee6b4"/>
      <rect x="37" y="47" width="26" height="30" rx="13" fill="#fee6b4"/>
      <rect x="35" y="50" width="9" height="18" rx="4.5" fill="#fee6b4"/>
      <rect x="56" y="50" width="9" height="18" rx="4.5" fill="#fee6b4"/>
      <rect x="41" y="77" width="7" height="18" rx="3.5" fill="#fee6b4"/>
      <rect x="52" y="77" width="7" height="18" rx="3.5" fill="#fee6b4"/>
    </svg>`,
    '18-23': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="14" fill="#fef4b4"/>
      <rect x="36" y="47" width="28" height="32" rx="14" fill="#fef4b4"/>
      <rect x="34" y="50" width="10" height="19" rx="5" fill="#fef4b4"/>
      <rect x="56" y="50" width="10" height="19" rx="5" fill="#fef4b4"/>
      <rect x="40" y="79" width="8" height="17" rx="4" fill="#fef4b4"/>
      <rect x="52" y="79" width="8" height="17" rx="4" fill="#fef4b4"/>
    </svg>`,
    '24-29': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="14" fill="#f4e6b4"/>
      <rect x="35" y="47" width="30" height="34" rx="15" fill="#f4e6b4"/>
      <rect x="33" y="50" width="11" height="20" rx="5.5" fill="#f4e6b4"/>
      <rect x="56" y="50" width="11" height="20" rx="5.5" fill="#f4e6b4"/>
      <rect x="39" y="81" width="9" height="16" rx="4.5" fill="#f4e6b4"/>
      <rect x="52" y="81" width="9" height="16" rx="4.5" fill="#f4e6b4"/>
    </svg>`,
    '30-34': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="15" fill="#f0d8b4"/>
      <rect x="34" y="47" width="32" height="36" rx="16" fill="#f0d8b4"/>
      <rect x="32" y="50" width="12" height="21" rx="6" fill="#f0d8b4"/>
      <rect x="56" y="50" width="12" height="21" rx="6" fill="#f0d8b4"/>
      <rect x="38" y="83" width="10" height="15" rx="5" fill="#f0d8b4"/>
      <rect x="52" y="83" width="10" height="15" rx="5" fill="#f0d8b4"/>
    </svg>`,
    '35-39': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="15" fill="#eccab4"/>
      <rect x="33" y="47" width="34" height="38" rx="17" fill="#eccab4"/>
      <rect x="31" y="50" width="13" height="22" rx="6.5" fill="#eccab4"/>
      <rect x="56" y="50" width="13" height="22" rx="6.5" fill="#eccab4"/>
      <rect x="37" y="85" width="11" height="14" rx="5.5" fill="#eccab4"/>
      <rect x="52" y="85" width="11" height="14" rx="5.5" fill="#eccab4"/>
    </svg>`,
    '40plus': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="16" fill="#e8bcb4"/>
      <rect x="32" y="47" width="36" height="40" rx="18" fill="#e8bcb4"/>
      <rect x="30" y="50" width="14" height="23" rx="7" fill="#e8bcb4"/>
      <rect x="56" y="50" width="14" height="23" rx="7" fill="#e8bcb4"/>
      <rect x="36" y="87" width="12" height="13" rx="6" fill="#e8bcb4"/>
      <rect x="52" y="87" width="12" height="13" rx="6" fill="#e8bcb4"/>
    </svg>`,
  };
  
  return svgTemplates[svgFile] || '';
};