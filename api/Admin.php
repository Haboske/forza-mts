<?php
require "Html_table_framework.php";

# TOUS LES COMMENTAIRES DE SONT UNIQUEMENT PRESENT DANS LA PARTIE QUIZZ
# POUR UNE SIMPLE RAISON DE TEMPS ET D'ORGANISATION, LES AUTRES PARTIES SE RESSEMBLENT C'EST GENERALEMENT DU COPIE COLLIE DE LA PARTIE QUIZZ
# IL Y A PLUSIEURS MANIERES DE GERER UN FORMULAIRE EN BACKEND, SOIT EN POST SOIT EN GET
# TOUS LE BACKOFFICE A ETE GERE AVEC LE GET?
# SI VOUS VOULEZ VOIR L'UTILISATION DU POST CE SERA SUR TOUTE LA PARTIE CONNEXION, INSCRIPTION et RESET
# SOIT : traitement_connexion.php, traitement_inscription.php etc.
# J'AI EGALEMENT CONFIANCE DE NE PAS AVOIR SECURISE LES INFORMATIONS QUE J'ENVOIE DANS MES REQUETES SQL, IL Y A PLUSIEURS RAISONS A CELA :
# 1 - MANQUE DE TEMPS MALGRE LE TEMPS SUPPLEMENTAIRE QUE VOUS NOUS AVEZ DONNEE ON S'EST CONCENTRES SUR LE PYTHON
# 2 - JE ME SUIS REPOSE SUR LE FRAMEWORK MEDOO QUI SECURISE DEJA TOUTES LES REQUETES A NOTRE PLACE

// FONCTIONS QUIZZ

# Fonction permettant de récupérer la liste des quizz
function getQuizzList($database){

    # On va définir les headers des tables
    $headers = array('Id','Nom','Description','Catégorie');
    # Et les classes des tables
    $headers_class = array('id','category','label','category');

    # On récupère la table que l'on souhaite affihcer
    $quizzList = $database->select('quizz',[
        'quizz_id',
        'quizz_name',
        'quizz_desc',
        'categorie_foreign_id'
    ]);

    # on l'affiche
    
    echo '  <div class="w-layout-blockcontainer admin-container-heading w-container">
                <h1 class="heading-2">QUIZZ</h1>
                <div class="button-wrapper">
                    <a href="http://'.$_SERVER['SERVER_NAME'].'/backoffice.php?nouveau_quizz=true" class="new-button">NOUVEAU QUIZZ</a>
                </div>
            </div>'; 


                # On va afficher la table avec une boucle qui va parcourir notre liste
                # La fonction setList est une fonction créé dans Html_table_framework.php qui permet de d'imprimer la nomenclature des listes html afin d'éviter les répétitions
                setList($headers, $headers_class);
                $i = 0;
                # Le booléen pair est seulement là pour déterminer si l'index qu'on parcour est pair ou non et attribuer une classe css en fonction
                $pair = false;
                foreach($quizzList as $quizz){

                    # est pair ou non
                    if($i%2==0 | $i == 0){
                        $pair = true;
                    }else{
                        $pair = false;
                    }

                    # on récupère le nom de la catégorie associé au quizz
                    $cat = $database->select('quizz_categorie',[
                        'categorie_name'
                    ],[
                        'categorie_id' => $quizz['categorie_foreign_id']
                    ])[0]['categorie_name'];

                    $quizz['categorie_foreign_id'] = $cat;
                
                    # On imprime notre ligne grâce à cette fonction présente dans Html_table_framework.php 
                    setListItem('quizz',$quizz, $headers_class, true, true, $pair);
                    
                    $i++;

                }

                # fonction permettant de cloturer la liste en html, fonction présente dans Html_table_framework.php
                endList();



};

