class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow")
    //write code to show a heading for showing the result of Quiz
    textSize(30)
    text("Results",425,75)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()

    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      fill("blue")
      textSize(20)
      text("NOTE: Players who answered correctly are in green while the others in red",130,230)
    }
    //write code to add a note here

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correct="2"
      if(correct===allContestants[plr].answer){
        fill("green")
        text("correct:2",170,260)
      }
      else{
        fill("red")
        text("wrong:1,3,4",170,280)
      }
    }
    for(var plr in allContestants){
      displayposition+=20
      textSize(15)
      text(allContestants[plr].name+":"+allContestants[plr].answer,120,displayposition)
      if(plr=="contestant"+contestant.index){
          fill("red")
      }
      else{
          fill("black")
      }
  }
  }

}
