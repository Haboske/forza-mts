<?php

    require 'api/Config.php';

    $scores = $database -> select('quizz_users_scores',[
        'score',
        'player_foreign_id'
    ],[
        'quizz_foreign_id' => $_GET['quizz_id']
    ]);

    foreach($scores as $score)
    {
        $player_name = $database -> select('users',[
            'user_pseudo'
        ],[
            'user_id' => $score['player_foreign_id']
        ])[0]['user_pseudo'];

        echo 'Joueur : '.$player_name.' / Score : '.$score['score'].'<br>';

    }
    

    

?>

    <form action="api/export_excel.php" method="post">
        <button type="submit" id="export" name="export" value="Export to excel" class="btn btn-success">Export To Excel</button>
    </form>