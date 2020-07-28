import React, { useState } from 'react';

const Ticket  = ({setTicket, ticketLetterStart, ticketLetterEnd, ticketsPerLetter}) => {
    const [selectedLetter, setSelectedLetter ] = useState(null)
    const [ticketClicked, setTicketClicked ] = useState(null)
    const start = ticketLetterStart.charCodeAt()
    const end = ticketLetterEnd.charCodeAt()
    const totalTicket = ticketsPerLetter - 1

    const albt = () => {
        let letters = []
        
        for (var i = start; i <= end; i++){
            letters.push(String.fromCharCode(i))
        }
        return letters
    }

    const padZero = (str, len) => {
        var s= String(str), c = '0';
        while(s.length < len) s = c + s;
        return s;
    }

    const numbers = () => {
        let num = []
        const pad = totalTicket <= 99 ? "2" : "3"
        for (var i = 0; i <= totalTicket; i++) {
            num.push(
                padZero(i, pad)
            )
        }
        return num
    }

    const ticketHandler = (ticket) => {
        setTicket(ticket)
        setTicketClicked(ticket)
    }

    const luckyDip = () => {
        const randomLet = albt()[Math.floor(Math.random() * albt().length)]
        setSelectedLetter(randomLet)
        const randomNum = numbers()[Math.floor(Math.random() *  totalTicket)]
        const ticket = String(randomLet + randomNum)
        ticketHandler(ticket)
    }

    return (
        <div>
            <div>
                {
                    albt().map((val,i)=>{
                        return (
                            <button style={{background: selectedLetter === val && 'red'}} key={i} onClick={() => setSelectedLetter(val)}>{val}</button>
                        )
                    })
                }
                <button onClick={luckyDip}>luckyDip</button>
                <div>
                    {
                        selectedLetter && numbers().map((val,i) => {
                            let ticket = String(selectedLetter + val)
                            return (
                                <button style={{background: ticket === ticketClicked && 'red'}}  key={ticket} onClick={() => ticketHandler(ticket)}>{ticket}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Ticket;
