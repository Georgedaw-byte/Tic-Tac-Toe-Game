// gameboard IIFE function to call it self

game = (function()
{
    const prompt = require('prompt-sync')({ sigint: true }); // { sigint: true } allows Ctrl+C to exit
    function reset_gameboard(gameboard)
    {
        for(let i = 0; i < 9; i++)
        {
            gameboard[i] = '1'
        }
    }
    function print_gameboard(gameboard)
    {

        for(let i = 0; i < 9; i++)
        {
            if(i === 3 || i === 6){
                process.stdout.write("\n")
            }       
            process.stdout.write(gameboard[i])     
        }
    }
    // make the array
    let gameboard = []
    // make two player objects using a factory function
    let Player = function(name, choice, turn)
    {
        let score = 0
        let increment_score = function() {
            score++
            return score   
        }
        let get_score = () => score
        return {name, choice, get_score, turn, increment_score}
    }
    let player1 = Player("George", "X", true)
    let player2 = Player("Oliver", "O", false)

    // make the game flow
    gameflow = (function game_flow()
    {
        let winner;
        reset_gameboard(gameboard)
        function check_game_ended()
        {
            if((gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] !== '1') ||
            (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3] !== '1') ||
            (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6] !== '1') ||
            (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0] !== '1') ||
            (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1] !== '1') ||
            (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2] !== '1') ||
            (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0] !== '1') ||
            (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2] !== '1') )
            {
                return true
            }
            else if (!gameboard.includes('1'))
            {
                console.log("one detected")
                return true
            }
            return false
        }
        playGame = (function play_game()
        {
            while(true)
            {
                let index;
                if (player1.turn)
                {
                    do 
                    {
                        index = prompt("Type index: ")
                    }
                    while(gameboard[+index] !== '1')
                    gameboard[+index] = player1.choice
                    print_gameboard(gameboard)
                    player1.turn = false
                    player2.turn = true
                    if (check_game_ended() && gameboard.includes('1'))
                    {
                        winner = player1
                        player1.turn = true
                        player2.turn = false
                        player1.increment_score()
                        break
                    }
                    else if (!gameboard.includes('1'))
                    {
                        winner = "Tie"
                        break
                    }

                }
                else if (player2.turn)
                {
                    do 
                    {
                        index = prompt("Type index: ")
                    }
                    while(gameboard[+index] !== '1')
                    gameboard[+index] = player2.choice
                    print_gameboard(gameboard)
                    player1.turn = true
                    player2.turn = false
                    if (check_game_ended() && gameboard.includes('1'))
                    {
                        winner = player2
                        player2.turn = true
                        player1.turn = false
                        player2.increment_score()
                        break
                    }
                    else if (!gameboard.includes('1'))
                    {
                        winner = "Tie"
                        break
                    }
                }
            }
                    if (typeof winner === 'string')
                    {
                        console.log(winner)
                    }
                    else
                    {
                    console.log(`\n${winner.name}. Score is ${winner.get_score()}`)
                    }
                    let play_again = prompt("Play again? (y/n): ")
                    if (play_again === 'y')
                    {
                        game_flow()
                    }
                    else 
                    {
                        return 
                    }
        })()
    })()
})()