<?php

function getUserQuizzList($database){

        $quizzList = $database -> select('quizz',[
            'quizz_id',
            'quizz_name',
            'quizz_desc',
            'categorie_foreign_id'
        ]);

        foreach ($quizzList as $quizz){

            # On récupère le nom de la catégorie auquel notre quizz est associé
            $categorie = $database -> select('quizz_categorie',[
                'categorie_name',
            ],[
                'categorie_id' => $quizz['categorie_foreign_id']
            ]);

            echo '  <li class="user_quizz_list_item">
                        <div class="user_quizz_list_heading">'.$quizz['quizz_name'].'</div>
                        <div class="user_quizz_item_container">
                            <div class="user_quizz_item_wrapper">
                            <div class="user_quizz_list_dec">'.$quizz['quizz_desc'].'</div>
                            <div class="user_quizz_list_qty">'.$categorie[0]['categorie_name'].' | 10 Questions <a href="http://forza-mts.alwaysdata.net/leaderboard.php?quizz_id='.$quizz['quizz_id'].'">Leaderboard</a></div>
                            </div>
                            <div class="user_quizz_item_wrapper"></div>
                        </div>
                        <a href="http://forza-mts.alwaysdata.net/quizz.php?quizz='.$quizz['quizz_id'].'&categorie='.$quizz['categorie_foreign_id'].'" class="user_quizz_item_play_wrapper w-inline-block">
                            <div class="play_link">Jouer</div><img src="images/play_white.svg" loading="lazy" alt="" class="play_logo">
                        </a>
                    </li>';

        };


        
}

# Fonction permettant de générer le quizz séléctionnés
function generateQuizz($database, $categorie_id){

    # On récupère les questions du quizz séléctionnés grâce à la catégories auxquels ils sont associés
    $questionList = $database -> select('quizz_questions',[
        'question_id',
        'question_label',
        'question_rep1',
        'question_rep2',
        'question_rep3',
        'question_rep4',
        'question_good_ans',
        'question_feedback'
    ],[
        'categorie_foreign_id' => $categorie_id
    ]);

    $iterator = 0;
    $questionI = 1;

    # On créer une variable qui va contenir toutes les bonnes réponses du quizz pour après l'envoyer et les traiter en javascript
    $goodanswers_json = array();
    foreach($questionList as $question)
    {

        # On insère la bonnes réponses dans notre variable
        $good_answer = intval($question['question_good_ans']);

        # Et on vient déterminer si notre question est un QCU ou QCM grâces au nombres de bonnes réponses présentes dans notre variable
        if($good_answer >= 1 && $good_answer <= 4){
            $questionQCUorQCM = 'QCU';
            $questionType = 'radio';
            switch ($good_answer) 
            {
                case 1 :
                    $rep1good = true;
                    break;
                case 2 :
                    $rep2good = true;
                    break;
                case 3 :
                    $rep3good = true;
                    break;
                case 4 :
                    $rep4good = true;
                    break;
            }

        }
        elseif ($good_answer > 10){
            $questionType = 'checkbox';
            $questionQCUorQCM = 'QCM';
            foreach(str_split($question['question_good_ans']) as $isgood){
                if($isgood == '1')
                {
                    $rep1good = true;
                }
                if($isgood == '2')
                {
                    $rep2good = true;
                }
                if($isgood == '3')
                {
                    $rep3good = true;
                }
                if($isgood == '4')
                {
                    $rep4good = true;
                }
                $iterator++;
            }
        };

        # On insère les bonnes réponses dans notre variable qu'on enverra en js
        $goodanswers_json[$questionI]['question_number']=$questionI;
        $goodanswers_json[$questionI]['question_goodrep']=$question['question_good_ans'];

        # On imprime notre question en limitant le nombre de réponses par 10
        if($questionI <= 10)
        {
            echo '
                <div class="quizz_form_question form'.$questionI.'" data-type="'.$questionQCUorQCM.'">

                <div class="form_margin_to_separator">

                    <!-- SECTION QUESTION/REPONSES -->

                    <p>'.$question['question_label'].'</p>
                    <div class="quizz_form_answer">
                        <div class="answer_proposition">
                            <input type="'.$questionType.'" value="1" id="question'.$questionI.'_answer1" name="question'.$questionI.'" class="question'.$questionI.'">
                            <label for="question'.$questionI.'_answer1">'.$question['question_rep1'].'</label>    
                        </div>
                        <div class="answer_proposition">
                            <input type="'.$questionType.'" value="2" id="question'.$questionI.'_answer2" name="question'.$questionI.'" class="question'.$questionI.'">
                            <label for="question'.$questionI.'_answer2">'.$question['question_rep2'].'</label>    
                        </div>
                        <div class="answer_proposition">
                            <input type="'.$questionType.'" value="3" id="question'.$questionI.'_answer3" name="question'.$questionI.'" class="question'.$questionI.'">
                            <label for="question'.$questionI.'_answer3">'.$question['question_rep3'].'</label>    
                        </div>
                        <div class="answer_proposition">
                            <input type="'.$questionType.'" value="4" id="question'.$questionI.'_answer4" name="question'.$questionI.'" class="question'.$questionI.'">
                            <label for="question'.$questionI.'_answer4">'.$question['question_rep4'].'</label>    
                        </div>
                    </div>

                    <!-- FEEDBACK -->

                    <div class="quizz_form_feedback">

                        <!-- ICONE INDIQUANT QUE LA REPONSE EST JUSTE -->

                        <lord-icon class="answer_feedback_true"
                            src="https://cdn.lordicon.com/lomfljuq.json"
                            trigger="in"
                            delay="200"
                            state="morph-check-in-1"
                            colors="primary:#109121">
                        </lord-icon>

                        <!-- ICONE INDIQUANT QUE LA REPONSE EST FAUSSE -->

                        <lord-icon class="answer_feedback_wrong"
                            src="https://cdn.lordicon.com/zxvuvcnc.json"
                            trigger="in"
                            delay="200"
                            colors="primary:#c71f16">
                        </lord-icon>

                        <!-- PARTIE FEEDBACK -->
                        <span class="answer_feedback"></span>
                        <feedback>'.$question['question_feedback'].'</feedback>
                    
                    </div>

                </div>

                <!-- BOUTON POUR VALIDER REPONSES ET PASSER A LA QUESTION SUIVANTE -->

                <div class="button_right_margin">
                    <button name="question'.$questionI.'" value="validate" id="question'.$questionI.'_button" data-status="not-over">Valider ma réponse</button> 
                </div>

            </div>
            
            
            ';

            $questionI++;
        }
        
    }

    # On retourne notre variable qu'on enverra en JSON mais pas dans cette fonction
    return $goodanswers_json;
    

}

?>