# Fonction permettant de générer le formulaire de modification d'un quizz
function getQuizzModifForm($database, $id){
    // On vient récupére les infos du quizz en question
    $quizz = $database->select('quizz',[
        'quizz_id',
        'categorie_foreign_id',
        'quizz_name',
        'quizz_desc'
    ],[
        'quizz_id' => $id
    ]);

    // On va récupérer la catégorie de la clé étrangère de notre quizz
    $quizz_categorie = $database->select('quizz_categorie',[
        'categorie_name'
    ],[
        'categorie_id' => $quizz[0]['categorie_foreign_id']
    ])[0]['categorie_name'];

    // On va également récupérer la liste de catégories pour l'insérer dans notre select
    $categories = $database->select('quizz_categorie',[
        'categorie_id',
        'categorie_name'
    ]);

    // Et enfin générer le form
    // On pré rempli le formulaire avec les valeurs récupéré via notre requete sql
    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Modification du quizz n°'.$quizz[0]['quizz_id'].'</h1>
                <h3 class="modif_form_subheading">'.$quizz[0]['quizz_name'].'</h3>
            </div>
            <div class="w-form">
                <form id="admin_modif_form" name="quizz_modif_form" method="get" class="admin_modif_form">
                    <input type="hidden" name="quizz_modif_id" value="'.$quizz[0]['quizz_id'].'">

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif" class="modif_form_label">Nom du quizz</label>
                        <input type="text" class="modif_form_input_text w-input" maxlength="256" name="quizz_name_modif" id="quizz_name_modif" value="'.$quizz[0]['quizz_name'].'" required>
                    </div>

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_desc_modif" class="modif_form_label">Description</label>
                        <textarea maxlength="5000" id="quizz_desc_modif" name="quizz_desc_modif" class="modif_form_input_text large w-input">'.$quizz[0]['quizz_desc'].'</textarea>
                    </div>

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_category_modif" class="modif_form_label">Catégorie</label>
                        <select id="quizz_category_modif" name="quizz_category_modif" data-name="quizz_category_modif" required class="modif_form_input_select w-select">';
    
                

                            foreach ($categories as $cat){
                                if($cat['categorie_id'] == $quizz[0]['categorie_foreign_id']){
                                    echo '<option value="'.$cat['categorie_id'].'" selected>'.$cat['categorie_name'].'</option>'; 
                                }
                                else
                                {
                                    echo '<option value="'.$cat['categorie_id'].'">'.$cat['categorie_name'].'</option>';
                                }
                            }                

                    
    echo                '</select>
                    </div>
                    <input type="submit" name="confirmation" value="MODIFIER" class="modif_form_submit w-button">
                </form>
            </div>';


};

# Fonction permettant de générer le formulaire de suppression d'un quizz
function getQuizzDeleteForm($database, $id){

    # On récupère les informations du quizz que l'on souhaite delete
    $quizz = $database -> select('quizz',[
        'quizz_id',
        'quizz_name'
    ],[
        'quizz_id' => $id
    ]);

    # On récupères quelques informations à afficher dans notre interface
    $count = $database -> count('quizz_users_scores',[
        'quizz_foreign_id' => $quizz[0]['quizz_id']
    ]);

    # et ensuite on va venir générer le formulaire de suppréssion
    # le input type hidden nous permet d'identifier quel quizz on souhaite supprimer lors de l'envoie du formulaire en contenant l'id du quizz en question
    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Êtes-vous sûr de vouloir supprimer ce quizz ? <br></h1>
            </div>
            <div class="w-form">
            <form id="quizz_delete_form" name="quizz_delete_form" method="get" class="admin_modif_form">
                <input type="hidden" name="quizz_deleted" value="'.$quizz[0]['quizz_id'].'">
                <h3 class="modif_form_subheading delete">'.$quizz[0]['quizz_name'].'</h3>
                <div class="admin_modif_form_wrapper">
                    <label for="quizz_name_modif" class="modif_form_label">
                        id du quizz : 
                        <span class="data_span">'.$quizz[0]['quizz_id'].'</span>
                    </label>
                </div>
                <div class="admin_modif_form_wrapper">
                    <label for="quizz_name_modif" class="modif_form_label">
                        Nombre de score enregistré sur ce quizz : 
                        <span class="data_span">'.$count.'</span>
                    </label>
                </div>
                <input type="submit" name="confirmation" value="SUPPRIMER" class="modif_form_submit delete w-button">
            </form>';

};

