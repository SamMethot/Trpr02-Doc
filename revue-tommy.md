# Revue du code de Tommy #1

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

# Revue du code de Tommy #2

Ceci est la deuxième revue du code de tommy fait par Samuel Méthot.

## Vue login

Tommy à presque fini entièrement la vue login. Il fait afficher un chargement à chaque accès à la vue. Il afficher les erreurs de validation des champs. De plus, il a fait tout le bootstrap relier au champs de validation. Super de bon travail !

```typescript
<script setup lang="ts">
 import { ref, onMounted, computed, watch } from "vue";
 import { gameServices } from "../services/gameService.ts";
 import type { Ship } from "../scripts/types.ts";
 import Loading from "vue-loading-overlay";
 import "vue-loading-overlay/dist/css/index.css";
 import type User from "../scripts/types.ts";
 
 const currentPlayer = ref<User>({ userName: "", character: "", score: 0 });
 const ships = ref<Ship[]>([]);
 const isLoading = ref(false);
 onMounted(async () => {
   isLoading.value = true;
   try {
     const data = await gameServices.getShips();
     ships.value = data;
   } catch (error) {
     console.error("Erreur avec le service: ", (error as any).message);
   } finally {
     isLoading.value = false;
   }
 });
 const errors = ref({
   invalidPlayerName: false,
   invalidCharacter: false,
 });
 
 const resetErrors = () => {
   (errors.value.invalidPlayerName = false),
     (errors.value.invalidCharacter = false);
 };
 const validatePlayer = () => {
   let isValid = true;
   resetErrors();
   if (!currentPlayer.value?.userName.trim()) {
     errors.value.invalidPlayerName = true;
     isValid = false;
   }
   if (!currentPlayer.value?.character.trim()) {
     errors.value.invalidCharacter = true;
     isValid = false;
   }
   if (isValid) {
     resetErrors();
     console.log(currentPlayer);
   }
 };
 const emit = defineEmits(["update:users"]);
 </script>
 <template>
   <div class="container mt-4">
     <h3 class="mb-3">Créer un personnage</h3>
     <div class="card p-4 shadow-sm">
       <div class="mb-3">
         <label for="playerName" class="form-label">Nom du joueur</label>
         <input
           id="playerName"
           type="text"
           class="form-control"
           placeholder="Entrez le nom du joueur"
           v-model="currentPlayer.userName"
         />
         <p v-if="errors.invalidPlayerName" class="text-danger">
           Veuillez entrer un nom de joueur
         </p>
       </div>
 
       <div class="mb-3">
         <label class="form-label">Nom du personnage</label>
         <select class="form-control" v-model="currentPlayer.character">
           <option v-for="ship in ships">{{ ship.name }}</option>
         </select>
         <p v-if="errors.invalidCharacter" class="text-danger">
           Veuillez choisir un personnage
         </p>
       </div>
 
       <button class="btn btn-primary w-100" @click="validatePlayer">
         Ajouter
       </button>
     </div>
   </div>
   <Loading :active="isLoading" />
 </template>
 <style scoped>
 .container {
   max-width: 500px;
 }
 .text-danger {
   color: red;
 }
 .invalid-feedback {
   color: red;
 }
 </style>
```

## Ajout du Ship

Tommy a ajouter parfaitement l'interface avec ces champs comme il le faut dans types.ts, bravo !

```typescript
export interface Ship {
   id: number;
   name: string;
 }
```

## Importation de la vue login dans WelcomeView

Tommy a également importer correctement et changer quelque petites choses pour rendre l'afficher de la vue base meilleur. Bon travail Tommy !

```typescript
<script setup lang="ts">
 import Login from "../components/Login.vue";
 </script>

 <template>
   <div>
   <div class="background">
     <h1 class="d-flex justify-content-center">Bienvenue dans Minekraft</h1>
     <Login />
   </div>
 </template>

 <style scoped>
 /*CHATGPT*/
 .background {
   background-image: url("https://images2.alphacoders.com/135/1353836.png");
   background-size: cover;
   background-position: center;
   min-height: 100vh;
   padding: 2rem;
 }
 </style>
 ```
