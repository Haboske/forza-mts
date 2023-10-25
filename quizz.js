score = 0

//Question 1
$(document).click(function(){
    $q1a1 = $(".question1:checked").val()
});

$('.form1 button').click(function(){
    if ($q1a1 == 3){
        score=score+1
        console.log(score)
    }   
    else{
        console.log("Mauvaise Réponse")
    }
})

//Question 2
$(document).click(function(){
    $q2a1 = $(".question2:checked").val()
});
$('form2 button').click(function(){
    if (q2a1 == 3){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 3
$(document).click(function(){
    $q3a1 = $(".question3:checked").val()
});
$('.form3 button').click(function(){
    if (q3a1 == 4){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 4
$(document).click(function(){
    $q4a1 = $(".question4:checked").val()
});
$('.form3 button').click(function(){
    if (q4a1 == 3){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 5
$(document).click(function(){
    $q5a1 = $(".question5:checked").val()
});
$('.form5 button').click(function(){
    if (q5a1 == 1){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 6
$(document).click(function(){
    $q6a1 = $(".question6:checked").val()
});
$('.form6 button').click(function(){
    if (q6a1 == 2){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 7
$(document).click(function(){
    $q7a1 = $(".question7:checked").val()
});
$('.form7 button').click(function(){
    if (q7a1 == 2){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 8
$(document).click(function(){
    $q8a1 = $(".question8:checked").val()
});
$('.form8 button').click(function(){
    if (q8a1 == 3){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 9
$(document).click(function(){
    $q9a1 = $(".question9:checked").val()
});
$('.form9 button').click(function(){
    if (q9a1 == 2){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});

//Question 10
$(document).click(function(){
    $q10a1 = $(".question10:checked").val()
});
$('.form10 button').click(function(){
    if (q10a1 == 2){
        score=score+1
        console.log(score)
    }
    else{
        console.log("Mauvaise Réponse")
    }
});