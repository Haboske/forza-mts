$(document).ready(function(){

    // On récupère notre storage local pour liste de score
    score_list_storage = localStorage.getItem('score_list')

    const myJSON = '{"scores": [{"player_name": "John Doe","score": 0}]}'
    const myObj = JSON.parse(myJSON);

    myObj.scores.push({
        player_name: 'azeae',
        score: 123,
        // or any other data we want to add in that object
     });


    // Avant de continuer on s'assure que la liste de score existe ou non

    // Si elle n'existe pas alors
    if(score_list_storage == null){

        // On vient générer notre liste de score, ainsi que notre iterateur pour lire et écrire dans le tableau sans écrire par dessus des données déjà existantes

        localStorage.setItem('score_list','{"scores": [{"player_name": "John Doe","score": 0}]}');

    }
    else // Autrement, alors
    {

        // On vient adapter nos données qui sont en format string vers un format json
        score_list = JSON.parse(localStorage.getItem('score_list'));
        // On s'assure de bien avoir récupérer les données existantes en les affichants dans la console.

        console.log('voici la liste actuel des score :');
        console.log(score_list.scores);
    }

    $('.sent').click(function(){

        playername = $('.player_name').val();
        score = $('.player_score').val();

        if(playername.length !== 0 && score.length !== 0){

            console.log('donnée ok');

            score_list.scores.push({
                player_name: playername,
                score: score,
             });

            console.log(score_list.scores);

            localStorage.setItem('score_list',JSON.stringify(score_list));

        }
        else
        {
            alert('rentre correctement tes données sarazin !');
        }


    });

    $('#btn').click(function(){

        $("#container").empty();

        let container = $("#container");
        let table = $("<table>");
        let cols = Object.keys(score_list.scores[0]);
        let thead = $("<thead>");
        let tr = $("<tr>");


        // Loop through the column names and create header cells
        $.each(cols, function(i, item){
            let th = $("<th>");
            th.text(item); // Set the column name as the text of the header cell
            tr.append(th); // Append the header cell to the header row
         });
         thead.append(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table

         $.each(score_list.scores, function(i, item){
            let tr = $("<tr>");
               
               // Get the values of the current object in the JSON data
               let vals = Object.values(item);
               
               // Loop through the values and create table cells
               $.each(vals, (i, elem) => {
                  let td = $("<td>");
                  td.text(elem); // Set the value as the text of the table cell
                  tr.append(td); // Append the table cell to the table row
               });
               table.append(tr); // Append the table row to the table
            });
            container.append(table) // Append the table to the container element
    });

});