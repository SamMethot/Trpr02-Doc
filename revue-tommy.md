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


# Revue du code de Tommy #3

Ceci est la troisième revue du code de tommy fait par Samuel Méthot.

## Ajout d'un utilisateur dans la base de données pour le classement

Tommy a fait une excellente fonction pour ajouter un utilisateur dans la base de données. Parcontre plus tard il avait eu un problème d'ajout que j'ai dû "fix", mais a part de cela, il était proche à arriver au but. Bravo !

```typescript
async function addUser() {
   isLoading.value = true;
   if (!user.credit) return;
   try {
     await gameServices.postRanking({ name: user.userName, score: user.credit });
     router.push({ name: "Game" });
   } catch (error) {
     console.error(
       "Impossible de mettre à jour la publication. Erreur",
 
       (error as any)?.response?.status
     );
   } finally {
     isLoading.value = false;
   }
 }
 ```

## Affichage du score et changement de mission

Tommy a fait un bon commencement de code pour faire le changement de mission. Nous avons dû changer bien évidemment la fonction pour introduire d'autre fonctionnalité, mais sinon il a fait une bonne "job" ! De plus, tommy a fait l'affichage du score à la fin de la partie, il manquait un peut de boostrap et de css, mais l'ajout est parfait ! Bravo !

Affichage du score :
```typescript
  <div v-if="isGameOver">
     <p>Vous avez fait un score de {{ user.credit }}</p>
     <button>Voir le classement</button>
   </div>
   <Loading :active="isLoading" />
```

Changement de mission :
```typescript
const skipFight = () => {
   if (nbOponentFought.value < NB_ENEMIES) nbOponentFought.value++;
   else {
     isGameOver.value = true;
   }
 };
 ```

## Début de test sur le login 

Tommy a commencer les test et ils marchent fabuleusement et un bon commencement pour les test ! Bravo Tommy !

```typescript
import { describe, it, expect } from "vitest";
 import { mount } from "@vue/test-utils";
 import Login from "../Login.vue";
 
 describe("Login.vue", () => {
   it("Par défaut, le champ pour le nom est vide", async () => {
     const wrapper = mount(Login);
     const input = await wrapper.find('input[type="text"]');
 
     expect((input.element as HTMLInputElement).value).toBe(""); //Assert inspiré de chatgpt
   });
 
   it("Par défaut, le champ pour le vaisseau", async () => {
     const wrapper = mount(Login, {
       props: {
         isCharacterCreated: false,
         userName: "",
         shipName: "",
       },
     });
 
     const select = wrapper.find("select");
 
     expect((select.element as HTMLSelectElement).value).toBe(""); //Assert inspiré de chatgpt
   });
 });
 ```

 ## La composantes Login

 Tommy a faite une bonne composantes qui est presque parfaite. En effet, la seul chose que je puissent penser changer et le nom de la fonction addUser, car elle ne fait pas vraiment ce quelle est supposer faire si c'est pour ajouter un utilisateur. Je crois qu'un changement de nom ferrais en sorte que cette composante soit réellement parfaite. Bref, Tommy, vous avez faite un bon travail !

```typescript
 async function addUser() {
  try {
    emit("update:isCharacterCreated", true);
    router.push({
      name: "Welcome",
    });
  } catch (error) {
    console.error(
      "Impossible de mettre à jour la publication. Erreur",
      (error as any)?.response?.status
    );
  }
}
```

## La composante StartGame

Tommy a fait un excellent travail au niveau du commencement du jeu et les seules changements qui pourrait être apporter pour améliorer le code et de supprimer les imports et la variable inutilisée. En effet, la variable route n'est pas utilisée, l'import "Loading" n'est pas utilisé et le onMounted n'est pas utilisé. Bref, a part de cela, je crois qu'aucune autre modification pourrait améliorer le code. Bravo Tommy !

```typescript
import Loading from "vue-loading-overlay";
import { ref, onMounted } from "vue";

const route = useRoute();
```