# Fonction permettant de générer le formulaire d'ajout d'un quizz
function getNewQuizzForm($database){

    # On vient récupérer les différentes catégories pour générer notre select
    $categories = $database->select('quizz_categorie',[
        'categorie_id',
        'categorie_name'
    ]);

    # Et on affiche notre formulaire
    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Créer un nouveau quizz</h1>
            </div>
            <div class="w-form">
                <form id="admin_add_form" name="quizz_add_form" method="get" class="admin_modif_form">

                    <input type="hidden" name="new_quizz" value="true">

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_add" class="modif_form_label">Nom du quizz</label>
                        <input type="text" class="modif_form_input_text w-input" maxlength="256" name="quizz_name_add" id="quizz_name_add" placeholder="Nom du quizz" required>
                    </div>

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_desc_add" class="modif_form_label">Description</label>
                        <textarea maxlength="5000" id="quizz_desc_add" name="quizz_desc_add" class="modif_form_input_text large w-input">Ici la description de votre quizz</textarea>
                    </div>

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_category_add" class="modif_form_label">Catégorie</label>
                        <select id="quizz_category_add" name="quizz_category_add" data-name="quizz_category_add" required class="modif_form_input_select w-select">';
                            foreach ($categories as $cat){
                                    echo '<option value="'.$cat['categorie_id'].'">'.$cat['categorie_name'].'</option>';
                            };
                                           
            echo       '</select>
                    </div>
                    <input type="submit" name="confirmation" value="ENREGISTRER" class="modif_form_submit w-button">
                </form>
            </div>';
}

# Fonction permettant de créer un nouveau quizz en BDD
function newQuizz($database,$name,$description,$category){
    
    try{
        $database -> insert('quizz',[
            'quizz_name' => htmlspecialchars($name),
            'quizz_desc' => htmlspecialchars($description),
            'categorie_foreign_id' => $category
        ]);
        echo 'Nouveau quizz crée ! ';
    }
    catch(Exception $e)
    {
        echo '<h1>Il y a une erreur</h1>';
    }
}

# Fonction permettant de supprimer un quizz en BDD
function deleteQuizz($database, $id){

    try{

        # ON DELETE TOUTES LES LIGNES DES AUTRES TABLES QUI SONT DEPENDANT DU QUIZZ
        $database -> delete('quizz_users_scores',[
            'quizz_forein_id' => $id
        ]);

        echo '<h1>Les scores ont bien été supprimées</h1>';

        $database -> delete('quizz_questions',[
            'categorie_foreign_id' => $id
        ]);

        echo '<h1>Les questions ont bien été supprimées</h1>';

        $database -> delete('quizz',[
            'quizz_id' => $id
        ]);

        echo '<h1>Le quizz a bien été supprimé !</h1>';

    }
    catch (Exception $e) 
    {

        echo '<h1>Il y a une erreur</h1>';

    //echo 'Exception reçue : ',  $e->getMessage(), "\n";

    }


};

# Fonction permettant de modifier un quizz en bdd
function modifQuizz($database, $id, $name, $description, $category){
    try{
        $database -> update('quizz',[
            'quizz_name' => htmlspecialchars($name),
            'quizz_desc' => htmlspecialchars($description),
            'categorie_foreign_id' => htmlspecialchars($category)
        ],[
            'quizz_id' => $id
        ]);
        echo 'quizz modifié !';
    }
    catch(Exception $e)
    {
        echo 'il y a eu une erreur !';
    }
}

// FONCTIONS CATEGORIES
function getCategoryList($database){

    $headers = array('Id','Categorie');
    $headers_class = array('id','category');
    
    $categorieList = $database->select('quizz_categorie',[
        'categorie_id',
        'categorie_name'
    ]);

    echo '  <div class="button-wrapper">
                <a href="http://'.$_SERVER['SERVER_NAME'].'/backoffice.php?nouvelle_categorie=true" class="new-button">NOUVELLE CATEGORIE</a>
            </div>';


    $pair = false;
    $i = 0;
    setList($headers, $headers_class);
    foreach($categorieList as $cat){

        if($i%2==0 | $i == 0){
            $pair = true;
        }else{
            $pair = false;
        }

        setListItem('categorie',$cat, $headers_class, true, true, $pair);

        $i++;
    }
    endList();
};

