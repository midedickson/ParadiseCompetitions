import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getCompetition } from '../Redux/competitions/competitionAction'
import { ProgressBar } from 'react-bootstrap';
import Ticket from './Ticket'



const CompetitionDetails = ({ match, competition, getCompetition }) => {
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { params: {id} } = match;
      await getCompetition(id)
    };
    fetchData()
  },[]) 

  
  return (
    <>
    <div>
      <h3>Prices</h3>
      {
        competition && <>
              <img src={competition.associated_product.image} alt={'image'} />
      <div>677 left</div>
      <ProgressBar now={77} label={'77%'} animated/>
      <h3>Description</h3>
      <div>Title: {competition.title}</div>
      <div>
        <h6>Groups</h6>
        <ul>
        {
          competition.groups.map((val,i)=>(
            <li>{val}</li>
          ))
        }
        </ul>
      </div>
      <div>Prize to win: {competition.prize_to_win.title}</div>
      <div>description: {competition.description}</div>
      <br/>
      <div>Select Your ticket</div>
      <div>First click a letter, then cjoose a number. Repeat this in case you want more tickets.<br/>
       Our Lucky Dip makes a random choice.</div>
       <Ticket setTicket={setTicket}/>
        </>
      }

    </div>
    </>
  )
}

const mapStateToProps = (state) => {
 return {
   competition: state.competition.competition
 }
}

const mapDispatchToProps = {
  getCompetition
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionDetails);