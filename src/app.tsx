import { useEffect, useRef, useState } from "preact/hooks";
import "./app.css";

type Choice = "rock" | "paper" | "scissors";

const choices: Choice[] = ["rock", "paper", "scissors"];

const choiceMeta: Record<Choice, { lostAction: string; emoji: string }> = {
  rock: { lostAction: "wrapped", emoji: "🪨" },
  paper: { lostAction: "cut", emoji: "📄" },
  scissors: { lostAction: "broke", emoji: "✂️" },
};

function getComputerChoice(lastPlayerChoice?: Choice): Choice {
  const randomIdx = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIdx];
  if (lastPlayerChoice && computerChoice === lastPlayerChoice) {
    let winLastChoiceIdx = randomIdx + 1;
    if (winLastChoiceIdx === choices.length) {
      winLastChoiceIdx = 0;
    }

    return choices[winLastChoiceIdx];
  }

  return computerChoice;
}

export function App() {
  const lastPlayerChoice = useRef<Choice>();
  const [playerChoice, setPlayerChoice] = useState<Choice>();
  const [computerChoice, setComputerChoice] = useState<Choice>();
  const [winner, setWinner] = useState<"player" | "computer" | "draw">();

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  function onSubmitChoice() {
    if (!playerChoice) {
      return;
    }

    const compChoice = getComputerChoice(lastPlayerChoice.current);
    setComputerChoice(compChoice);
    if (playerChoice === compChoice) {
      setWinner("draw");
      return;
    }

    switch (playerChoice) {
      case "rock":
        setWinner(compChoice === "scissors" ? "player" : "computer");
        break;
      case "paper":
        setWinner(compChoice === "rock" ? "player" : "computer");
        break;
      case "scissors":
        setWinner(compChoice === "paper" ? "player" : "computer");
        break;
    }

    lastPlayerChoice.current = playerChoice;
  }

  function reset() {
    setPlayerChoice(undefined);
    setComputerChoice(undefined);
    setWinner(undefined);
  }

  useEffect(() => {
    if (winner === "player") {
      setWins((curr) => curr + 1);
    }

    if (winner === "computer") {
      setLosses((curr) => curr + 1);
    }
  }, [winner]);

  return (
    <div>
      {winner && playerChoice && computerChoice ? (
        <div>
          {winner === "draw" && (
            <div>
              <h2>
                The game is a draw 😕 <br />
                {`Both you and the computer played ${playerChoice}.`}
              </h2>
              <h2>{`${choiceMeta[playerChoice].emoji}=${choiceMeta[computerChoice].emoji}`}</h2>
            </div>
          )}
          {winner === "player" && (
            <div>
              <h1>You won! 🎉</h1>
              <h1>{`${choiceMeta[playerChoice].emoji}💥${choiceMeta[computerChoice].emoji}`}</h1>
              <h2>{`Your ${playerChoice} ${choiceMeta[computerChoice].lostAction} the computer's ${computerChoice}.`}</h2>
            </div>
          )}
          {winner === "computer" && (
            <div>
              <h1>You lost 🤖</h1>
              <h1>
                {`${choiceMeta[computerChoice].emoji}💥${choiceMeta[playerChoice].emoji}`}
              </h1>
              <h2>{`The computer's ${computerChoice} ${choiceMeta[playerChoice].lostAction} your ${playerChoice}.`}</h2>
            </div>
          )}
          <h4>
            Wins: {wins} <br />
            Loses: {losses}
          </h4>
          <button className="play-again" onClick={reset}>
            Play again?
          </button>
        </div>
      ) : (
        <div>
          <h2>Choose your weapon</h2>
          <div>
            {choices.map((choice) => (
              <button
                key={choice}
                className="choice-button"
                onClick={() => setPlayerChoice(choice)}
                style={{
                  ...(playerChoice === choice && {
                    border: "5px solid black",
                  }),
                }}
              >
                <h2>{choice}</h2>
              </button>
            ))}
          </div>
          <button
            className="submit-button"
            disabled={!playerChoice}
            onClick={onSubmitChoice}
          >
            {`Shoot ${playerChoice ? choiceMeta[playerChoice].emoji : ""}`}
          </button>
        </div>
      )}
    </div>
  );
}
