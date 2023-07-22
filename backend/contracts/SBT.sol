// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SBT {
    // Structure de données pour représenter un SBT (Soul)
    struct Soul {
        string nom;
        string prenom;
        string dateNaissance;
        uint8 grade;
        bool license;
        address owner;
    }

    // Mapping pour stocker les SBT associés à une adresse Ethereum
    mapping(address => Soul) public souls;

    // Événements

    // Variables publiques
    string public name;
    string public ticker;

    // Modifier pour vérifier si le msg.sender est le propriétaire du SBT
    modifier haveSbt() {
        require(souls[msg.sender].owner == msg.sender, "You have not SBT");
        _;
    }

    constructor(string memory _name, string memory _ticker) {
        name = _name;
        ticker = _ticker;
    }

    // Fonction pour créer un nouveau SBT (Soul)
    function mint(
        string calldata _nom,
        string calldata _prenom,
        string calldata _dateNaissance,
        uint8 _grade,
        bool _license
    ) external {
        // Vérifier si le SBT (Soul) existe déjà
        require(souls[msg.sender].owner != msg.sender, "SBT already exists");

        // Créer un nouveau SBT (Soul) avec les informations fournies
        Soul memory newSoul = Soul({
            nom: _nom,
            prenom: _prenom,
            dateNaissance: _dateNaissance,
            grade: _grade,
            license: _license,
            owner: msg.sender
        });

        // Ajouter le nouveau SBT (Soul) à la liste
        souls[msg.sender] = newSoul;
    }

    // Fonction pour supprimer un SBT (Soul)
    function burn() external haveSbt {
        // Supprimer le SBT
        delete souls[msg.sender];
    }

    // Fonction pour mettre à jour les informations d'un SBT (Soul)
    function update(
        string calldata _nom,
        string calldata _prenom,
        string calldata _dateNaissance,
        uint8 _grade,
        bool _license
    ) external haveSbt {
        Soul memory newSoul = Soul({
            nom: _nom,
            prenom: _prenom,
            dateNaissance: _dateNaissance,
            grade: _grade,
            license: _license,
            owner: msg.sender
        });

        // Ajouter le nouveau SBT (Soul) à la liste
        souls[msg.sender] = newSoul;
    }

    // Fonction pour obtenir les informations d'un SBT (Soul)
    function getSoul() external view returns (Soul memory) {
        require(souls[msg.sender].owner == msg.sender, "SBT don't exists");
        return souls[msg.sender];
    }
}
