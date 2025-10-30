let userscore=0;
let compscore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {

    const options=["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame = () => {
    
    msg.innerText = "Game was draw, Play again.";
    msg.style.backgroundColor = "#f77f00";
}

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin) 
    {
        userscore++;
        userScorePara.innerText= userscore;

        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#7cb518";
    }
    else
    {
        compscore++;
        compScorePara.innerText= compscore;

        msg.innerText = `You Lost! ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "#d62828";
    }
}


const playGame =(userChoice) =>{
    

    //generate comp choice
    const compChoice = genCompChoice();
    

    if (userChoice === compChoice)
    {
        drawGame();
    }
    else 
    {
        let userWin=true;

        if(userChoice === "rock")
        {
            //scissors,paper
            userWin = compChoice==="paper"? false : true;
        }
        else if(userChoice==="paper")
        {
            //rock,scissors
            userWin = compChoice==="scissors" ? false : true;
        }
        else
        {
            //rock,paper
            userWin = compChoice==="rock" ? false: true;
        }

        showWinner(userWin,userChoice,compChoice);
    }

}


choices.forEach((choice) => {
    // console.log(choice);
    choice.addEventListener("click",() =>{

        const userChoice= choice.getAttribute("id");
    
        playGame(userChoice);

    });
});