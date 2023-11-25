<?php

ini_set('display_errors', 'on');

require 'api/header.php';
require 'api/Config.php';
require 'api/Admin.php';

echo '<link rel="stylesheet" href="content/CSS/webflow.css">';
echo '<link rel="stylesheet" href="content/CSS/backoffice_v2.css">';
$is_admin = true;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
</head>
<body class='Body'>
    <section class="main-section">
        <div class="w-layout-blockcontainer admin-wrapper w-container">
            <div class="admin-container">
            <?php


                
                if($_SESSION['user_isadmin'] == '1'){

                    if(isset($_GET['quizz_list']))
                    {
                        getQuizzList($database);
                    }
                    else if(isset($_GET['quizz_categories']))
                    {
                        echo "<h1>AFFICHER LA LISTE DE CATEGORIE</h1>";
                        getCategoryList($database);
                    }
                    else if(isset($_GET['quizz_questions']))
                    {
                        echo "<h1>QUIZZ / QUESTIONS / LISTE</h1>";
                        getQuestionList($database);
                    }
                    else if(isset($_GET['quizz_scores']))
                    {
                        echo "<h1>AFFICHER LA LISTE DE SCORE</h1>";
                        getScoreList($database);
                    }
                    else if(isset($_GET['users']))
                    {
                        echo "<h1>AFFICHER LA LISTE UTILISATEUR</h1>";
                        getUserList($database);
                    }
                    else if(isset($_GET['modif_quizz']))
                    {
                        getQuizzModifForm($database, $_GET['modif_quizz']);
                    }
                    else if(isset($_GET['modif_categorie']))
                    {
                        getCategoryModifForm($database, $_GET['modif_categorie']);
                    }
                    else if(isset($_GET['modif_question']))
                    {
                        getQuestionModifForm($database, $_GET['modif_question']);
                    }
                    else if(isset($_GET['modif_user']))
                    {
                        getUserModifForm($database,$_GET['modif_user']);
                    }
                    else if(isset($_GET['delete_quizz'])){
                        getQuizzDeleteForm($database, $_GET['delete_quizz']);
                    }
                    else if(isset($_GET['delete_categorie']))
                    {
                        getCategoryDeleteForm($database, $_GET['delete_categorie']);
                    }
                    else if(isset($_GET['delete_question']))
                    {
                        getQuestionDeleteForm($database, $_GET['delete_question']);
                    }
                    else if(isset($_GET['delete_score']))
                    {
                        getScoreDeleteForm($database, $_GET['delete_score']);
                    }
                    else if(isset($_GET['delete_user']))
                    {
                        getUserDeleteForm($database, $_GET['delete_user']);
                    }
                    else if(isset($_GET['quizz_deleted']) && isset($_GET['confirmation']))
                    {
                        if($_GET['confirmation'] == 'SUPPRIMER')
                        {
                            deleteQuizz($database, $_GET['quizz_deleted']);
                        }
                    }
                    else if(isset($_GET['nouveau_quizz']))
                    {
                        getNewQuizzForm($database);
                    }
                    else if(isset($_GET['new_quizz']))
                    {
                        if($_GET['confirmation'] == 'ENREGISTRER')
                        {
                            newQuizz($database,$_GET['quizz_name_add'],$_GET['quizz_desc_add'],$_GET['quizz_category_add']);
                        }
                    }
                    else if(isset($_GET['quizz_modif_id']))
                    {
                        if($_GET['confirmation'] == 'MODIFIER')
                        {
                            modifQuizz($database,$_GET['quizz_modif_id'],$_GET['quizz_name_modif'],$_GET['quizz_desc_modif'],$_GET['quizz_category_modif']);
                        }
                    }
                    else if(isset($_GET['nouvelle_categorie']))
                    {
                        getNewCategoryForm($database);
                    }
                    else if(isset($_GET['new_category']))
                    {
                        if($_GET['confirmation'] == 'ENREGISTRER'){
                            newCategory($database, $_GET['category_name_add']);
                        }
                    }
                    else if(isset($_GET['categorie_deleted']))
                    {
                        deleteCategory($database, $_GET['categorie_deleted']);
                    }
                    else if(isset($_GET['nouvelle_question']))
                    {
                        getNewQuestionForm($database);
                    }
                    else if(isset($_GET['new_question']))
                    {
                        if($_GET['confirmation'] == 'ENREGISTRER'){

                            $goodans = array();
                            $arrayI = 0;

                            for ($ite=0; $ite<=4; $ite++) {
                                if(isset($_GET['question_rep'.$ite.'_goodans_add']))
                                {
                                    if($_GET['question_rep'.$ite.'_goodans_add'] == "on")
                                    {
                                        $goodans[$arrayI] = $ite;
                                        $arrayI++;
                                    }
                                }
                            }

                            newQuestion($database, $_GET['question_label_add'], $_GET['question_rep1_add'], $_GET['question_rep2_add'], $_GET['question_rep3_add'], $_GET['question_rep4_add'], $goodans, $_GET['question_feedback_add'], $_GET['question_categorie_add']);

                        }
                    }
                    else if(isset($_GET['question_modif_id']))
                    {
                        $goodans_modif = array();
                        $arrayI_modif = 0;

                        for ($ite=0; $ite<=4; $ite++) {
                            if(isset($_GET['question_rep'.$ite.'_goodans_modif']))
                            {
                                if($_GET['question_rep'.$ite.'_goodans_modif'] == "on")
                                {
                                    $goodans_modif[$arrayI_modif] = $ite;
                                    $arrayI_modif++;
                                }
                            }
                        }

                        updateQuestion($database, $_GET['question_modif_id'], $_GET['question_label_modif'], $_GET['question_rep1_modif'], $_GET['question_rep2_modif'], $_GET['question_rep3_modif'], $_GET['question_rep4_modif'], $goodans_modif, $_GET['question_feedback_modif'], $_GET['question_categorie_modif']);

                    }
                    else if(isset($_GET['question_deleted']))
                    {
                        deleteQuestion($database, $_GET['question_deleted']);
                    }
                    else if(isset($_GET['score_deleted']))
                    {
                        deleteScore($database, $_GET['score_deleted']);
                    }
                    else if(isset($_GET['user_modif_id']))
                    {
                        $isadmin = false;
                        if($_GET['confirmation'] == 'MODIFIER')
                        {
                            
                            if(isset($_GET['user_isadmin']))
                            {
                                $isadmin = true;
                            }
                            
                            updateUser($database, $_GET['user_modif_id'],$_GET['user_name_modif'], $_GET['user_email_modif'], $isadmin);
                        }
                    }
                    else if(isset($_GET['user_deleted']))
                    {
                        deleteUser($database, $_GET['user_deleted']);
                    }


                }
                else{
                    echo "<p>Compte non administrateur</p>
                            <a href='../../'>Retourner sur la page d'accueil</a>";

                            print($_SESSION['user_isadmin']);
                }

            ?>

            </div>
        </div>
    </section>
</body>
</html>
