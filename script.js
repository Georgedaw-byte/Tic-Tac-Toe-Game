// gameboard IIFE function to call it self
game = (function()
{
    const squares = document.querySelectorAll(".square")
    const squares_arr = Array.from(squares)
    const score1 = document.querySelector(".one")
    const score2 = document.querySelector(".two")
    const reset = document.querySelector("button")
    let Dom_man = {
    render(gameboard, player1, player2)
    {
        squares_arr.forEach((square,i) => square.textContent = gameboard[i])
        score1.textContent = `${player1.name}:  ${player1.get_score()}`
        score2.textContent = `${player2.name}:  ${player2.get_score()}`
    },
    click_button: function(gameboard, check_game_ended, reset_gameboard) 
    {        
        squares_arr.forEach((square, i) =>
    {

            square.addEventListener("click", () =>
            {
                if (gameboard[i] === '')
                {
                    if(player1.turn)
                    {
                        gameboard[i] = player1.choice
                        console.log(gameboard)
                        player1.turn = false
                        player2.turn = true
                        this.render(gameboard, player1, player2)
                        if (check_game_ended() && gameboard.includes(''))
                        {
                            player1.turn = true
                            player2.turn = false
                            player1.increment_score()
                            alert(`${player1.name} is the winner`)
                            reset_gameboard(gameboard)
                            this.render(gameboard, player1, player2)
                            console.log(player1.get_score())
                        }
                        else if (!gameboard.includes(''))
                        {
                            alert("tie")
                            reset_gameboard(gameboard)
                            this.render(gameboard, player1, player2)
                        }
                    }
                    else if (player2.turn) 
                    {
                        gameboard[i] = player2.choice
                        player2.turn = false
                        player1.turn = true
                        this.render(gameboard, player1, player2)
                        if (check_game_ended() && gameboard.includes(''))
                        {
                            player2.turn = true
                            player1.turn = false
                            player2.increment_score()
                            alert(`${player2.name} is the winner`)
                            reset_gameboard(gameboard)
                            this.render(gameboard, player1, player2)
                            console.log(player2.get_score())
                        }
                        else if (!gameboard.includes(''))
                        {
                            alert("tie")
                            reset_gameboard(gameboard)
                            this.render(gameboard, player1, player2)
                        }
                    }
                }
            })

    })
    },
    reset_button(gameboard)
    {
        reset.addEventListener("click", (event) => {
            event.preventDefault()
            reset_gameboard(gameboard)
            player1.reset_score()
            player2.reset_score()
            this.render(gameboard, player1, player2)
        })
    }
    }
    function reset_gameboard(gameboard)
    {
        for(let i = 0; i < 9; i++)
        {
            gameboard[i] = ''
        }
    }

    // make the array
    let gameboard = []
    // make two player objects using a factory function
    let Player = function(name, choice, turn)
    {
        let score = 0
        let increment_score = () => score++   
        let get_score = () => score
        let reset_score = () => score = 0
        return {name, choice, get_score, turn, increment_score, reset_score}
    }

    let player1 = Player(prompt("Player1 name"), "X", true)
    let player2 = Player(prompt("Player2 name"), "O", false)

    // make the game flow
    gameflow = (function game_flow()
    {
        reset_gameboard(gameboard)
        Dom_man.render(gameboard, player1, player2)
        function check_game_ended()
        {
            if((gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] !== '') ||
            (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3] !== '') ||
            (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6] !== '') ||
            (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0] !== '') ||
            (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1] !== '') ||
            (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2] !== '') ||
            (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0] !== '') ||
            (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2] !== '') )
            {
                return true
            }
            else if (!gameboard.includes(''))
            {
                console.log("one detected")
                return true
            }
            return false
        }

            Dom_man.click_button(gameboard, check_game_ended, reset_gameboard)
            Dom_man.reset_button(gameboard)
        })()
})()