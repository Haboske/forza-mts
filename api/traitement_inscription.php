<?php

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    //Fonction de sécurisation des données
    function secureDonnee($donnee){
        $donnee = preg_replace('/^\s+|\s+$/u', '', $donnee); // Supprime les espaces en début et fin de chaîne
        $donnee = preg_replace('/\s+/u', '', $donnee); // Supprime les espaces au milieu de la chaîne
        $donnee = stripslashes($donnee);
        $donnee = htmlspecialchars($donnee);

        return $donnee;
    }

    $username = secureDonnee($username);
    $email = secureDonnee($email);
    $password = secureDonnee($password);
    $confirm_password = secureDonnee($confirm_password);

    //regex de l'email
    $email_validation_regex = "/^[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/"; 
    
    //regex du password : Nécessite au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
    $password_regex = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"; 


    // Hashage du mot de passe
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Connexion à la base de données
    $connexion = mysqli_connect("mysql-forza-mts.alwaysdata.net", "forza-mts", "3i7od8pSY3@NmAE4", "forza-mts_final");

    if (!$connexion) {
        die("La connexion à la base de données a échoué : " . mysqli_connect_error());
    }

    // Préparation de la requête SQL d'insertion
    $insertQuery = "INSERT INTO users (user_pseudo, user_email, user_pass, user_isadmin) VALUES ('$username', '$email', '$hashedPassword', '0')";

    // Exécution de la requête d'insertion
    
    if (preg_match($email_validation_regex, $email) && preg_match($password_regex ,$password) && $password == $confirm_password) {
        echo '<div class="w-form-done">
              <div>Thank you! Your submission has been received!</div>
              </div>';
        $result = mysqli_query($connexion, $insertQuery);
    
    } 
    else {
        echo '<div class="w-form-done">
              <div>Oops! Something went wrong while submitting the form.</div>
              </div>' . mysqli_error($connexion);
    }

    // Fermeture de la connexion
    mysqli_close($connexion);
}

?>