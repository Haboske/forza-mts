
  <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
    <div class="container w-container">
      <nav role="navigation" class="nav-menu w-nav-menu"><img src="content/SVG/logo-white.svg" loading="lazy" alt="" class="navbar-office-logo">
        <div class="navbar_link title">Quizz</div>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_list=true" class="navbar_link w-nav-link">Liste</a>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_categories=true" class="navbar_link curent w-nav-link">Catégories</a>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_questions=true" class="navbar_link w-nav-link">Questions</a>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?quizz_scores=true" class="navbar_link w-nav-link">Scores</a>
        <div class="navbar_link title">Utilisateurs</div>
        <a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>/backoffice.php?users=true" class="navbar_link w-nav-link">Liste</a>
      </nav>
      <div class="w-nav-button">
        <div class="w-icon-nav-menu"></div>
      </div>
    </div>
  </div>