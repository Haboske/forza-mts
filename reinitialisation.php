<!DOCTYPE html><!--  This site was created in Webflow. https://www.webflow.com  -->
<!--  Last Published: Wed Nov 15 2023 18:42:42 GMT+0000 (Coordinated Universal Time)  -->

<html data-wf-page="65550f810a26d62ed9c4c051" data-wf-site="65534db75f81d005e882ef1a">

<head>
  <meta charset="utf-8">
  <title>user_ui_reinitialisation_mdp</title>
  <meta content="user_ui_reinitialisation_mdp" property="og:title">
  <meta content="user_ui_reinitialisation_mdp" property="twitter:title">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta content="Webflow" name="generator">
  <link href="css/normalize.css" rel="stylesheet" type="text/css">
  <link href="css/webflow.css" rel="stylesheet" type="text/css">
  <link href="css/bryans-sublime-site-85767a.webflow.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
  <script type="text/javascript">WebFont.load({  google: {    families: ["Roboto:300,300italic,regular,italic,500,500italic,700,700italic,900,900italic"]  }});</script>
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
  <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <link href="images/webclip.png" rel="apple-touch-icon">
  <?php echo '<link rel="stylesheet" href="content/CSS/backoffice_v2.css">';?>
  <?php echo '<link rel="stylesheet" href="content/CSS/webflow.css">';?>
</head>

<body class="body-2">
  <section class="main-section connexion">
      <div class="connexion-wrapper background-color-dark">
        <div class="connexion-heading-wrapper">
          <h1 class="connexion-heading">Réinitialiser votre mot de passe🆘</h1>
          <div class="connexion-desc">Vous avez oublié votre mot de passe ? Pas de soucis, ce formulaire est là pour vous aider. Renseignez votre adresse email et si on compte existe alors nous vous enverrons un mail de réinitialisation.</div>
        </div>
        <div class="w-form">
          <form action="https://forza-mts.alwaysdata.net/api/traitement_reinitialisation.php" method="post" id="wf-form-inscription_form" name="wf-form-inscription_form" data-name="inscription_form" redirect="inscription_complete" data-redirect="inscription_complete">
            <label for="name" class="connexion-label">Email</label>
            <input type="text" class="connexion-input w-input" maxlength="256" name="email" data-name="email" placeholder="mon@email.com" id="email">
            <div class="connexion-link-wrapper">
              <a href="https://forza-mts.alwaysdata.net/connexion.php" class="connexion-link">Je n&#x27;ai pas encore de compte / Se créer un compte</a>
            </div>
            <input type="submit" value="Réinitialiser mon mots de passe" data-wait="" class="connexion-input submit w-button">
          </form>
        </div>
      </div>
    </section>
    <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=65534db75f81d005e882ef1a" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="js/webflow.js" type="text/javascript"></script>
</body>
</html>