function getCategoryModifForm($database, $id){

    // On vient récupérer les infos de la catégorie en question
    $category = $database -> select('quizz_categorie',[
        'categorie_id',
        'categorie_name'
    ],[
        'categorie_id' => $id
    ]);

    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Modification de la catégorie n°'.$category[0]['categorie_id'].'</h1>
                <h3 class="modif_form_subheading">'.$category[0]['categorie_name'].'</h3>
            </div>
            <div class="w-form">
                <form id="admin_modif_form" name="categorie_modif_form" method="get" class="admin_modif_form">
                    <input type="hidden" name="categorie_modif_id" value="'.$category[0]['categorie_id'].'">

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif" class="modif_form_label">Nom du quizz</label>
                        <input type="text" class="modif_form_input_text w-input" maxlength="256" name="quizz_name_modif" id="quizz_name_modif" value="'.$category[0]['categorie_name'].'" required>
                    </div>
                    <input type="submit" value="Enregistrer" class="modif_form_submit w-button">                
                </form>
            </div>';

};

function getCategoryDeleteForm($database, $id){
    $category = $database -> select('quizz_categorie',[
        'categorie_id',
        'categorie_name',
    ],[
        'categorie_id' => $id
    ]);

    echo '
        <form>
            <input type="hidden" name="categorie_deleted" value="'.$category[0]['categorie_id'].'">
            <h1>Supprimer : '.$category[0]['categorie_name'].' ?</h1>
            <input type="submit" value="SUPPRIMER" class="modif_form_submit delete w-button">
        </form>
    
    ';
};

function getNewCategoryForm($database){
    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Créer une nouvelle catégorie</h1>
            </div>
            <div class="w-form">
                <form id="admin_modif_form" name="categorie_add_form" method="get" class="admin_modif_form">
                    <input type="hidden" name="new_category" value="true">

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif" class="modif_form_label">Nom du quizz</label>
                        <input type="text" class="modif_form_input_text w-input" maxlength="256" name="category_name_add" id="quizz_name_modif" placeholder="Nom de catégorie" required>
                    </div>
                    <input type="submit" name="confirmation" value="ENREGISTRER" class="modif_form_submit w-button">                
                </form>
            </div>';
}

function newCategory($database, $name){
    try{
        $database -> insert('quizz_categorie',[
            'categorie_name' => htmlspecialchars($name)
        ]);
        echo 'enregistrement réussie';
    }
    catch(Excepetion $e)
    {
        echo "Il y a une erreure";
    }
}

function deleteCategory($database, $id){
    try{
        $quizz_id = $database -> select('quizz',[
            'quizz_id'
        ],[
            'categorie_foreign_id' => $id
        ]);

        $database -> delete('quizz',[
            'categorie_foreign_id' => $id
        ]);

        echo '<h1>Les quizz ont bien été supprimés</h1>';

        $database -> delete('quizz_questions',[
            'categorie_foreign_id' => $id
        ]);

        echo '<h1>Les questions ont bien été supprimées</h1>';

        $database -> delete('quizz_users_scores',[
            'quizz_foreign_id' => $quizz_id[0]['quizz_id']
        ]);

        echo '<h1>Les scores ont bien été supprimés</h1>';

        $database -> delete('quizz_categorie',[
            'categorie_id' => $id
        ]);

        echo "suppression réussi";
    }
    catch(Exception $e)
    {
        echo 'il y a une erreur';
    }
}

// FONCTIONS QUESTIONS
function getQuestionList($database){

    $headers = array('Id','Catégorie','Label','Type');
    $headers_class = array('id','category','label','type');

    $questionsList = $database->select('quizz_questions',[
        'question_id',
        'categorie_foreign_id',
        'question_label',
        'question_good_ans'
    ]);

    echo '  <div class="button-wrapper">
                <a href="http://'.$_SERVER['SERVER_NAME'].'/backoffice.php?nouvelle_question=true" class="new-button">NOUVELLE QUESTION</a>
            </div>';

    setList($headers, $headers_class);
    $i = 0;
    $pair = false;
    foreach ($questionsList as $question){

        if($i%2==0 | $i == 0){
            $pair = true;
        }else{
            $pair = false;
        }

        $cat = $database->select('quizz_categorie',[
            'categorie_name'
        ],[
            'categorie_id' => $question['categorie_foreign_id']
        ])[0]['categorie_name'];

        $question['categorie_foreign_id'] = $cat;
        $good_answer = intval($question['question_good_ans']);
        if($good_answer >= 1 && $good_answer <= 4){
            $question['question_good_ans'] = 'QCU';
        }
        elseif ($good_answer > 10){
            $question['question_good_ans'] = 'QCM';
        }
        else{
            $question['question_good_ans'] = 'error';
        };
  
        setListItem('question',$question, $headers_class, true, true, $pair);

        $i++;

    };
    endList();

};

