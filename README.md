# Intl Custom Translation Helper

Cette extension pour Visual Studio Code permet de voir en temps réel à quoi correspond une clé de traduction dans un composant <Translation /> qui n'est qu'un wrappper au dessus de <FormattedMessage>.

## Fonctionnalités

- Détecte et met en évidence les balises `<Translation>` dans vos fichiers `.js`, `.jsx`, `.ts`, et `.tsx`.
- Affiche les traductions correspondantes directement dans l'éditeur pour une référence rapide.
- Supporte la mise à jour dynamique des décorations lors de l'édition du texte.

## Installation

1. Ouvrez **Visual Studio Code**.
2. Allez dans **View > Extensions**.
3. Cherchez "`IntlCustomTranslationHelper`" et cliquez sur **Install**.
4. Redémarrez VSCode si nécessaire.

## Utilisation

Pour voir les traductions, ouvrez simplement un fichier `.js`, `.jsx`, `.ts`, ou `.tsx` qui contient des balises `<Translation id='...' />`. Les traductions s'afficheront automatiquement à côté des balises.
