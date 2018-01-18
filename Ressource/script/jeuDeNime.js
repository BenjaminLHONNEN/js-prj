
var actualLineOfSelectAllumette = "line-1";
var numberOfSelectedAllumette = 0;
var Players = {namePlayer1:"",namePlayer2:"",colorPlayer1:"",colorPlayer2:""};
var turn = 1;
var numTotalAllumette = 4;
var gameDiv = document.getElementsByClassName("mainWindow")[0];
var settingsDiv = document.getElementsByClassName("preGameSettings")[0];
var winDiv = document.getElementById("victoryMessage");
var isAIActive = false;
var isAITurn = false;
var endTurnButton = document.getElementById("endTurnButton");
var numberOfMaxAllumetteCanBeSelectedInOneTurn = 100;
var rulesDiv = document.getElementsByClassName("rules")[0];

function createAllumette(numberOfAllumetteToPut) {
    var numLine = 1,numAllumette = 0;
    var string="";
    for(var i=1;numAllumette<numberOfAllumetteToPut;i=i+2)
    {
        string = string + "<div id='line" + numLine + "' class='line'>";
        for(var x=0;x!=i;x++)
        {
            string = string + "<div class='imageContent'><img name='" + numAllumette + "' onclick='allumetteClick(" + numAllumette + ")' class='allumette' id='allumette" + numAllumette + "' src='Ressource/img/allumette.png'></div>";
            numAllumette = numAllumette + 1;
        }

        string = string + "</div><br>";
        numLine = numLine + 1;

    }
    document.getElementById("game").innerHTML = string;
}


function allumetteClick(entryValue) {
    var allumetteNumber = Number(entryValue);
    var allumetteActuel = document.getElementById("allumette" + allumetteNumber);
    if((isAITurn==false) && (allumetteActuel.getAttribute('src') == "Ressource/img/allumette.png") && (numberOfSelectedAllumette < numberOfMaxAllumetteCanBeSelectedInOneTurn) && ((allumetteActuel.parentElement.parentElement.id == actualLineOfSelectAllumette) || (actualLineOfSelectAllumette == "line-1")))
    {
        allumetteActuel.src = "Ressource/img/allumetteFeu.png";
        numberOfSelectedAllumette = numberOfSelectedAllumette + 1;
        actualLineOfSelectAllumette = allumetteActuel.parentElement.parentElement.id;
        allumetteActuel.parentElement.parentElement.style.backgroundColor = "#999999";
        resetAnim(allumetteActuel);
        endTurnButton.removeAttribute("disabled");
    }
    else if((allumetteActuel.getAttribute('src') == "Ressource/img/allumetteFeu.png")  && (isAITurn == false))
    {
        allumetteActuel.src = "Ressource/img/allumette.png";
        numberOfSelectedAllumette = numberOfSelectedAllumette - 1;
        resetAnim(allumetteActuel);
        if(numberOfSelectedAllumette==0)
        {
            actualLineOfSelectAllumette = "line-1";
            endTurnButton.setAttribute("disabled",'true');
            allumetteActuel.parentElement.parentElement.style.backgroundColor = "#fff";
        }
    }
}

function isPartyFinished() {
    var isOneAllumetteAllume = false;
    for(var u=0;u < numTotalAllumette;u++)
    {
        var allumetteActuel = document.getElementById("allumette" + u);
        if(allumetteActuel.getAttribute('src') == "Ressource/img/allumette.png")
        {
            isOneAllumetteAllume = true;
        }
    }
    return isOneAllumetteAllume;
}

function deleteOnFireAllumette() {
    for(var u=0;u < numTotalAllumette;u++)
    {
        var allumetteActuel = document.getElementById("allumette" + u);
        if(allumetteActuel.getAttribute('src') == "Ressource/img/allumetteFeu.png")
        {
            allumetteActuel.src = "Ressource/img/allumetteEteinte.png";
            resetAnim(allumetteActuel);
        }
    }
}

function endOfTurn() {
    var titleName= document.getElementById("playerName");
    if(isPartyFinished()==false)
    {
        Win();
    }
    else
    {
        if(turn==1)
        {
            turn=2;
            titleName.innerHTML = Players['namePlayer2'];
            titleName.style.backgroundColor = Players['colorPlayer2'];
            if(isAIActive == true)
            {
                endTurnButton.setAttribute("disabled",'true');
                Players['colorPlayer2'] = generateHexa();
                isAITurn = true;
                setTimeout(function () {
                    aITurn();
                    setTimeout(function () {
                        deleteOnFireAllumette();
                        if(isPartyFinished()==false)
                        {
                            Win();
                        }
                        actualLineOfSelectAllumette = "line-1";
                        numberOfSelectedAllumette = 0;
                        turn=1;
                        titleName.innerHTML = Players['namePlayer1'];
                        titleName.style.backgroundColor = Players['colorPlayer1'];
                        resetBackgroundLines();
                        isAITurn = false;
                    },1250)
                },1250);
            }
        }
        else
        {
            turn=1;
            titleName.innerHTML = Players['namePlayer1'];
            titleName.style.backgroundColor = Players['colorPlayer1'];

        }
        deleteOnFireAllumette();
        actualLineOfSelectAllumette = "line-1";
        numberOfSelectedAllumette = 0;
    }
    resetBackgroundLines();
    endTurnButton.setAttribute("disabled",'true');
}

function resetBackgroundLines() {
    for(var y=1;y<7;y++) {
        try
        {
            document.getElementById("line" + y).style.backgroundColor = "white";
        }
        catch (err)
        {

        }
    }
}