function getQuestionModifForm($database, $id){

    // On va récupérer la question que l'on souhaite modifier
    $question = $database -> select('quizz_questions',[
        'question_id',
        'categorie_foreign_id',
        'question_label',
        'question_rep1',
        'question_rep2',
        'question_rep3',
        'question_rep4',
        'question_good_ans',
        'question_feedback'
    ],[
        'question_id' => $id
    ]);

    // On va récupérer la catégorie de la clé étrangère de notre quizz
    $quizz_categorie = $database->select('quizz_categorie',[
        'categorie_name'
    ],[
        'categorie_id' => $question[0]['categorie_foreign_id']
    ])[0]['categorie_name'];

    // On va également récupérer la liste de catégories pour l'insérer dans notre select
    $categories = $database->select('quizz_categorie',[
        'categorie_id',
        'categorie_name'
    ]);

    // On vient initialiser les variables booléene qui permettent de déterminer quelle réponse est la bonne
    $answer1=false;
    $answer2=false;
    $answer3=false;
    $answer4=false;

    // Ensuite on récupère les données qui nous indique quelles sont les bonnes rep en SQL et on va les splits pour les comparer
    $goodAnswers = str_split($question[0]['question_good_ans']);
    foreach($goodAnswers as $number){
        if($number == '1')
        {
            $answer1 = true;
        }
        else if ($number == '2')
        {
            $answer2 = true;
        }
        else if ($number == '3')
        {
            $answer3 = true;
        }
        else if ($number == '4')
        {
            $answer4 = true;
        }
    };

    // Et enfin générer le form
    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Modification de la question :</h1>
                <h3 class="modif_form_subheading">'.$question[0]['question_label'].'</h3>
            </div>
            <div class="w-form">
                <form id="admin_modif_form" name="question_modif_form" method="get" class="admin_modif_form">
            
                    <input type="hidden" name="question_modif_id" value="'.$question[0]['question_id'].'">

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif" class="modif_form_label">Label</label>
                        <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_label_modif" id="question_label_modif" value="'.$question[0]['question_label'].'" required>
                    </div>

                    <div class="admin_modif_form_wrapper answers">

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep1_modif" class="modif_form_label small">Réponse 1</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep1_modif" id="question_rep1_modif" required value="'.$question[0]['question_rep1'].'">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep1_goodans_modif" name="question_rep1_goodans_modif" class="w-checkbox-input modif_form_checkbox"';if($answer1){echo'checked';}echo'>
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep1_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep2_modif" class="modif_form_label small">Réponse 2</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep2_modif" id="question_rep2_modif" required value="'.$question[0]['question_rep2'].'">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep2_goodans_modif" name="question_rep2_goodans_modif" class="w-checkbox-input modif_form_checkbox" ';if($answer2){echo'checked';}echo'>
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep2_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep3_modif" class="modif_form_label small">Réponse 3</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep3_modif" id="question_rep3_modif" required value="'.$question[0]['question_rep3'].'">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep3_goodans_modif" name="question_rep3_goodans_modif" class="w-checkbox-input modif_form_checkbox" ';if($answer3){echo'checked';}echo'>
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep3_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep4_modif" class="modif_form_label small">Réponse 4</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep4_modif" id="question_rep4_modif" required value="'.$question[0]['question_rep4'].'">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep4_goodans_modif" name="question_rep4_goodans_modif" class="w-checkbox-input modif_form_checkbox" ';if($answer4){echo'checked';}echo'>
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep4_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>
                    
                    </div>
                    <div class="admin_modif_form_wrapper">
                        <label for="question_feedback_modif" class="modif_form_label">Feedback</label>
                        <textarea placeholder="" maxlength="5000" id="question_feedback_modif" name="question_feedback_modif" class="modif_form_input_text large w-input">'.$question[0]['question_feedback'].'</textarea>
                    </div>
                    <div class="admin_modif_form_wrapper">
                        <label for="question_categorie_modif" class="modif_form_label">Catégorie</label>
                        <select id="question_categorie_modif" name="question_categorie_modif" required class="modif_form_input_select w-select">
                    ';
                            foreach ($categories as $cat){
                                if($cat['categorie_id'] == $question[0]['categorie_foreign_id']){
                                    echo '<option value="'.$cat['categorie_id'].'" selected>'.$cat['categorie_name'].'</option>'; 
                                }
                                else
                                {
                                    echo '<option value="'.$cat['categorie_id'].'">'.$cat['categorie_name'].'</option>';
                                }
                            };      
    echo            '   </select>
                    </div>
                    <input type="submit" value="Enregistrer" class="modif_form_submit w-button">                
                </form>
            </div>';

};

