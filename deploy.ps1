Write-Host "🔄 Commitando alterações..."
git add .
git commit -m "Atualização automática"
git push origin main

Write-Host "🚀 Publicando no Vercel..."
vercel --prod --yes --name techtrend3
