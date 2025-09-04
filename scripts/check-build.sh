#!/bin/bash
# Script de vérification du build Babine Vercel Starter

echo "🔍 Vérification du build Babine Vercel Starter..."
echo "=================================================="

# Vérification des dépendances
echo "📦 Vérification des dépendances..."
npm list --depth=0 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Dépendances installées correctement"
else
    echo "❌ Problème avec les dépendances"
    exit 1
fi

# Vérification TypeScript
echo "🔍 Vérification TypeScript..."
npm run type-check
if [ $? -eq 0 ]; then
    echo "✅ Types TypeScript valides"
else
    echo "❌ Erreurs TypeScript trouvées"
    exit 1
fi

# Build de production
echo "🏗️ Build de production..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build de production réussi"
else
    echo "❌ Échec du build de production"
    exit 1
fi

echo ""
echo "🎉 Tous les tests de build ont réussi !"
echo "📝 N'oubliez pas de configurer les variables d'environnement pour le déploiement"
echo "📄 Voir .env.example pour la liste des variables requises"