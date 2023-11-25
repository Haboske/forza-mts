
// On récupère les bonnes réponses que nous avons insérer sous format json dans une balise script et on delete aussi tôt la balise pour ne pas que le joueur vienne les chercher dans le DOM
var answers = goodanswers;
console.log(answers);
$('#jsonDatas').remove();

console.log(answers[2]);

var question_number = 1;

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
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var question_number = 1;
var player_answers = Array();
if($('.form1').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question1_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question1_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question1_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question1_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question1_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[1]['question_goodrep']);

    if($('#question1_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[1]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form1 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form1 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form1 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form1 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form1 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form1 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form1 .quizz_form_feedback, .form1 .quizz_form_feedback span,.form1 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form1 #question1_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+1).attr('data-type') == 'QCU')
{
  $('.form'+1).click(function(){
    answer = $('.question1:checked').val()
    console.log('réponse selectionés');
  });

  $('#question1_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[1]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question1_button').attr('data-status') !== 'over'){
      $score = checkAnswer(1,answers[1]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA DEUXIEME QUESTION
///////////////////////////////////////////////

  $('#question1_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question1_button').attr('data-status') == 'over'){
      nextQuestion(1);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });


//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form2').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question2_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question2_answer1').is(':checked'))
    {
      player_answers[2] = '1';
    }
    if($('#question2_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question2_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question2_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[2]['question_goodrep']);

    if($('#question2_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[2]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form2 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form2 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form2 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form2 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form2 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form2 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form2 .quizz_form_feedback, .form2 .quizz_form_feedback span,.form2 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form2 #question2_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+2).attr('data-type') == 'QCU')
{
  $('.form'+2).click(function(){
    answer = $('.question2:checked').val()
    console.log('réponse selectionés');
  });

  $('#question2_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[2]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question2_button').attr('data-status') !== 'over'){
      $score = checkAnswer(2,answers[2]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question2_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question2_button').attr('data-status') == 'over'){
      nextQuestion(2);
      player_answers = Array();
      console.log('le score est de '+$score);

    }
  });

  //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form3').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question3_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question3_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question3_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question3_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question3_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[3]['question_goodrep']);

    if($('#question3_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[3]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form3 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form3 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form3 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form3 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form3 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form3 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form3 .quizz_form_feedback, .form3 .quizz_form_feedback span,.form3 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form3 #question3_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+3).attr('data-type') == 'QCU')
{
  $('.form'+3).click(function(){
    answer = $('.question3:checked').val()
    console.log('réponse selectionés');
  });

  $('#question3_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[3]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question3_button').attr('data-status') !== 'over'){
      $score = checkAnswer(3,answers[3]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question3_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question3_button').attr('data-status') == 'over'){
      nextQuestion(3);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

    //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form4').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question4_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question4_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question4_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question4_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question4_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[4]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[4]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form4 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form4 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form4 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form4 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form4 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form4 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form4 .quizz_form_feedback, .form4 .quizz_form_feedback span,.form4 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form4 #question4_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+4).attr('data-type') == 'QCU')
{
  $('.form'+4).click(function(){
    answer = $('.question4:checked').val()
    console.log('réponse selectionés');
  });

  $('#question4_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[4]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question4_button').attr('data-status') !== 'over'){
      $score = checkAnswer(4,answers[4]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question4_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question4_button').attr('data-status') == 'over'){
      nextQuestion(4);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

      //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form5').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question5_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question5_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question5_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question5_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question5_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[5]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[5]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form5 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form5 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form5 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form5 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form5 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form5 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form5 .quizz_form_feedback, .form5 .quizz_form_feedback span,.form5 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form5 #question5_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+5).attr('data-type') == 'QCU')
{
  $('.form'+5).click(function(){
    answer = $('.question5:checked').val()
    console.log('réponse selectionés');
  });

  $('#question5_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[5]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question5_button').attr('data-status') !== 'over'){
      $score = checkAnswer(5,answers[5]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question5_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question5_button').attr('data-status') == 'over'){
      nextQuestion(5);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

        //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 66 6 6 66 6 6 66 6 6 66 6 6 66 6 6 66 6 6 66 6 6 66 6 6 66 6 6 6
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form6').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question6_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question6_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question6_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question6_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question6_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[6]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[6]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form6 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form6 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form6 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form6 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form6 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form6 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form6 .quizz_form_feedback, .form6 .quizz_form_feedback span,.form6 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form6 #question6_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+6).attr('data-type') == 'QCU')
{
  $('.form'+6).click(function(){
    answer = $('.question6:checked').val()
    console.log('réponse selectionés');
  });

  $('#question6_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[6]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question6_button').attr('data-status') !== 'over'){
      $score = checkAnswer(6,answers[6]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question6_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question6_button').attr('data-status') == 'over'){
      nextQuestion(6);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

          //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form7').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question7_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question7_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question7_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question7_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question7_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[7]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[7]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form7 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form7 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form7 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form7 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form7 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form7 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form7 .quizz_form_feedback, .form7 .quizz_form_feedback span,.form7 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form7 #question7_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+7).attr('data-type') == 'QCU')
{
  $('.form'+7).click(function(){
    answer = $('.question7:checked').val()
    console.log('réponse selectionés');
  });

  $('#question7_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[7]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question7_button').attr('data-status') !== 'over'){
      $score = checkAnswer(7,answers[7]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question7_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question7_button').attr('data-status') == 'over'){
      nextQuestion(7);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

          //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form8').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question8_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question8_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question8_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question8_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question8_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[8]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[8]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form8 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form8 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form8 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form8 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form8 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form8 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form8 .quizz_form_feedback, .form8 .quizz_form_feedback span,.form8 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form8 #question8_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+8).attr('data-type') == 'QCU')
{
  $('.form'+8).click(function(){
    answer = $('.question8:checked').val()
    console.log('réponse selectionés');
  });

  $('#question8_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[8]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question8_button').attr('data-status') !== 'over'){
      $score = checkAnswer(8,answers[8]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question8_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question8_button').attr('data-status') == 'over'){
      nextQuestion(8);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

          //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
// 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form9').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question9_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question9_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question9_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question9_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question9_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[9]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[9]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form9 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form9 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form9 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form9 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form9 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form9 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form9 .quizz_form_feedback, .form9 .quizz_form_feedback span,.form9 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form9 #question9_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+9).attr('data-type') == 'QCU')
{
  $('.form'+9).click(function(){
    answer = $('.question9:checked').val()
    console.log('réponse selectionés');
  });

  $('#question9_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[9]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question9_button').attr('data-status') !== 'over'){
      $score = checkAnswer(9,answers[9]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question9_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question9_button').attr('data-status') == 'over'){
      nextQuestion(9);
      player_answers = Array();
      console.log('le score est de '+$score);
    }
  });

          //////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 1 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
// 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////
// Pour vérifier les réponses multiples de manière dynamique  on va créer un tableau qui contient les réponses cochés par le joueur
var player_answers = Array();
if($('.form10').attr('data-type') == 'QCM')
{
  console.log('nouveau formulaire');
  $('#question10_button').click(function(){
    console.log('QCM');
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question10_answer1').is(':checked'))
    {
      player_answers[1] = '1';
    }
    if($('#question10_answer2').is(':checked'))
    {
      player_answers[2] = '2';
    }
    if($('#question10_answer3').is(':checked'))
    {
      player_answers[3] = '3';
    }
    if($('#question10_answer4').is(':checked'))
    {
      player_answers[4] = '4';
    }
    // Ensuite on va transformer ce tableau en une chaine de caractère pour pouvoir comparer les réponses du joueur avec les bonnes du quizz
    player_final_answer = player_answers.join('');
    console.log('réponse joueur '+player_final_answer);
    console.log('réponse valide '+answers[10]['question_goodrep']);

    if($('#question4_button').attr('data-status') !== 'over'){
      if(player_final_answer == answers[10]['question_goodrep'])
      {
        $score++;

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form10 .quizz_form_feedback span').text("C'est ça !");
  
        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form10 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);
        
      }
      else 
      {
        $('.form10 .quizz_form_feedback span').text("Et non !").css({'color':'red'})
  
        setTimeout(function(){ $('.form10 .answer_feedback_wrong').show(0).css({"opacity":"1",'transition':'0.3s ease-out'}); },500);
      }

      // On cache les réponses
      $('.form10 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form10 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form10 .quizz_form_feedback, .form10 .quizz_form_feedback span,.form10 .quizz_form_feedback feedback').show(0).css({'opacity':'1','transition':'0.3s ease-out'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form10 #question10_button').text('Prochaine question').attr( 'data-status' , 'over' )},1)

    }
    });
} else if ($('.form'+10).attr('data-type') == 'QCU')
{
  $('.form'+10).click(function(){
    answer = $('.question10:checked').val()
    console.log('réponse selectionés');
  });

  $('#question10_button').click(function(){
    console.log('bouton cliqué');
    console.log(answers[10]['question_goodrep']);
    // On s'assure qu'il s'agit bien du premier clique sur le bouton qui permet de vérifier la réponse.
    if($('#question10_button').attr('data-status') !== 'over'){
      $score = checkAnswer(10,answers[10]['question_goodrep'],answer,$score);
    }
    
  });
}

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA PROCHAINE QUESTION
///////////////////////////////////////////////

  $('#question10_button').click(function(){
    // On s'assure que la réponse à bien été vérifier et qu'on considère le status de cette question  comme terminé pour passer à la suite
    if($('#question10_button').attr('data-status') == 'over'){
      nextQuestion(10);
      player_answers = Array();
      console.log('le score est de '+$score);
      $('#input_score').val($score);

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