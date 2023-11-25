<?php
// On créer une fonction qui va nous permettre de générer des tables, afin d'éviter d'inonder nos générateur de liste de "echo" à tout va
function setTable($headers){

    $th = '<th>';
    $thA = '</th>';
    $i = 0;

    echo "<table><thead><tr>";
    foreach ($headers as $thead){
        echo $th.$thead.$thA;
    }
    echo "</tr></thead><tbody>";

}

# On créer une fonction qui ferme notre table en html
function endTable(){
    echo "</tbody></table>";
}

# On créer une fonction qui insère un item dans un td
function td($text){
    return "<td>".$text."</td>";
}

# On créer une fonction qui génère le header d'une liste en html avec les classes présentes dans la propriétés header_class
function setList($headers, $headers_class){

    $i = 0;

    echo '<div class="list-container">
            <ol role="list" class="list_item w-list-unstyled">
                <li class="list-item heading impair">';

    # Pour chaque tête de colonne dans notre array
    foreach($headers as $liHeading){
        # On génère une tête de colonne
        echo '<div class="list_item_text '.$headers_class[$i].'">'.$liHeading.'</div>';
        $i++;
    }
    echo '</li>';

}

# On créer une fonction qui permet d'insérer un item dans notre liste
function setListItem($listType,$items, $items_class, $updateButton, $deleteButton, $pair){

    $i = 0;
    $pairCLass = 'impair';
    if($pair){
        $pairCLass = '';
    }

    echo '<li class="list-item '.$pairCLass.'">';

    # Pour chaque text présent dans notre item alors
    foreach ($items as $item){
        # On l'affiche
        echo '<div class="list_item_text '.$items_class[$i].'">'.$item.'</div>';
        if($i==0){
            $id = $item;
        }
        $i++;
    }

    # Si updatabutton a été appelé alors on l'affiche
    if($updateButton)
    {
        echo '<a href="http://'.$_SERVER['SERVER_NAME'].'/backoffice.php?modif_'.$listType.'='.$id.'" class="list_item_text edit">EDITER</a>';
    }

    # Si deletebutton a été appelé alors on l'affiche
    if($deleteButton)
    {
        echo '<a href="http://'.$_SERVER['SERVER_NAME'].'/backoffice.php?delete_'.$listType.'='.$id.'" class="list_item_text delete">SUPPRIMER</a>';
    }

    echo '</li>';

}

# On créer une fonction qui permet de clôturer une liste en html
function endList(){
    echo '</ol>
    </div>';
}


?>