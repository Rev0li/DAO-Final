// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @author Revoli
 * @title SBT (Soul) Smart Contract
 * @dev Ce contrat gère les informations et les fonctionnalités liées aux SBT (Soul) représentant des profils d'utilisateurs.
 */
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

    // Variables publiques
    string public name;
    string public ticker;

    // Modifier pour vérifier si le msg.sender est le propriétaire du SBT
    modifier haveSbt() {
        require(souls[msg.sender].owner == msg.sender, "You have not SBT");
        _;
    }

    /**
     * @dev Constructeur du contrat SBT (Soul)
     * @param _name Le nom du contrat SBT (Soul)
     * @param _ticker Le ticker du contrat SBT (Soul)
     */
    constructor(string memory _name, string memory _ticker) {
        name = _name;
        ticker = _ticker;
    }

    /**
     * @dev Fonction pour créer un nouveau SBT (Soul)
     * @param _nom Le nom du nouveau SBT (Soul)
     * @param _prenom Le prénom du nouveau SBT (Soul)
     * @param _dateNaissance La date de naissance du nouveau SBT (Soul)
     * @param _grade Le grade du nouveau SBT (Soul)
     * @param _license Le statut de licence du nouveau SBT (Soul)
     */
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

    /**
     * @dev Fonction pour supprimer un SBT (Soul)
     * @notice Le msg.sender doit être le propriétaire du SBT (Soul)
     */
    function burn() external haveSbt {
        // Supprimer le SBT
        delete souls[msg.sender];
    }

    /**
     * @dev Fonction pour mettre à jour les informations d'un SBT (Soul)
     * @notice Le msg.sender doit être le propriétaire du SBT (Soul)
     * @param _nom Le nom mis à jour du SBT (Soul)
     * @param _prenom Le prénom mis à jour du SBT (Soul)
     * @param _dateNaissance La date de naissance mise à jour du SBT (Soul)
     * @param _grade Le grade mis à jour du SBT (Soul)
     * @param _license Le statut de licence mis à jour du SBT (Soul)
     */
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

    /**
     * @dev Fonction pour obtenir les informations d'un SBT (Soul)
     * @return Les informations du SBT (Soul) du msg.sender
     */
    function getSoul() external view returns (Soul memory) {
        require(souls[msg.sender].owner == msg.sender, "SBT don't exists");
        return souls[msg.sender];
    }

    receive() external payable {}

    fallback() external payable {}
}
