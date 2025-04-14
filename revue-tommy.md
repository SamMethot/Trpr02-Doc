# Revue du code de Tommy

Cette revue de code a été faite par Samuel Méthot

## Setup de l'application

Tommy a fait l'initialisation du projet et l'initialisation du routeur a partir des commandes suivantes :

```bash
npm init vue@3
npm run dev
```
Tommy a également ajouté des dossiers comme router, services ainsi que de modifié les dossiers pour rendre les prochaines étapes de codage plus faciles. Parfait !

## Ajout du Navbar

Tommy a parfaitement ajouter la Navbar dans le fichier App.vue ainsi que d'ajouter le Bootstrap dans le fichier main.ts.
```typescript
import NavigationBar from "./components/NavigationBar.vue";

<header>
   <div>
     <!-- Le composant NavigationBar est affiché sur toutes les pages de l'application. Il contient des liens de navigation. Voir soncontenu dans le fichier src/components/NavigationBar.vue -->
     <NavigationBar />
   </div>
</header>
```



```typescript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
```
