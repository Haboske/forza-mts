<?php
// Informations de connexion à la base de données
$serveur = "mysql-forza-mts.alwaysdata.net"; // Adresse du serveur MySQL
$utilisateur = "forza-mts"; // Nom d'utilisateur MySQL
$mot_de_passe = "tJG5jzHL4#MJz!MH"; // Mot de passe MySQL
$base_de_donnees = "forza-mts_final"; // Nom de la base de données

// Création de la connexion
$conn = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Requête SQL pour récupérer les données de la table "users"
$sql = "SELECT * FROM quizz_users_scores";
$result = $conn->query($sql);

$items = array();

// Stocker les enregistrements de la table dans un tableau
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

// Vérifier si le bouton d'exportation a été cliqué
if (isset($_POST["export"])) {
    // Définir le nom de fichier avec la date actuelle
    $fileName = "Export-Users-" . date('d-m-Y') . ".xls";

    // Définir les informations d'en-tête pour exporter les données au format Excel
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment; filename=' . $fileName);

    // Définir la variable sur false pour l'en-tête
    $heading = false;

    // Ajouter les données de la table MySQL au fichier Excel
    if (!empty($items)) {
        foreach ($items as $item) {
            if (!$heading) {
                echo implode("\t", array_keys($item)) . "\n";
                $heading = true;
            }
            echo implode("\t", array_values($item)) . "\n";
        }
    }
    exit();
}
?>