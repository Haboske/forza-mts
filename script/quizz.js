// Création de la fonction qui nous permet de vérifier les réponses
function checkAnswer(question_number,correct_Answer,user_Answer,score){
  if(typeof user_Answer == 'undefined'){
      alert('Pense à selectionner une réponse')
  }

  else if ($('#question'+question_number+'_button').val() !== 'finished'){

      if (user_Answer == correct_Answer){

          // Alors on augmente le score de 1
          score = score+1
  
          // Et on indique au joueur qu'il a choisi la bonne réponse
          $('.form'+question_number+' .quizz_form_feedback span').text("C'est ça !");
  
          // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
          setTimeout(function(){ $('.form'+question_number+' .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
  
        }
      
      else {

          $('.form'+question_number+' .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
          setTimeout(function(){ $('.form'+question_number+' .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
  
      }

      // On cache les réponses
      $('.form'+question_number+' .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form'+question_number+' .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form'+question_number+' .quizz_form_feedback, .form'+question_number+' .quizz_form_feedback span,.form'+question_number+' .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form'+question_number+' #question'+question_number+'_button').text('Prochaine question').attr( 'data-status' , 'over' )},1);
      $('.form'+question_number+' #question'+question_number+'_button')

  }

  else{
      console.log('réponse non définie')
  }

  return score;

}

// Fonction permettant de passer d'une question à une autre
function nextQuestion(question_number){

  next_question = question_number + 1;
  
  // On fait disparaitre tous les éléments de la question
  setTimeout(function(){ $('.form'+question_number+' p').css({'opacity':'0','transition':'0.3s ease'}); },100);
  setTimeout(function(){ $('.form'+question_number+' lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
  setTimeout(function(){ $('.form'+question_number+' span').css({'opacity':'0','transition':'0.3s ease'}); },300);
  setTimeout(function(){ $('.form'+question_number+' feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
  setTimeout(function(){ $('.form'+question_number+' button').css({'opacity':'0','transition':'0.3s ease'}); },400);
 
  if(question_number == 10){
    //Et on fait apparaitre l'outro'
    setTimeout(function(){ $('.quizz_form').hide(0); },1000);
    setTimeout(function(){ $('.form10').hide(0); },1000);
    setTimeout(function(){ $('.quizz_outro').show(0); },1000);
    $('.result_display').text($score);
  }
  else{
      //Et on fait apparaitre la question suivante
    setTimeout(function(){ $('.form'+question_number+'').hide(0); },1000);
    setTimeout(function(){ $('.form'+next_question+'').show(0).css({"display":"flex"}); },1000);
    setTimeout(function(){ $('.form'+next_question+'').css({'opacity':'1','transition':'0.3s ease'});},1000)
  
  }



}


$(document).ready(function(){

  $score = 0

  // On récupère notre storage local pour liste de score
  score_list_storage = localStorage.getItem('score_list')
  
  // Avant de continuer on s'assure que la liste de score existe ou non

  // Si elle n'existe pas alors
  if(score_list_storage == null){

    // On vient générer notre liste de score, ainsi que notre iterateur pour lire et écrire dans le tableau sans écrire par dessus des données déjà existantes
    localStorage.setItem('score_list','{"scores": [{"player_name": "John Doe","score": 0}]}');
    location.reload();

  }
  else // Autrement, alors
  {

    // On vient adapter nos données qui sont en format string vers un format json
    score_list = JSON.parse(localStorage.getItem('score_list'));
    // On s'assure de bien avoir récupérer les données existantes en les affichants dans la console.

    // On parse le fichier json pour pouvoir le travailler en javascript
    const myJSON = '{"scores": [{"player_name": "John Doe","score": 0}]}'
    const myObj = JSON.parse(myJSON);
  
  }


  $('.quizz_intro_button').click(function(){
    console.log('clique')
    $('.quizz_intro h1').css({"animation":"slide-out-top 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"});
    $('.quizz_intro p').css({"animation":"slide-out-top 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) 100ms both"});
    $('.quizz_intro button').css({"animation":"slide-out-top 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) 150ms both"});
    
    setTimeout(function(){ $('.quizz_intro').hide(0); },1000);
    setTimeout(function(){ $('.quizz_form').show(0); },1000);
    setTimeout(function(){ $('.form1').show(0).css({"display":"flex"}); },1000);
    setTimeout(function(){ $('.form1').css({'opacity':'1','transition':'0.3s ease'})}, 1000)


    setTimeout(function(){ $('.quizz_intro h1').attr('style',' '); },1000);
    setTimeout(function(){ $('.quizz_intro p').attr('style',' '); },1000);
    setTimeout(function(){ $('.quizz_intro button').attr('style',' '); },1000);
  })

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form1').click(function(){
    $answer1 = $('.question1:checked').val()
  });

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  //ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('#question1_button').click(function(){
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question1_button').attr('data-status') !== 'over'){
      $score = checkAnswer(1,3,$answer1,$score);
    }
    
  });

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA DEUXIEME QUESTION
///////////////////////////////////////////////

  $('#question1_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question1_button').attr('data-status') == 'over'){
      nextQuestion(1);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2    
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form2').click(function(){
    $answer2 = $('.question2:checked').val()
  });

  $('#question2_button').click(function(){
    if($('#question2_button').attr('data-status') !== 'over'){
      $score = checkAnswer(2,3,$answer2,$score);
    }
  });

  $('#question2_button').click(function(){
    if($('#question2_button').attr('data-status') == 'over'){
      nextQuestion(2);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 3 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form3').click(function(){
    $answer3 = $('.question3:checked').val()
  });

  $('#question3_button').click(function(){
    if($('#question3_button').attr('data-status') !== 'over'){
      $score = checkAnswer(3,4,$answer3,$score);
    }
  });

  $('#question3_button').click(function(){
    if($('#question3_button').attr('data-status') == 'over'){
      nextQuestion(3);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 4 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//4   4   4   4    4   4   4   4    4   4   4   4    4   4   4   4    4   4   4   4    4   4   4   4    
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form4').click(function(){
    $answer4 = $('.question4:checked').val()
  });

  $('#question4_button').click(function(){
    if($('#question4_button').attr('data-status') !== 'over'){
      $score = checkAnswer(4,3,$answer4,$score);
    }
  });

  $('#question4_button').click(function(){
    if($('#question4_button').attr('data-status') == 'over'){
      nextQuestion(4);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 5 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form5').click(function(){
    $answer5 = $('.question5:checked').val()
  });

  $('#question5_button').click(function(){
    if($('#question5_button').attr('data-status') !== 'over'){
      $score = checkAnswer(5,1,$answer5,$score);
    }
  });

  $('#question5_button').click(function(){
    if($('#question5_button').attr('data-status') == 'over'){
      nextQuestion(5);
    }
  });
  
//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 6 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form6').click(function(){
    $answer6 = $('.question6:checked').val()
  });

  $('#question6_button').click(function(){
    if($('#question6_button').attr('data-status') !== 'over'){
      $score = checkAnswer(6,2,$answer6,$score);
    }
  });

  $('#question6_button').click(function(){
    if($('#question6_button').attr('data-status') == 'over'){
      nextQuestion(6);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 7 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form7').click(function(){
    $answer7 = $('.question7:checked').val()
  })

  $('#question7_button').click(function(){
    if($('#question7_button').attr('data-status') !== 'over'){
      $score = checkAnswer(7,2,$answer7,$score);
    }
  });

  $('#question7_button').click(function(){
    if($('#question7_button').attr('data-status') == 'over'){
      nextQuestion(7);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 8 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form8').click(function(){
    $answer8 = $('.question8:checked').val()
  })

  $('#question8_button').click(function(){
    if($('#question8_button').attr('data-status') !== 'over'){
      $score = checkAnswer(8,3,$answer8,$score);
    }
  });

  $('#question8_button').click(function(){
    if($('#question8_button').attr('data-status') == 'over'){
      nextQuestion(8);
    }
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 9 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9   9
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form9').click(function(){
    $answer9 = $('.question9:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form9 button').click(function(){

    if ($('#question9_answer1').is(':checked') && $('#question9_answer4').is(':checked')){
      
    // Alors on augmente le score de 1
    $score = $score+1

    // Et on indique au joueur qu'il a choisi la bonne réponse
    $('.form9 .quizz_form_feedback span').text("C'est ça !");

    // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
    setTimeout(function(){ $('.form9 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);


    } else{
      
      $('.form9 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

      setTimeout(function(){ $('.form9 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      console.log('réponse non définie')
      if($('#question9_answer1').is(':checked')){
        console.log('ok');
      }
    }

    // On cache les réponses
    $('.form9 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
    setTimeout(function(){ $('.form9 .quizz_form_answer').hide(0); },500);
    
    // On affiche le résultat
    setTimeout(function(){ $('.form9 .quizz_form_feedback, .form9 .quizz_form_feedback span,.form9 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)
    
    // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
    setTimeout(function(){ $('.form9 #question9_button').text('Prochaine question').val('finished')},1) 

          
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA DIXIEME QUESTION
///////////////////////////////////////////////

$('#question9_button').click(function(){
  if($('#question9_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form9 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form9 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form9 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form9 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form9 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 6
    setTimeout(function(){ $('.form9').hide(0); },1000);
    setTimeout(function(){ $('.form10').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
    setTimeout(function(){ $('.form10').css({'opacity':'1','transition':'0.3s ease'});},1000)

  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//10   10   10    10    10   10   10    10    10   10   10    10    10   10   10    10    10   10   10    10    
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form10').click(function(){
    $answer10 = $('.question10:checked').val()
  })

  $('#question10_button').click(function(){
    if($('#question10_button').attr('data-status') !== 'over'){
      $score = checkAnswer(10,2,$answer10,$score);
    }
  });

  $('#question10_button').click(function(){
    if($('#question10_button').attr('data-status') == 'over'){
      nextQuestion(10);
    }
  });


  $('.next_button').click(function(){

      // On récupère la valeur de l'input
      playername = $('input.playername').val();

      // On s'assure que la longueur du nom du joueur est au minimum supérieur à 0
      if(playername.length !== 0){

        // Si c'est le cas on push le score et le pseudo dans notre fichier JSON
        score_list.scores.push({
            player_name: playername,
            score: $score,
        });

        // Ensuite on enregistre notre fichier JSON dans notre navigateur
        localStorage.setItem('score_list',JSON.stringify(score_list));

        // On s'assure que le container dans lequel on va ajouter notre table est empty
        $("#container").empty();

        // On créer les variables sur lesquelles on va travailler
        let container = $("#container");
        let table = $("<table>");
        let cols = Object.keys(score_list.scores[0]);
        let thead = $("<thead>");
        let tr = $("<tr>");

        // On loop a travers les éléments pour créer les tablea header et on les insères dans le tableau
        $.each(cols, function(i, item){
          let th = $("<th class='score_"+item+"'>");
          th.text(item);
          tr.append(th); 
        });
        thead.append(tr);
        table.append(tr)

        $.each(score_list.scores, function(i, item){
          let tr = $("<tr class='elem_"+i+"'>");
          
          // On récupères les valeurs du fichier json (qui est un objet)
          let vals = Object.values(item);
          
          // On loop a travers les éléments pour créer les cellules
          $.each(vals, (i, elem) => {
              let td = $("<td>");
              td.text(elem);
              tr.append(td);
          });
          table.append(tr);
          });
          container.append(table)

          // On désaffiche notre menu outro pour ensuite afficher le résultat de tableau
          $('.quizz_outro_player_result').hide(0);
          $('.quizz_outro_score_table').show(0).css({"display":"flex"});

          // On manipule les données 'template' de notre table pour ne pas les affichers
          $('.elem_0').hide(0);
          $('.score_player_name').text('Pseudo');
          $('.score_score').text('Score')
    }
    else
    {
        alert('rentre correctement tes données sarazin !');
    }

    $('.restart').click(function(){

      location.reload(); 

    });

  });

});