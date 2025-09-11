module.exports = {
  plugins: [
    'preset-default',
    // Transforme <style> .cls-1 {fill:#...} -> fill="#..." sur chaque élément
    'inlineStyles',
    'convertStyleToAttrs',
    // Garde les dégradés/masques mais corrige les IDs et références
    { name: 'prefixIds', params: { prefix: 'dash_' } },
    // Ne pas supprimer les fills/strokes vides (important pour RN)
    { name: 'removeUnknownsAndDefaults', params: { unknowns: false, defaults: false } },
    // Évite de virer viewBox
    { name: 'removeViewBox', active: false },
  ],
};