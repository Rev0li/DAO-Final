# BCS Sport

Description brève du projet et de son objectif.

## Installation

- Clonez ce référentiel sur votre machine locale.
- Installez les dépendances en exécutant : `npm install`

## Utilisation

- Démarrez le serveur backend en exécutant : `npm start`
- Le serveur backend sera disponible sur `http://localhost:PORT`

## Tests

Pour exécuter les tests unitaires : `npm test`

## Structure du Projet

Expliquez brièvement l'architecture du projet, y compris l'organisation des dossiers et des fichiers.

## BACKEND

## Dépendances

- **@openzeppelin/contracts** - Version 4.9.2
- **chai** - Version 4.3.7
- **dotenv** - Version 16.3.1
- **hardhat** - Version 2.16.1
- **moment** - Version 2.29.4

**DevDependencies**

- **@nomicfoundation/hardhat-toolbox** - Version 2.0.2
- **@nomiclabs/hardhat-ethers** - Version 2.2.3
- **@nomiclabs/hardhat-etherscan** - Version 3.1.7
- **@typechain/ethers-v5** - Version 10.2.1
- **@typechain/hardhat** - Version 6.1.6
- **@types/chai** - Version 4.3.5
- **@types/mocha** - Version 10.0.1
- **hardhat-gas-reporter** - Version 1.0.9
- **solidity-coverage** - Version 0.8.4

## Contribuer

Si vous souhaitez contribuer à ce projet, suivez ces étapes :

1. Forkez ce référentiel et clonez votre fork sur votre machine locale.
2. Créez une branche pour vos modifications : `git checkout -b feature/ma-fonctionnalite`
3. Faites vos modifications et commitz-les : `git commit -m "Ajouter une fonctionnalité"`
4. Poussez vos modifications vers votre fork : `git push origin feature/ma-fonctionnalite`
5. Créez une pull request en comparant votre branche à la branche principale du référentiel d'origine.

Nous examinerons vos modifications et les fusionnerons si elles sont jugées appropriées.

## Licence

MIT Licence.

graph TD
A[After Login]
B{User Type}
C[Single User Screen]
D[Mes licences]
E[Mes compétences - Dead End]
F[Mes participations]
G[List of Licences]
H[Demander une licence]
I[Pop up: Fill personal data]
J[List of Events for User]
K[Voter]
L[Pop up: Vote Options]
M[Club Screen]
N[Gestion des licences]
O[List of Licences: Afficher, Renouveler, Approuver]
P[Pop up: Licence Data]
Q[Gestion des événements]
R[List of Events for Club]
S[Soumettre un événement]
T[Fill in Event Details]
U[Soumettre]
A --> B
B -- Single User --> C
C --> D
C --> E
C --> F
D --> G
G --> H
H --> I
F --> J
J --> K
K --> L
B -- Club --> M
M --> N
N --> O
O --> P
M --> Q
Q --> R
R --> S
S --> T
T --> U
U --> R
U --> J

## FRONTEND

## Structure du projet

Le projet frontend est organisé de la manière suivante :

- Le dossier "pages" contient les différentes pages de l'application, telles que la page du profil sportif (SBT) et la page de vote.
- Le dossier "hooks" contient les hooks personnalisés utilisés pour interagir avec les contrats blockchain et les données de l'application.
- Le dossier "providers" contient les fournisseurs de contexte utilisés pour gérer l'état global de l'application.
- Le dossier "components" contient les composants réutilisables utilisés pour construire l'interface utilisateur de l'application.
- Le dossier "styles" contient les feuilles de style et les thèmes utilisés pour la mise en forme de l'application.

## Dépendances du frontend

- @chakra-ui/react : bibliothèque de composants pour React avec prise en charge de la conception accessible et réactive.
- @emotion/react et @emotion/styled : bibliothèque pour la gestion des styles et des thèmes.
- @rainbow-me/rainbowkit : bibliothèque de composants et d'outils pour la construction d'applications Ethereum décentralisées.
- ethers : bibliothèque JavaScript pour interagir avec les contrats Ethereum.
- framer-motion : bibliothèque pour l'animation et les transitions de composants React.
- moment : bibliothèque JavaScript pour manipuler et formater les dates et heures.
- next : framework pour le développement d'applications React avec prise en charge du rendu côté serveur (SSR) et du rendu statique.
- react et react-dom : bibliothèques React de base.
- react-icons : bibliothèque d'icônes pour React.
- viem : bibliothèque de gestion d'état global pour React.
- wagmi : bibliothèque pour interagir avec le contrat SBT et les données de l'application.