function getQuestionDeleteForm($database, $id){
    $question = $database -> select('quizz_questions',[
        'question_id',
        'question_label'
    ],[
        'question_id' => $id
    ]);

    echo '
        <form>
            <input type="hidden" name="question_deleted" value="'.$question[0]['question_id'].'">
            <h1>Supprimer : '.$question[0]['question_label'].' ?</h1>
            <input type="submit" value="SUPPRIMER" class="modif_form_submit delete w-button">
        </form>
    
    ';
    
};

function getNewQuestionForm($database){

    // On va également récupérer la liste de catégories pour l'insérer dans notre select
    $categories = $database->select('quizz_categorie',[
        'categorie_id',
        'categorie_name'
    ]);

     // Et enfin générer le form
     echo ' <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Créer une nouvelle question</h1>
            </div>
            <div class="w-form">
                <form id="admin_modif_form" name="question_modif_form" method="get" class="admin_modif_form">

                    <input type="hidden" name="new_question" value="true">



                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif" class="modif_form_label">Label</label>
                        <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_label_add" id="question_label_modif" placeholder="Quelle est la question ?" required>
                    </div>

                    <div class="admin_modif_form_wrapper answers">

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep1_modif" class="modif_form_label small">Réponse 1</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep1_add" id="question_rep1_modif" required placeholder="ceci est la réponse 1">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep1_goodans_modif" name="question_rep1_goodans_add" class="w-checkbox-input modif_form_checkbox">
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep1_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep2_modif" class="modif_form_label small">Réponse 2</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep2_add" id="question_rep2_modif" required placeholder="ceci est la réponse 2">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep2_goodans_modif" name="question_rep2_goodans_add" class="w-checkbox-input modif_form_checkbox">
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep2_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep3_modif" class="modif_form_label small">Réponse 3</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep3_add" id="question_rep3_modif" required placeholder="ceci est la réponse 3">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep3_goodans_modif" name="question_rep3_goodans_add" class="w-checkbox-input modif_form_checkbox">
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep3_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>

                        <div class="admin_modif_form_wrapper">
                            <label for="question_rep4_modif" class="modif_form_label small">Réponse 4</label>
                            <input type="text" class="modif_form_input_text w-input" maxlength="256" name="question_rep4_add" id="question_rep4_modif" required placeholder="ceci est la réponse 4">
                            <label class="w-checkbox modif_form_checkbox_field">
                                <input type="checkbox" id="question_rep4_goodans_modif" name="question_rep4_goodans_add" class="w-checkbox-input modif_form_checkbox">
                                <span class="modif_form_checkbox_label w-form-label" for="question_rep4_goodans_modif">Est-une bonne réponse ?</span>
                            </label>
                        </div>
                    
                    </div>
                    <div class="admin_modif_form_wrapper">
                        <label for="question_feedback_modif" class="modif_form_label">Feedback</label>
                        <textarea placeholder="" maxlength="5000" id="question_feedback_modif" name="question_feedback_add" class="modif_form_input_text large w-input">ceci est le feedback de la réponse en question</textarea>
                    </div>
                    <div class="admin_modif_form_wrapper">
                        <label for="question_categorie_modif" class="modif_form_label">Catégorie</label>
                        <select id="question_categorie_modif" name="question_categorie_add" required class="modif_form_input_select w-select">
                    ';
                            foreach ($categories as $cat){
                                    echo '<option value="'.$cat['categorie_id'].'">'.$cat['categorie_name'].'</option>';            
                            };      
            echo            '   </select>
                    </div>
                    <input type="submit" name="confirmation" value="ENREGISTRER" class="modif_form_submit w-button">                
                </form>
            </div>';

}

