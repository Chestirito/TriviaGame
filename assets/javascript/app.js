$(function() {
    var trivia = {
        questions : [
            "Up to how long can a snail sleep for?",
            "What food does a Giant Panda mainly eats?",
            "What type of animal is a Mexican hairless?",
            "What are baby jackrabbits called?",
            "'Murder' is the collective noun for a group of what?"
        ],
        answers : [
            "3 Years",
            "Bamboo",
            "Dog",
            "Leveret",
            "Crows"
        ],
        pChoices : [
            ["48 hours","7 days", "5 months", "3 Years" ],
            ["Lettuce", "Carrots", "Tree Trunk", "Bamboo"],
            ["Alpaca", "Donkey", "Cat", "Dog"],
            ["Bunnies", "Wabbits", "Chevies", "Leveret"],
            ["Lions", "Snakes", "Racoons", "Crows"]
        ],
        questOrder : [],
        choiceOrder : [],
        corrects : 0,
        incorrects : 0,
        unanswered : 0,
        timer : 0,
    };
    var defineTimer = 10;
    var intervalId;

    function randNumArray(howMany){
        var randorder = [];
        //var triviaQ = trivia.questions;
        while(randorder.length < howMany){
            var compNum = Math.floor((Math.random() * howMany));
            if(!randorder.includes(compNum)){
                randorder.push(compNum);
            }
        }
        return randorder;
        //console.log(randorder);
    }
    //trivia.questOrder = orderPicker(trivia.questions.length);
    //console.log(trivia.questOrder);
    function gameStart(){
        trivia.questOrder = randNumArray(trivia.questions.length);
        trivia.choiceOrder = randNumArray(trivia.pChoices[0].length);
        trivia.corrects = 0;
        trivia.incorrects = 0;
        trivia.unanswered = 0;
        trivia.timer = defineTimer;
        hideAllScr();
    }
    function hideAllScr(){
        $(".startScr").hide();
        $(".questScr").hide();
        $(".ansScr").hide();
        $(".resScr").hide();

    }
    function countdown(){
        trivia.timer--;
        //console.log(trivia.timer);
        $("#timer").text(trivia.timer);
        if(trivia.timer === -1){
            showAnsScr(false);
        }
    }
    function nextQuestion(){
        hideAllScr();
        var question = trivia.questOrder;
        var choices = trivia.choiceOrder;
        trivia.timer = defineTimer;
        intervalId =  setInterval(countdown, 1000);

        $("#question").text(trivia.questions[question[0]]);
        $("#timer").text(trivia.timer);
        $(".choices").html("");
        for(var i = 0; i < choices.length; i++){
            var button = $("<button>");
            button.addClass("btn-choice btn");
            button.text(trivia.pChoices[question[0]][choices[i]]);
            //button.attr("data-ans", trivia.pChoices[question][choices[i]]);
            $(".choices").append(button);
        }
        $(".questScr").show();
    }
    function showAnsScr(isCorrect){
        hideAllScr();
        clearInterval(intervalId);
        if(isCorrect){
            $("#result").text("Correct!");
            $("#message").hide();
            $("#ansImage").attr("src", "assets/images/yes.gif")
            trivia.corrects++;
        }
        else{
            $("#result").text("Wrong!");
            $("#message").text("The correct answer was: " + trivia.answers[trivia.questOrder[0]])
            $("#message").show();
            $("#ansImage").attr("src", "assets/images/no.gif");
            if(trivia.timer !== -1){
                trivia.incorrects++;
            }
            else{
                trivia.unanswered++;
            }
        }
        trivia.questOrder.shift();
        $(".ansScr").show();
        timeoutNextQuest();
    }
    $(".startScr").on("click", ".startG", function(){
        nextQuestion();
        //question[0].pull;
    });

    $(".questScr").on("click", ".btn-choice", function(){
        hideAllScr();
        //console.log(event);
        //console.log(this.textContent);
        //if(this.textContent === trivia.answers[trivia.questOrder[0]]){
        showAnsScr(this.textContent === trivia.answers[trivia.questOrder[0]]);
        
    });

    function showEnd(){
        hideAllScr();
        $("#corrects").text(trivia.corrects);
        $("#incorrects").text(trivia.incorrects);
        $("#unans").text(trivia.unanswered);
        if(trivia.corrects < 3){
            $(".resImage").attr("src", "assets/images/no.gif");
        }
        else{
            $(".resImage").attr("src", "assets/images/yes.gif");
        }
        $(".resScr").show();
    }

    $(".resScr").on("click", ".restartG", function(){
        //nextQuestion();
        //question[0].pull;
        gameStart();
        nextQuestion();
    });

    function timeoutNextQuest(){
        setTimeout(function(){ 
            //console.log(trivia.questOrder.length);
            if(trivia.questOrder.length > 0){
                nextQuestion();
                //console.log("cont");
            }
            else{
                showEnd();
                //console.log("end");
            }
        }, 3000);
    }
    gameStart();
    $(".startScr").show();

});