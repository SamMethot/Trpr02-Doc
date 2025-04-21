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