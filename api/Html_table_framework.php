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

function endTable(){
    echo "</tbody></table>";
}

function td($text){
    return "<td>".$text."</td>";
}

function setList($headers, $headers_class){

    $i = 0;

    echo '<div class="list-container">
            <ol role="list" class="list_item w-list-unstyled">
                <li class="list-item heading impair">';

    foreach($headers as $liHeading){
        echo '<div class="list_item_text '.$headers_class[$i].'">'.$liHeading.'</div>';
        $i++;
    }
    echo '</li>';

}

function setListItem($listType,$items, $items_class, $updateButton, $deleteButton, $pair){

    $i = 0;
    $pairCLass = 'impair';
    if($pair){
        $pairCLass = '';
    }

    echo '<li class="list-item '.$pairCLass.'">';

    
    foreach ($items as $item){
        echo '<div class="list_item_text '.$items_class[$i].'">'.$item.'</div>';
        if($i==0){
            $id = $item;
        }
        $i++;
    }

    if($updateButton)
    {
        echo '<a href="http://'.$_SERVER['SERVER_NAME'].':8888/backoffice.php?modif_'.$listType.'='.$id.'" class="list_item_text edit">EDITER</a>';
    }

    if($deleteButton)
    {
        echo '<a href="http://'.$_SERVER['SERVER_NAME'].':8888/backoffice.php?delete_'.$listType.'='.$id.'" class="list_item_text delete">SUPPRIMER</a>';
    }

    echo '</li>';

}

function endList(){
    echo '</ol>
    </div>';
}


?>