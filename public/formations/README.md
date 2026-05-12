# Photos des formations — Label Retail

Déposez ici les photos d'illustration des fiches formation (catalogue
et pages détail). Le code (`lib/formations-data.ts`) référence ces
chemins via le champ `coverLocal` de chaque formation, par exemple :

- `videosurveillance.jpg`
- `alarme-anti-intrusion.jpg`
- `controle-acces.jpg`
- `systeme-pointage.jpg`
- `videophone.jpg`

## Conventions

- Format : JPG ou WebP, optimisé pour le web (≤ 250 Ko si possible).
- Ratio recommandé : 4:3 ou 16:9, largeur ≥ 1200 px.
- Privilégiez des photos d'apprenants représentatifs de votre clientèle
  (techniciens en formation, manipulation d'équipements, salles de
  travaux pratiques).

## Basculer du fallback Unsplash vers vos photos locales

Dans `app/formations/page.tsx` et `app/formations/[slug]/page.tsx`,
la propriété `src` du composant `<Image>` utilise `formation.cover`
(URL Unsplash). Pour utiliser vos photos locales, remplacez par
`formation.coverLocal` une fois les fichiers déposés ici.
