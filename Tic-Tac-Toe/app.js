let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO = true;

let click_count=0;

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


const resetGame = () =>{
    turnO=true;
    enableboxes();
    msgContainer.classList.add("hide");
    click_count=0;
};



boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");      // add o color
      box.classList.remove("x");  // just in case
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x");      // add x color
      box.classList.remove("o");   // just in case
      turnO = true;
    }
    box.disabled = true;
    click_count++;
    checkWinner();
  });
});


const diableboxes = () => {
    for(let box of boxes)
    {
        box.disabled=true;
    }
};


const enableboxes = () => {
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    diableboxes();
};


const checkWinner = () => {
    for( let pattern of winpatterns) {

        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 !="" && pos3 !="")
        {
            if(pos1 ===pos2 && pos2 === pos3)
            {
                showWinner(pos1);
                return;
            }
            if(click_count==9)
            {
                msg.innerHTML="Match is a draw!!";
                msgContainer.classList.remove("hide");
            }
        }

    }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);