function newQuestion($database, $label, $rep1, $rep2, $rep3, $rep4, $goodrep, $feedback, $category){
    
   $goodrep = implode($goodrep);

   try{
        $database -> insert('quizz_questions',[
            'categorie_foreign_id' => htmlspecialchars($category),
            'question_label' => htmlspecialchars($label),
            'question_rep1' => htmlspecialchars($rep1),
            'question_rep2' => htmlspecialchars($rep2),
            'question_rep3' => htmlspecialchars($rep3),
            'question_rep4' => htmlspecialchars($rep4),
            'question_good_ans' => htmlspecialchars($goodrep),
            'question_feedback' => htmlspecialchars($feedback)
        ]);
        echo 'enregistrement réussi';
   }
   catch (Exception $e)
   {
        echo 'il y a une erreur';
   }


}

function updateQuestion($database, $id, $label, $rep1, $rep2, $rep3, $rep4, $goodrep, $feedback, $category){

    $goodrep = implode($goodrep);

    try{
         $database -> update('quizz_questions',[
             'categorie_foreign_id' => htmlspecialchars($category),
             'question_label' => htmlspecialchars($label),
             'question_rep1' => htmlspecialchars($rep1),
             'question_rep2' => htmlspecialchars($rep2),
             'question_rep3' => htmlspecialchars($rep3),
             'question_rep4' => htmlspecialchars($rep4),
             'question_good_ans' => htmlspecialchars($goodrep),
             'question_feedback' => htmlspecialchars($feedback)
         ],[
            'question_id' => $id
         ]);
         echo 'enregistrement réussi';
    }
    catch (Exception $e)
    {
         echo 'il y a une erreur';
    }

}

function deleteQuestion($database, $id){
    try{
        $database -> delete('quizz_questions',[
            'question_id' => $id
        ]);

        echo 'question supprimé';
    }
    catch (Exception $e)
    {
        echo 'il y a une erreur';
    }
}



// FONCTIONS USERS
function getUserList($database){

    
    $tr = '<tr>';
    $trA = '</tr>';

    $headers = array('Id','Pseudos','Email','Admin');
    $headers_class = array('id','pseudo','label','type');

    // avec le framework medoo, le select fonctionne comme une fonction où l'on rentre des paramètre plutôt que de faire des requêtes SQL
    $userList = $database->select('users',[
        'user_id',
        'user_pseudo',
        'user_email',
        'user_isadmin'
    ]);

    $i = 0;
    $pair = false;
    setList($headers, $headers_class);
    foreach($userList as $user){

        $i;
        if($i%2==0 | $i == 0){
            $pair = true;
        }else{
            $pair = false;
        }

        setListItem('user',$user, $headers_class, true, true, $pair);

        $i++;
    }
    endList();

};

function getUserModifForm($database, $id){
    $user = $database -> select('users',[
        'user_id',
        'user_pseudo',
        'user_email',
        'user_isadmin' 
    ],[
        'user_id' => $id
    ]);

    echo '  <div class="admin_modif_form_wrapper">
                <h1 class="modif_form_heading">Modification de l&#x27;utilisateur n°'.$user[0]['user_id'].'</h1>
                <h3 class="modif_form_subheading">'.$user[0]['user_pseudo'].'</h3>
            </div>      
            <div class="w-form">
                <form id="admin_modif_form" name="user_modif_form" method="get" class="admin_modif_form">
                    <input type="hidden" name="user_modif_id" value="'.$user[0]['user_id'].'">

                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif" class="modif_form_label">PSEUDO</label>
                        <input type="text" class="modif_form_input_text w-input" autofocus="true" maxlength="256" name="user_name_modif" id="quizz_name_modif" value="'.$user[0]['user_pseudo'].'">
                    </div>
                    <div class="admin_modif_form_wrapper">
                        <label for="quizz_name_modif-2" class="modif_form_label">Email</label>
                        <input type="text" class="modif_form_input_text w-input" autofocus="true" maxlength="256" name="user_email_modif" id="quizz_name_modif-2" value="'.$user[0]['user_email'].'">
                    </div>
                    <label class="w-checkbox modif_form_checkbox_field">
                        <input type="checkbox" id="question_rep1_goodans_modif" name="user_isadmin" data-name="Question Rep 1 Goodans Modif" class="w-checkbox-input modif_form_checkbox"';if($user[0]['user_isadmin']){echo 'checked';}  echo'>
                        <span class="modif_form_checkbox_label w-form-label" for="question_rep1_goodans_modif">L&#x27;utilisateur est-il un admin ?</span>
                    </label>
                    <input type="submit" name="confirmation" value="MODIFIER" class="modif_form_submit w-button">
                </form>
            </div>';
};

