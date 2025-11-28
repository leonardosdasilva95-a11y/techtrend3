#!/usr/bin/env bash
set -e

echo "🔄 Commitando alterações..."
git add .
git commit -m "Atualização automática"
git push origin main

echo "🚀 Publicando no Vercel..."
vercel --prod --yes --name techtrend3
