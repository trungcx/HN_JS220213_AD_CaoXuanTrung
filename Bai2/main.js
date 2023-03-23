let listPlayer = JSON.parse(localStorage.getItem('listPlayer'));
let stopFlag = false;
// Start Reset
var intervalTime;
function startStopBtn(){
    if(stopFlag == false){
        intervalTime = setInterval(displayTime, 1000);
        stopFlag = true;
        document.getElementById('startBtn').innerHTML = `STOP`;
    } else{

    
    }
}
function displayTime(){
    let countTime = document.getElementById('countTime');
    countTime.innerHTML++;
}

function resetBtn(){
    listPlayer = JSON.parse(localStorage.getItem('listPlayer'));
    clearInterval(intervalTime);
    countTime.innerHTML = `0`;
    for(let i in listPlayer){
        listPlayer[i].score = 0;
    }
    localStorage.setItem('listPlayer', JSON.stringify(listPlayer));
    displayPlayer();
}

//Add player
function addPlayerBtn_fnt() {
    let inputPlayer = document.getElementById('playerNameInput').value;

    let player = {
        name: inputPlayer,
        score: 0
    }
    if (listPlayer == null) {
        listPlayer = [];
        listPlayer.push(player);
    } else {
        listPlayer.push(player);
    }
    localStorage.setItem('listPlayer', JSON.stringify(listPlayer));
    displayPlayer();
}

//display player
displayPlayer()
function displayPlayer() {
    let result = ``;
    let totalPoint = 0;
    listPlayer = JSON.parse(localStorage.getItem('listPlayer'));
    for (let i in listPlayer) {
        result += `
        <div class="bodyItem">
            <i class="myIcon ti-close" onclick="deletePlayer(${i})"></i>
            <i class="myIcon ti-crown"></i>
            <p class="playerName">${listPlayer[i].name}</p>
            <i class="myIcon ti-minus"  onclick="minusScore(${i})"></i>
            <span class="score">${listPlayer[i].score}</span>
            <i class="myIcon ti-plus" onclick="plusScore(${i})"></i>
        </div>
                `
        totalPoint+= listPlayer[i].score;
    }
    document.getElementById('totalPlayer').innerHTML = `Players: ${listPlayer.length}` ;
    document.getElementById('totalPoint').innerHTML =  `Total Points: ${totalPoint}`;
    document.getElementById('boardMainBody').innerHTML = result;
}
//Minus Plus Score
function minusScore(index) {
    listPlayer = JSON.parse(localStorage.getItem('listPlayer'));
    let score = listPlayer[index].score;
    if (score > 0) {
        listPlayer[index].score--;
    }
    localStorage.setItem('listPlayer', JSON.stringify(listPlayer));
    displayPlayer()
}
function plusScore(index) {
    listPlayer = JSON.parse(localStorage.getItem('listPlayer'));
    listPlayer[index].score++;
    localStorage.setItem('listPlayer', JSON.stringify(listPlayer));
    displayPlayer()
}
//delete player
function deletePlayer(index){
    listPlayer = JSON.parse(localStorage.getItem('listPlayer'));
    listPlayer.splice(index,1);
    localStorage.setItem('listPlayer', JSON.stringify(listPlayer));
    displayPlayer()
}