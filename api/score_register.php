<?php
    require 'Config.php';

    echo 'hello';

    $database -> insert('quizz_users_scores',[
        'player_foreign_id' => $_GET['player_id'],
        'quizz_foreign_id' => $_GET['quizz_id'],
        'score' => $_GET['score']
    ]);

    header('Location: http://forza-mts.alwaysdata.net');
?>