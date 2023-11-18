<?php

require "Config.php";
// On importe les classes de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require '../classes/phpmailer/PHPMailer/src/Exception.php';
require '../classes/phpmailer/PHPMailer/src/PHPMailer.php';
require '../classes/phpmailer/PHPMailer/src/SMTP.php';



function send_mail($to, $subject, $body){
	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$username         = "pataud@alwaysdata.net"; // on utilise un compte gmail créé pour l'occasion
	$password         = 'rvp270175';  // vous pourrez utiliser ce compte-ci ou paramétrer le votre si vous le souhaitez
	// dans ce cas pensez à aller dans les paramètres de sécurité de votre compte et diminuer la sécurité pour permettre l'authentification via des applications tierces
	
	$mail->IsSMTP();
	$mail->SMTPOptions = array(
		'ssl' => array(
		'verify_peer' => false,
		'verify_peer_name' => false,
		'allow_self_signed' => true
		)
	);
	$mail->SMTPDebug  = 0;  // mettez 2 pour avoir toutes les infos concernant l'envoi du mail sous la forme d'un echo                   
	$mail->SMTPAuth   = true;                  
	$mail->SMTPSecure = 'tls';                 
	$mail->Host       = 'smtp-pataud.alwaysdata.net';      
	$mail->Port       = '587';                   
	$mail->Username   = $username;  
	$mail->Password   = $password;            

	$mail->SetFrom($username, $username);
	$mail->AddReplyTo($username,$username);
	$mail->Subject    = $subject;
	$mail->MsgHTML($body);
	$address = $to;
	$mail->AddAddress($address, $username);
	
	return $mail->Send();
}

// Informations de connexion à la base de données
$serveur = "mysql-forza-mts.alwaysdata.net"; // Adresse du serveur MySQL
$utilisateur = "forza-mts"; // Nom d'utilisateur MySQL
$mot_de_passe = "3i7od8pSY3@NmAE4"; // Mot de passe MySQL
$base_de_donnees = "forza-mts_final"; // Nom de la base de données

// Connexion à la base de données
$connexion = mysqli_connect($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);

// Vérification de la connexion
if (!$connexion) {
    die("La connexion à la base de données a échoué : " . mysqli_connect_error());
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    
    $query = "SELECT * FROM users WHERE user_email = '$email'";
    $result = mysqli_query($connexion, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        // Le compte existe, génère le token et continue...
        $token = bin2hex(random_bytes(32)); // Génère un token sécurisé

        // Enregistre le token dans la table reinitialisation_mdp
        $insertTokenQuery = "INSERT INTO users_pass_token (email, token, token_datetime) VALUES ('$email', '$token', DATE_ADD(NOW(), INTERVAL 1 HOUR))";
        $insertTokenResult = mysqli_query($connexion, $insertTokenQuery);

        if ($insertTokenResult) {
            // Envoie le mail avec le lien contenant le token
            $subject = "Réinitialisation de mot de passe";
            $message = "Clique sur le lien pour réinitialiser ton mot de passe : http://forza-mts.alwaysdata.net/api/traitement_reinitialisation.php?email=$email&token=$token";
            $headers = "From: admin@forza-mts.alwaysdata.net";

            send_mail($email, $subject, $message, $headers);

            // Message de succès
            echo "Un e-mail de réinitialisation a été envoyé à $email.";
        } else {
            // Gestion de l'erreur lors de l'enregistrement du token
            echo "Erreur lors de la réinitialisation. Veuillez réessayer.";
        }
    } else {
        // L'e-mail n'est pas associé à un compte
        echo "Cet e-mail n'est pas associé à un compte.";
    }
}

// Vérifie si le token est présent dans l'URL
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Vérifie si le token est actif dans la table reinitialisation_mdp
    $checkTokenQuery = "SELECT * FROM users_pass_token WHERE token = '$token' AND 	token_datetime > NOW()";
    $checkTokenResult = mysqli_query($connexion, $checkTokenQuery);

    $email = $database -> select('users_pass_token',[
        'email'
    ],[
        'token' => $token
    ])[0]['email'];

    if ($checkTokenResult && mysqli_num_rows($checkTokenResult) > 0) {
        // Token valide, affiche le formulaire de réinitialisation
        echo '
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Réinitialisation de mot de passe</title>
        </head>
        <body>
            <form action="traitement_reinitialisation.php" method="POST">
                <input type="hidden" name="email" value="'.$email.'">
                <input type="hidden" name="token" value="' . $token . '">
                <label for="new_password">Nouveau mot de passe :</label>
                <input type="password" id="new_password" name="new_password" required>
                <label for="confirm_password">Confirmer le nouveau mot de passe :</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
                <input type="submit">Réinitialiser le mot de passe</input>
            </form>
        </body>
        </html>';
    } 
    else {
        // Token expiré ou invalide
        echo "Ce lien de réinitialisation n'est plus valide. Veuillez recommencer le processus.";
    }
} 


// Vérifie si le formulaire de réinitialisation est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['token'])) {
    $token = $_POST['token'];
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];

    // Vérifie si les mots de passe correspondent
    if ($newPassword === $confirmPassword) {
        // Hash le nouveau mot de passe
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        // Met à jour le mot de passe dans la table user
        $updatePasswordQuery = "UPDATE users SET user_pass = '$hashedPassword' WHERE user_email = (SELECT email FROM users_pass_token WHERE token = '$token')";
        $updatePasswordResult = mysqli_query($connexion, $updatePasswordQuery);

        if ($updatePasswordResult) {
            // Supprime le token de la table reinitialisation_mdp
            $deleteTokenQuery = "DELETE FROM users_pass_token WHERE token = '$token'";
            $deleteTokenResult = mysqli_query($connexion, $deleteTokenQuery);

            // Message de succès
            echo "Mot de passe réinitialisé avec succès !";
        } else {
            // Gestion de l'erreur lors de la mise à jour du mot de passe
            echo "Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.";
        }
    } else {
        // Les mots de passe ne correspondent pas
        echo "Les mots de passe ne correspondent pas.";
    }
}

?>