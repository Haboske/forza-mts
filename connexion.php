<?php require 'api/Config.php'?>


<!DOCTYPE html><!--  This site was created in Webflow. https://www.webflow.com  -->
<!--  Last Published: Wed Nov 15 2023 18:42:42 GMT+0000 (Coordinated Universal Time)  -->
<html data-wf-page="6555082aa5b0e9ae3d5b2889" data-wf-site="65534db75f81d005e882ef1a">
<head>
<meta charset="utf-8">
  <title>user_ui_inscription</title>
  <meta content="user_ui_inscription" property="og:title">
  <meta content="user_ui_inscription" property="twitter:title">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta content="Webflow" name="generator">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <?php echo '<link rel="stylesheet" href="content/CSS/backoffice_v2.css">';?>
  <?php echo '<link rel="stylesheet" href="content/CSS/webflow.css">';?>
</head>

<body class="body-2">
  <section class="main-section connexion">
    <div class="connexion-wrapper">
      <div class="connexion-heading-wrapper">
        <h1 class="connexion-heading">Se connecter 🕹️</h1>
        <div class="connexion-desc">Pour accéder à nos quizz, vous n&#x27;avez pas le choix que de vous connecter ! Comme ça on peut récupérer absolument toute vos données 🥸</div>
      </div>
      <div class="w-form">

        <form action="api/traitement_connexion.php" method="post"  id="email" name="email-form" data-name="email" data-wf-page-id="6555082aa5b0e9ae3d5b2889" data-wf-element-id="557df803-d325-f47c-e7ee-c62961f0b341">
          
          <label for="email" class="connexion-label">Email</label> 
          <input type="text" class="connexion-input w-input" maxlength="256" name="email" data-name="email" placeholder="mon@email.com" id="email">
          
          <label for="password" class="connexion-label">Mot de passe</label>
          <input type="password" class="connexion-input w-input" maxlength="256" name="password" data-name="password" placeholder="Mon mot de passe..." id="password" required="">

          
          <input type="submit" value="Se connecter" data-wait="Please wait..." class="connexion-input submit w-button">
        </form>
        <a href="http://forza-mts.alwaysdata.net/reinitialisation.php">J'ai oublié mon mots de passe</a>
      </div>
    </div>
  </section>
  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=65534db75f81d005e882ef1a" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
</body>

</html>