function Win() {
    gameDiv.style.display = "none";
    settingsDiv.style.display = "none";
    winDiv.style.display = "block";
    rulesDiv.style.display = "none";

    var title = document.getElementById("winTitle");

    if(turn==1)
    {
        title.innerHTML = Players['namePlayer1'] + "  Win !"
    }
    else
    {
        title.innerHTML = Players['namePlayer2'] + "  Win !"
    }

}

function createGame() {
    var radio2 = document.getElementById("radioPlayers1");
    var text1 = document.getElementById("textPlayers");
    var text2 = document.getElementById("textPlayers1");
    var color1 = document.getElementById("colorPlayers");
    var color2 = document.getElementById("colorPlayers1");
    var titleName= document.getElementById("playerName");
    var numAllumette= document.getElementById("selectPlayers");

    Players['namePlayer1'] = text1.value;
    if(text1.value=="")
    {
        Players['namePlayer1'] = "Joueur 1";
    }
    Players['colorPlayer1'] = color1.value;

    if(radio2.checked)
    {
        Players['namePlayer2'] = text2.value;
        if(text2.value=="")
        {
            Players['namePlayer2'] = "Joueur 2";
        }
        Players['colorPlayer2'] = color2.value;
        isAIActive = false;
    }
    else
    {
        var icon = "<i class='fa fa-cog fa-spin fa-lg fa-fw'></i>";
        Players['namePlayer2'] = icon + "J.A.R.V.I.S." + icon;
        Players['colorPlayer2'] = generateHexa();
        isAIActive = true;
    }
    numTotalAllumette = numAllumette.value;
    createAllumette(numTotalAllumette);
    titleName.innerHTML = Players['namePlayer1'];
    titleName.style.backgroundColor = color1.value;
    gameDiv.style.display = "block";
    settingsDiv.style.display = "none";
    winDiv.style.display = "none";
    rulesDiv.style.display = "none";
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * max + min);
}

function generateHexa()
{
    return "#" + getRandomArbitrary(0,9).toString() + getRandomArbitrary(0,9).toString() + getRandomArbitrary(0,9).toString() + getRandomArbitrary(0,9).toString() + getRandomArbitrary(0,9).toString() + getRandomArbitrary(0,9).toString();
}

function onRadioClick(number) {
    if(number==1)
    {
        document.getElementById("secondPlayerConfig").style.display = "none";
    }
    else
    {
        document.getElementById("secondPlayerConfig").style.display = "block";
    }
}
function resetAnim(balise) {
    balise.style.display = "none";
    setTimeout(function(){ balise.style.display = "inline"; }, 0);
}

function aITurn() {
    var allumetteTab = [];
    var lineTab = [];
    var numOfValideAllumette = 0;
    var lines = {
        "line1" : 0,
        "line2" : 0,
        "line3" : 0,
        "line4" : 0,
        "line5" : 0,
        "line6" : 0
    };
    for(var u=0;u < numTotalAllumette;u++)
    {
        var allumetteActuel = document.getElementById("allumette" + u);
        if(allumetteActuel.getAttribute('src') == "Ressource/img/allumette.png")
        {
            allumetteTab[numOfValideAllumette] = allumetteActuel;
            lineTab[numOfValideAllumette] = allumetteActuel.parentElement.parentElement.id;
            numOfValideAllumette++;
            for(var i=1;i<7;i++)
            {
                if('line'+i==allumetteActuel.parentElement.parentElement.id)
                {
                    lines['line'+i] = lines['line'+i] + 1;
                }
            }
        }
    }

    var selectAnLine = [];
    var numberOfLineNotEmpty = 0;

    for(var y=1;y<7;y++)
    {
        if(lines["line"+y]!=0)
        {
            selectAnLine[numberOfLineNotEmpty]= "line"+y;
            numberOfLineNotEmpty = numberOfLineNotEmpty + 1;
        }
    }
    var selectedLine = getRandomArbitrary(0, selectAnLine.length-1);
    var numberOfAllumetteToDelete = 0;

    if(lines[selectAnLine[selectedLine]]>numberOfMaxAllumetteCanBeSelectedInOneTurn)
    {
        numberOfAllumetteToDelete = getRandomArbitrary(1,numberOfMaxAllumetteCanBeSelectedInOneTurn );
    }
    else
    {
        numberOfAllumetteToDelete = getRandomArbitrary(1,lines[selectAnLine[selectedLine]] );
    }

    var allumetteDeleted = 0;
    var w = 0;

    while(allumetteDeleted != numberOfAllumetteToDelete)
    {
        if(selectAnLine[selectedLine]==lineTab[w])
        {
            allumetteActuel = document.getElementById("allumette" + allumetteTab[w].name);
            allumetteActuel.src = "Ressource/img/allumetteFeu.png";
            actualLineOfSelectAllumette = allumetteActuel.parentElement.parentElement.id;
            allumetteActuel.parentElement.parentElement.style.backgroundColor = "#999999";
            resetAnim(allumetteActuel);
            allumetteDeleted = allumetteDeleted + 1;
        }
        print(selectAnLine[selectedLine]);
        print(lineTab[w]);
        w++;
    }
    print(selectAnLine);
    print(lineTab);
    print(allumetteTab);
    print(lines);
}

function restartGame() {
    gameDiv.style.display = "none";
    settingsDiv.style.display = "block";
    winDiv.style.display = "none";
    rulesDiv.style.display = "block";
    actualLineOfSelectAllumette = "line-1";
    numberOfSelectedAllumette = 0;
    Players = {namePlayer1:"",namePlayer2:"",colorPlayer1:"",colorPlayer2:""};
    turn = 1;
    numTotalAllumette = 4;
}
print("working");
function print(variable) {
    console.log(variable);
}
