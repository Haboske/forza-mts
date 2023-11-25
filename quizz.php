<?php 
    require 'api/User.php';
    require 'api/Config.php'; 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quizz</title>
    <link rel="stylesheet" href="content/CSS/quizz.css">
</head>
<body>
    <div class="quizz_popup">
        <div class="quizz_intro">
            <h1>Bienvenue sur le quizz du Forza Community Club</h1>
            <div class="quizz_intro_desc">
                <p>L'objectif est simple, répondez à un formulaire de 10 questions</p>
                <p>Au plus vous aurez de bonnes réponses, au plus votre score sera élevé</p>
                <p>Si vous arrivez à faire un score de 10 points,  une petite surprise vous attends</p>
            </div>
            <button class="quizz_intro_button">C'est parti !</button>
        </div>
        <div class="quizz_form">
            <?php
                    if(isset($_GET['quizz']) && isset($_GET['categorie']))
                    {
                        $json_php = generateQuizz($database, $_GET['categorie']);
                        $json = json_encode($json_php);
                    }
            ?>
        </div>  
        <div class="quizz_outro">

            <div class="quizz_outro_player_result">
                <h2>Questionnaire terminé !</h2>
                <p class="score_display">Ton score est <span class="result_display"></span></p>

                <form action="api/score_register.php">
                    <div class="player_info_input">
                        <input type="hidden" name="player_id" value="<?php echo $_SESSION['user_id'] ?>">
                        <input type="hidden" name="quizz_id" value="<?php echo $_GET['quizz'] ?>">
                        <input type="hidden" name="score" id="input_score">
                        <label>Quel est ton pseudo ?</label>
                        <input type="text" name="user_name" class="playername" value="<?php echo $_SESSION['user_pseudo'] ?>"> 
                        <p class="player_info_nb">Une fois ton pseudo renseigné tu peux cliquer sur le bouton 'suivant'</p>
                    </div>

                    <input type="submit" name="enregistrer" value="confirmer">
                </form>
                
            </div>

            <div class="quizz_outro_score_table">
                <h2>Voilà le tableau des scores :</h2>
                <div id="container"></div>

                <button class="restart">Redémarrer le quizz</button>
            </div>

        </div>  
    </div>
</body>
</html>
<!-- C'est ici que l'on renvoie nos bonnes réponses en JSON pour les traiter en javascript-->
<script id="jsonDatas">var goodanswers = <?php print($json) ?>;</script>
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
<script src="script/quizz.js"></script>
<script src="https://cdn.lordicon.com/lordicon-1.1.0.js"></script>
