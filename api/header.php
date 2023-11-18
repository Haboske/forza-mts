<?php ?>

<div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
    <div class="container w-container">
      <nav role="navigation" class="nav-menu w-nav-menu">
        <div class="link title">Quizz</div>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_list=true" class="link w-nav-link">Liste</a>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_categories=true" class="link w-nav-link">Catégories</a>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_questions=true" class="link w-nav-link">Questions</a>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_scores=true" class="link w-nav-link">Scores</a>
        <div class="link title">Utilisateurs</div>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?users=true" class="link w-nav-link">Liste</a>
        <div class="link title">Logs</div>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?reset_logs=true" class="link w-nav-link">Réinitialisation mdp</a>
      </nav>
      <div class="w-nav-button">
        <div class="w-icon-nav-menu"></div>
      </div>
    </div>
  </div>