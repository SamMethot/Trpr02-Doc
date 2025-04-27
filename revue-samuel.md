# Revue #3 du code de Samuel semaine du 20-27 avril
Cette revue de code a été faite par Tommy Claveau

## Classe LeaderBoard.vue
Samuel c'est occuppé de l'affichage et style des données, j'ai rien à dire l'a dessus, beau travail
```
 <div class="card-body d-flex align-items-center justify-content-between">
            <div class="player-info">
              <h5 class="player-name">
                {{ index + 1 }}. {{ ranking.name }} <!-- CHATGPT -->
                <span v-if="index === 0" class="badge bg-warning text-dark">Champion</span>
                <span v-else-if="index === 1" class="badge bg-secondary">2e</span>
                <span v-else-if="index === 2" class="badge bg-warning">3e</span>
              </h5>
              <p class="player-score">Score: {{ ranking.score }}</p>
            </div>
            <img src="../assets/minecraft_sword.png" alt="Minecraft sword" class="player-icon" /> <!-- Source : https://wallpapers.com/png/minecraft-diamond-sword-pixel-art-foxs9ph1n0p0w0ab.html -->
```
## Clase GameView
Belle utilisation des constantes
```
const ENEMY_NOT_FOUND = "Aucun ennemi trouvé pour cette difficulté.";
```
Nom de variable peut être changé pour mieu representer le code par exemple : "hasPlayerLost" ou "isGameLost"
```
const isUserLost = ref<boolean>(false);
```

Pour obtenir les enemies, il est inutiles de d'obtenir tous les enemies, les trier au hasard et d'aller rechercher 5 enemies, car on les as deja, donc il y a des appels d'api qui sont inutiles:
```
try {
    let allEnemies = await gameServices.getCharacters();
    allEnemies = allEnemies.filter(
      (enemy: { experience: number }) =>
        enemy.experience === parseInt(difficulty)
    ); // CHATGPT

    if (allEnemies.length === 0) {
      throw new Error(ENEMY_NOT_FOUND);
    }

    allEnemies.sort(() => Math.random() - 0.5); // CHATGPT

    const selectedEnemies = allEnemies.slice(0, NB_ENEMIES); // CHATGPT

    for (let i = 0; i < selectedEnemies.length; i++) {
        const fullEnemy = await gameServices.getCharacter(
        selectedEnemies[i].id.toString()
      );
      preloadedEnemies.value.push(fullEnemy);
    }
```
La logique de combat me semble bien éffectué, beau travail :
```
 const calculateDamage = (): number => {
    const minDamage = 3;
    const maxDamage = 6;
    return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage; // CHATGPT
  };

  if (Math.random() < getHitChance(user.experience)) {
    const damage = calculateDamage();
    randomEnemy.value.ship.vitality -= damage;

    if (randomEnemy.value.ship.vitality <= 0) {
      user.credit += randomEnemy.value.credit;
      if (nbOponentFought.value >= NB_ENEMIES) {
        await addUser();
        isGameOver.value = true;
      } else {
        newMission();
      }
      return;
    }
```
Il n'est pas nécéssaire d'ajouter le joueur lorsqu'on essait de crée une nouvelle mission, cela est deja fait par un autre fonction
```
function newMission() {
  if (isGameOver.value) return;

  nbOponentFought.value++;

  if (nbOponentFought.value <= NB_ENEMIES) {
    randomEnemy.value = {
      ...preloadedEnemies.value[nbOponentFought.value - 1],
    };
    initialEnemyVitality.value = randomEnemy.value.ship.vitality;
  } else {
    isGameOver.value = true;
    if (user.credit > 0) {
      addUser();
    }
  }
}
```
Reparer le ship au complet coute vraiment cher, il est vraiment difficile d'avoir suffisament de points pour se réparer avent de mourrir
```
function repair() {
  if (isGameOver.value) 
    return;

  const repairCost = (100 - user.ship.life) * 5; // CHATGPT

  if (user.credit >= repairCost) {
    user.credit -= repairCost;
    user.ship.life = 100;
  } else {
    useToast().error("Pas assez de crédits pour réparer !", {
      duration: 3000,
    });
  }
}
```

# Revue #2 du code de Samuel semaine de 13-20 avril
Cette revue de code a été faite par Tommy Claveau

## Changement de la base de donnée
Samuel c'est occuppé de changer le theme de la base de donnée pour correspondre à celui que l'on veut faire

## Création de la route leaderboard
Samuel à fait une bonne implémentation du routeur 

`
...
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: LeaderboardView,
  },
...
`
## Ajout des types

Samuel à fait les interfaces pour la base de donnée, c'est une bonne pratique

```
export interface Ranking {
  id: number
  name: string
  score: number
}

export interface Ship {
  id: number
  name: string
}

export interface Character {
  id: number
  name: string
  credit: number
  shipId: number
  experience: number
}
```

## Leader board

### Chargement des "rankings"
Samuel a fait un bonne implémentation de l'appel d'api backend et affiche un chargement lors de l'obtention des données

```
onMounted(async () => {
  isLoading.value = true

  try 
  {
    rankings.value = await gameService.getRankings()
  } 
  catch (error) 
  {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
  }
  finally 
  {
    isLoading.value = false
  }
})
```
### Affichage du leaderboard
Samuel a fait un bon boulot pour afficher les résultats


# Revue #1 du code de Samuel

Cette revue de code a été faite par Tommy Claveau

## Deploiement du sit de documentation
Samuel à c'est occupé de déployer le site de documentation et il à fait un bon travail

## Création de l'interface "User" dans le dossier types
Belle utilisation des interfaces et séparation du code 

`
export default interface User {
  userName: string;
  character: string;
  score: number;
}
`

## Création du composant GameView
Belle séparation du code bravo!