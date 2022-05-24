var random; // Guarda números aleatorios.
var map = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Guarda el tablero.
const winningMessageTextElement = document.querySelector('[data-winning-message-text]'); // Coge todos los elementos que contenga la victoria.
const winningMessageElement = document.getElementById('winningMessage'); // Elige el mensaje del final de la partida.
const resetButton = document.getElementById('resetButton'); // Coge el botón del final de la partida.
var winner; // Guarda si el jugador ha ganado, perdido o empatado.

// A partir de este bucle se habilitan los clicks en todas las casillas del juego.
for (i=0; i<9; i++)
{
    document.getElementById("c"+i).addEventListener('click', play);
}

// Para habilitar los dos botones que aparecen en el juego, el de reiniciar y el de volver a jugar una vez se acaba la partida.
document.getElementById("restartButton").addEventListener('click', reset);
document.getElementById("resetButton").addEventListener('click', reset);

// Función en la que empieza la partida y se colocan las fichas del jugador. 
function play(c) 
{   
    if(map[c.target.id[1]] == 0)
    {
        document.getElementById(c.target.id).style.backgroundImage = 'url(images/equis.png)';
        map[c.target.id[1]] = 1;
        document.getElementById(c.target.id).removeEventListener('click', play);
        document.getElementById(c.target.id).style.cursor = "not-allowed";
    }
    else
    {  
        play();
    }

    randomPlay();
    checkWin();
}

// Función para poner la ficha de la máquina en una posición aleatoria del tablero.
function randomPlay()
{
    random = Math.floor((Math.random() *8))+1;
    a = 0;

    for (i=1; i<9; i++)
    {
        if (map[i] == 0) {
            a++
        }
    }

    if (map[random] == 0) 
    {
        document.getElementById("c"+random).style.backgroundImage = 'url(images/circle.png)';
        map[random] = 2;
        document.getElementById("c"+random).removeEventListener('click', play);
        document.getElementById("c"+random).style.cursor = "not-allowed";
    }
    else if (map[random] != 0 && a != 0)
    {
        randomPlay();
    }
    checkWin();
    play()
}

// Función para comprobar la posición de las fichas y a partir de esa comprobación, determinar quien gana. Para detectarlo, comprueba todas las combinaciones de victoria y derrota posibles, si no coincide con ninguna de ellas, pasará a ser empate.
function checkWin()
{
    if(map[0] == map[1] && map[1] == map[2] && map[0] == 1 || map[3] == map[4] && map[4] == map[5] && map[3] == 1 || map[6] == map[7] && map[7] == map[8] && map[6] == 1)
    {
        win();
    } 
    else if(map[0] == map[3] && map[3] == map[6] && map[0] == 1 || map[1] == map[4] && map[4] == map[7] && map[1] == 1 || map[2] == map[5] && map[5] == map[8] && map[2] ==1)
    {
        win();
    } 
    else if(map[0] == map[4] && map[4] == map[8] && map[0] ==1 || map[2] == map[4] && map[4] == map[6] && map[2] ==1)
    {
        win();
    } 
    else if(map[0] == map[1] && map[1] == map[2] && map[0] == 2 || map[3] == map[4] && map[4] == map[5] && map[3] == 2 || map[6] == map[7] && map[7] == map[8] && map[6] == 2)
    {
        defeat();
    } 
    else if(map[0] == map[3] && map[3] == map[6] && map[0] == 2 || map[1] == map[4] && map[4] == map[7] && map[1] == 2 || map[2] == map[5] && map[5] == map[8] && map[2] == 2)
    {
        defeat();
    } 
    else if (map[0] == map[4] && map[4] == map[8] && map[0] == 2 || map[2] == map[4] && map[4] == map[6] && map[2] == 2)
    {
        defeat();
    }
    else if (!map[0] == 0 && !map[1] == 0 && !map[2] == 0 && !map[3] == 0 && !map[4] == 0 && !map[5] == 0 && !map[6] == 0 && !map[7] == 0 && !map[8] == 0)
    {
        draw();
    }
    play();  
}

// Función que determina la victoria. 
function win() 
{
    winner = 1;

    for (i=0; i<9; i++)
    {
        document.getElementById("c"+i).removeEventListener('click', play)
    }
    endGame();
}

// Función que determina la derrota.
function defeat() 
{
    winner = 2;

    for (i=0; i<9; i++)
    {
        document.getElementById("c"+i).removeEventListener('click', play)
    }
    endGame();
}

// Función que determina el empate.
function draw() 
{
    winner = 3;
    for (i=0; i<9; i++)
    {
        document.getElementById("c"+i).removeEventListener('click', play)
    }
    endGame();
}

// Función que determina el final de la partida. Muestra si el jugador ha ganado, ha perdido o ha empatado.
function endGame()
{
    if (winner == 3) 
    {
        winningMessageTextElement.innerHTML = `¡Empate!`;
    }
    if (winner == 1) 
    {
        winningMessageTextElement.innerHTML = `✨ ¡Enhorabuena, has ganado! ✨`;
    }
    if (winner == 2) 
    {
        winningMessageTextElement.innerHTML = `😔 Has perdido, inténtalo otra vez. 😔`;
    }

    winningMessageElement.classList.add('show')
}

// Función que reinicia la partida.
function reset()
{
    for (i=0; i<9; i++)
    {
        document.getElementById("c"+i).style.background = "none";
        document.getElementById("c"+i).style.cursor = "pointer";
    }

    for (i=0; i<9; i++)
    {
        document.getElementById("c"+i).addEventListener('click', play);
    }

    map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    winningMessageElement.classList.remove('show');
    
    play();
}