function getUserDeleteForm($database, $id){

    $user = $database -> select('users',[
        'user_id',
        'user_pseudo'
    ],[
        'user_id' => $id
    ]);

    echo '
        <form>
            <input type="hidden" name="user_deleted" value="'.$user[0]['user_id'].'">
            <h1>Supprimer : '.$user[0]['user_pseudo'].' ?</h1>
            <input type="submit" value="SUPPRIMER" class="modif_form_submit delete w-button">
        </form>
    ';

};

function updateUser($database, $id, $name, $email, $isadmin){

    if($isadmin){
        $isadmin = 1;
    }
    else{
        $isadmin = 0;
    }

    try{
        $database -> update('users',[
            'user_pseudo' => htmlspecialchars($name),
            'user_email' => htmlspecialchars($email),
            'user_isadmin' => $isadmin
        ],[
            'user_id' => $id
        ]);

        echo 'modification réussi';

    }
    catch (Exception $e)
    {
        echo 'il y a une erreur';
    }
}

function deleteUser($database, $id){
    try
    {

        $database -> delete('quizz_users_scores',[
            'player_foreign_id' => $id
        ]);

        echo 'scores supprimés';

        $database -> delete('users',[
            'user_id' => $id
        ]);

        echo 'utilisateur supprimé';
        
    }
    catch(Exception $e)
    {
        echo 'il y a une erreur';
    }
}

// FONCTIONS SCORES
function getScoreList($database){

    $headers = array('Id','Joueur','Quizz','Score');
    $headers_class = array('id','category','label','category');

    $scoreList = $database->select('quizz_users_scores',[
        'score_id',
        'player_foreign_id',
        'quizz_foreign_id',
        'score'
    ]);

    $i = 0;
    $pair = false;
    setList($headers, $headers_class);
    foreach($scoreList as $score){
        
        if($i%2==0 | $i == 0){
            $pair = true;
        }else{
            $pair = false;
        }

        $user = $database -> select('users',[
            'user_pseudo'
        ],[
            'user_id' => $score['player_foreign_id']
        ]);

        $score['player_foreign_id'] = $user[0]['user_pseudo'];

        $quizz = $database -> select('quizz',[
            'quizz_name'
        ],[
            'quizz_id' => $score['quizz_foreign_id']
        ]);

        $score['quizz_foreign_id'] = $quizz[0]['quizz_name'];

        setListItem('score',$score, $headers_class, false, true, $pair);

        $i++;

    }
    endList();

};

function getScoreDeleteForm($database, $id){
    $score = $database -> select('quizz_users_scores',[
        'score_id',
        'player_foreign_id',
        'quizz_foreign_id',
        'score'
    ],[
        'score_id' => $id
    ]);

    $player = $database -> select('users',[
        'user_pseudo'
    ],[
        'user_id' => $score[0]['player_foreign_id']
    ]);

    $quizz = $database -> select('quizz',[
        'quizz_name'
    ],[
        'quizz_id' => $score[0]['quizz_foreign_id']
    ]);

    echo '
        <form>
            <input type="hidden" name="score_deleted" value="'.$score[0]['score_id'].'">
            <h1>Supprimer le score de '.$player[0]['user_pseudo'].' sur le quizz '.$quizz[0]['quizz_name'].' ?</h1>
            <label>Le score était de '.$score[0]['score'].'/10</label>
            <input type="submit" value="SUPPRIMER" class="modif_form_submit delete w-button">
        </form>
    ';
};

function deleteScore($database, $id){
    try{
        $database -> delete('quizz_users_scores',[
            'score_id' => $id
        ]);
        
        echo 'score supprimé';
    }
    catch (Exception $e){
        echo 'il y a une erreur';
    }
}


























?>