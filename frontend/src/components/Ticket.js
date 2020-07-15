import React, { useState } from "react";

const Ticket = ({ setTicket }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [ticketClicked, setTicketClicked] = useState(null);
  const albt = () => {
    let letters = [];
    for (var i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    return letters;
  };

  const numbers = () => {
    let num = [];
    for (var i = 0; i <= 99; i++) {
      num.push(i);
    }
    return num;
  };

  const ticketHandler = (ticket) => {
    setTicket(ticket);
    setTicketClicked(ticket);
  };

  const luckyDip = () => {
    const randomLet = albt()[Math.floor(Math.random() * 26)];
    setSelectedLetter(randomLet);
    const randomNum = numbers()[Math.floor(Math.random() * 99)];
    const ticket = String(randomLet + randomNum);
    ticketHandler(ticket);
  };

  return (
    <div>
      <div>
        {albt().map((val, i) => {
          return (
            <button
              style={{ background: selectedLetter === val && "red" }}
              key={i}
              onClick={() => setSelectedLetter(val)}
            >
              {val}
            </button>
          );
        })}
        <button onClick={luckyDip}>luckyDip</button>
        <div>
          {selectedLetter &&
            numbers().map((val, i) => {
              let ticket = String(selectedLetter + val);
              return (
                <button
                  style={{ background: ticket === ticketClicked && "red" }}
                  key={ticket}
                  onClick={() => ticketHandler(ticket)}
                >
                  {ticket}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
