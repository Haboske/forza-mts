<?php 

require "Config.php";

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $email = $_POST["email"];
    $password = $_POST["password"];

    function secureDonnee($donnee){
        $donnee = trim($donnee);
        $donnee = stripslashes($donnee);
        $donnee = htmlspecialchars($donnee);

        return $donnee;
    }

    $email = secureDonnee($email);
    $password = secureDonnee($password);

    // Connexion à la base de données
    $connexion = mysqli_connect("mysql-forza-mts.alwaysdata.net", "forza-mts", "tJG5jzHL4#MJz!MH", "forza-mts_final");

    if (!$connexion) {
        die("La connexion à la base de données a échoué : " . mysqli_connect_error());
    }

    // Requête pour obtenir le mot de passe correspondant à l'e-mail donné
    $query = "SELECT user_id, user_pseudo, user_pass, user_email, user_isadmin FROM users WHERE user_email = '$email'";
    $result = mysqli_query($connexion, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        // Utilisateur trouvé
        $row = mysqli_fetch_assoc($result);
        $storedPassword = $row['user_pass'];

        // Vérification du mot de passe
        if (password_verify($password, $storedPassword)) {

            $_SESSION['user_id']=$row['user_id'];
            $_SESSION['user_pseudo']=$row['user_pseudo'];
            $_SESSION['user_email']=$row['user_email'];
            $_SESSION['user_isadmin']=$row['user_isadmin'];

            if($_SESSION['user_isadmin'] == 1)
            {
                header('Location: http://forza-mts.alwaysdata.net/backoffice.php?quizz_list=true');
            }
            else
            {
                header('Location: http://forza-mts.alwaysdata.net');
            }

        } else {
            echo 'Connexion échouée !';
        }
    } else {
        echo "Utilisateur non trouvé ou e-mail incorrect.";
    }

    // Fermeture de la connexion
    mysqli_close($connexion);
}

?>