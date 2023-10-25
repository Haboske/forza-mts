//Importe le module 'fs' pour travailler avec le fichier JSON
const fs = require('fs');

// Lire le contenu du fichier JSON
const data = fs.readFileSync('data.json');
//Convertit le JSON en javaScript object
const jsonData = JSON.parse(data);

//Modifie le javaScript Object en ajoutant les nouvelles data
jsonData.users.push({
  user_name: 
  score:
});

//Convertit le javaScript Object en JSON
const jsonString = JSON.stringify(jsonData);

//Écrit les données dans le JSON
fs.writeFileSync('data.json',jsonString, 'utf-8', (err) => {
  if (err) throw err;
  console.logt('Data added to file');
});



$(document).ready(function(){
  //('.quizz_intro').hide(0)
  //('.quizz_form').show(0)
  //$('.form1').show(0).css({"display":"flex"})

  $score = 0


  $('.quizz_intro_button').click(function(){
    console.log('clique')
    $('.quizz_intro h1').css({"animation":"slide-out-top 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"});
    $('.quizz_intro p').css({"animation":"slide-out-top 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) 100ms both"});
    $('.quizz_intro button').css({"animation":"slide-out-top 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) 150ms both"});
    
    setTimeout(function(){ $('.quizz_intro').hide(0); },1000);
    setTimeout(function(){ $('.quizz_form').show(0); },1000);
    setTimeout(function(){ $('.form1').show(0).css({"display":"flex"}); },1000);
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
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  //ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form1 button').click(function(){

    if(typeof $answer1 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer1 !== 'undefined' && $('#question1_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer1 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form1 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form1 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form1 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form1 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form1 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form1 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form1 .quizz_form_feedback, .form1 .quizz_form_feedback span,.form1 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form1 #question1_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA DEUXIEME QUESTION
///////////////////////////////////////////////

  $('#question1_button').click(function(){
    if($('#question1_button').val() == 'finished')
    {

      // On fait disparaitre tous les éléments de la question 1
      setTimeout(function(){ $('.form1 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
      setTimeout(function(){ $('.form1 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
      setTimeout(function(){ $('.form1 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
      setTimeout(function(){ $('.form1 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
      setTimeout(function(){ $('.form1 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
      
      //Et on fait apparaitre la question 2
      setTimeout(function(){ $('.form1').hide(0); },1000);
      setTimeout(function(){ $('.form2').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
    }
  })

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2   2    
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form2').click(function(){
    $answer2 = $('.question2:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form2 button').click(function(){

    if(typeof $answer2 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer2 !== 'undefined' && $('#question2_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer2 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form2 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form2 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form2 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form2 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form2 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form2 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form2 .quizz_form_feedback, .form2 .quizz_form_feedback span,.form2 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form2 #question2_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA TROISIEME QUESTION
///////////////////////////////////////////////

$('#question2_button').click(function(){
  if($('#question2_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form2 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form2 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form2 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form2 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form2 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 3
    setTimeout(function(){ $('.form2').hide(0); },1000);
    setTimeout(function(){ $('.form3').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form3').click(function(){
    $answer3 = $('.question3:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form3 button').click(function(){

    if(typeof $answer3 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer3 !== 'undefined' && $('#question3_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer3 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form3 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form3 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form3 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form3 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form3 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form3 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form3 .quizz_form_feedback, .form3 .quizz_form_feedback span,.form3 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form3 #question3_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question3_button').click(function(){
  if($('#question3_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form3 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form3 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form3 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form3 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form3 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 3
    setTimeout(function(){ $('.form3').hide(0); },1000);
    setTimeout(function(){ $('.form4').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//4   4   4   4    4   4   4   4    4   4   4   4    4   4   4   4    4   4   4   4    4   4   4   4    
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form4').click(function(){
    $answer4 = $('.question4:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form4 button').click(function(){

    if(typeof $answer4 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer3 !== 'undefined' && $('#question4_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer4 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form4 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form4 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form4 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form4 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form4 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form4 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form4 .quizz_form_feedback, .form4 .quizz_form_feedback span,.form4 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form4 #question4_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question4_button').click(function(){
  if($('#question4_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form4 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form4 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form4 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form4 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form4 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 4
    setTimeout(function(){ $('.form4').hide(0); },1000);
    setTimeout(function(){ $('.form5').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form5').click(function(){
    $answer5 = $('.question5:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form5 button').click(function(){

    if(typeof $answer5 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer3 !== 'undefined' && $('#question5_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer5 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form5 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form5 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form5 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form5 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form5 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form5 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form5 .quizz_form_feedback, .form5 .quizz_form_feedback span,.form5 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form5 #question5_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question5_button').click(function(){
  if($('#question5_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form5 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form5 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form5 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form5 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form5 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 5
    setTimeout(function(){ $('.form5').hide(0); },1000);
    setTimeout(function(){ $('.form6').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})
  
//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form6').click(function(){
    $answer6 = $('.question6:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form6 button').click(function(){

    if(typeof $answer6 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer6 !== 'undefined' && $('#question6_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer6 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form6 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form6 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form5 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form6 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form6 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form6 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form6 .quizz_form_feedback, .form6 .quizz_form_feedback span,.form6 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form6 #question6_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question6_button').click(function(){
  if($('#question6_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form6 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form6 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form6 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form6 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form6 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 6
    setTimeout(function(){ $('.form6').hide(0); },1000);
    setTimeout(function(){ $('.form7').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form7').click(function(){
    $answer7 = $('.question7:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form7 button').click(function(){

    if(typeof $answer7 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer7 !== 'undefined' && $('#question7_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer7 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form7 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form7 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form7 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form7 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form7 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form7 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form7 .quizz_form_feedback, .form7 .quizz_form_feedback span,.form7 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form7 #question7_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question7_button').click(function(){
  if($('#question7_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form7 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form7 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form7 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form7 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form7 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 6
    setTimeout(function(){ $('.form7').hide(0); },1000);
    setTimeout(function(){ $('.form8').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
//////////////////////////////////////////////////////////////////////////////////////////////
//8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   8   
  /////////////////////////
  // ON RECUPERE LA VALEUR DE L'INPUT
  /////////////////////////

  $('.form8').click(function(){
    $answer8 = $('.question8:checked').val()
  })

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form8 button').click(function(){

    if(typeof $answer8 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer8 !== 'undefined' && $('#question8_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer8 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form8 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form8 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form8 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form8 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form8 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form8 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form8 .quizz_form_feedback, .form8 .quizz_form_feedback span,.form8 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form8 #question8_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question8_button').click(function(){
  if($('#question8_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form8 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form8 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form8 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form8 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form8 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 6
    setTimeout(function(){ $('.form8').hide(0); },1000);
    setTimeout(function(){ $('.form9').show(0).css({"display":"flex"}).css({"display":"flex"}); },1000);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// SCRIPT CONCERNAN LA QUESTION 2 DU FORMULAIRE 
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

    if(typeof $answer9 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer9 !== 'undefined' && $('#question9_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer9 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form9 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form9 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form9 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form9 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form9 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form9 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form9 .quizz_form_feedback, .form9 .quizz_form_feedback span,.form9 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form9 #question9_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
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

  /////////////////////////
  // ENSUITE ON LA COMPARE 
  // ET ON EFFECTUE NOS ACTIONS EN FONCTION DE LA VALEUR
  /////////////////////////

  $('.form10 button').click(function(){

    if(typeof $answer10 == 'undefined'){
      alert('Pense à selectionner une réponse')
    }

    else if (typeof $answer10 !== 'undefined' && $('#question10_button').val() !== 'finished'){
      
      // Si il s'agit de la bonne réponse
      if ($answer10 == 3){

        // Alors on augmente le score de 1
        $score = $score+1

        // Et on indique au joueur qu'il a choisi la bonne réponse
        $('.form10 .quizz_form_feedback span').text("C'est ça !");

        // Ensuite on affiche une animation indiquant qu'il a choisi la bonne réponse
        setTimeout(function(){ $('.form10 .answer_feedback_true').show(0).css({"opacity":"1"}); },500);

      }

      else {

        $('.form10 .quizz_form_feedback span').text("Et non !").css({'color':'red'})

        setTimeout(function(){ $('.form10 .answer_feedback_wrong').show(0).css({"opacity":"1"}); },500);

      }

      // On cache les réponses
      $('.form10 .quizz_form_answer').css({"transition":"0.3s ease","opacity":"0"})
      setTimeout(function(){ $('.form10 .quizz_form_answer').hide(0); },500);

      // On affiche le résultat
      setTimeout(function(){ $('.form10 .quizz_form_feedback, .form10 .quizz_form_feedback span,.form10 .quizz_form_feedback feedback').show(0).css({'opacity':'1'})},500)

      // On change le texte du bouton et on indique qu'au prochain clique on passe a la question suivante
      setTimeout(function(){ $('.form10 #question10_button').text('Prochaine question').val('finished')},1) 

    } 

    else{
      console.log('réponse non définie')
    }
  })

///////////////////////////////////////////////
// FONCTION POUR PASSER A LA QUATRIEME QUESTION
///////////////////////////////////////////////

$('#question10_button').click(function(){
  if($('#question10_button').val() == 'finished')
  {

    // On fait disparaitre tous les éléments de la question 2
    setTimeout(function(){ $('.form10 p').css({'opacity':'0','transition':'0.3s ease'}); },100);
    setTimeout(function(){ $('.form10 lord-icon').css({'opacity':'0','transition':'0.3s ease'}); },200);
    setTimeout(function(){ $('.form10 span').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form10 feedback').css({'opacity':'0','transition':'0.3s ease'}); },300);
    setTimeout(function(){ $('.form10 button').css({'opacity':'0','transition':'0.3s ease'}); },400);
    
    //Et on fait apparaitre la question 6
    setTimeout(function(){ $('.form10').hide(0); },1000);
  }
})

});