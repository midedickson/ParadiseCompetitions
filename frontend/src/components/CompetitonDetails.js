import React, { useEffect, useState } from 'react'

const CompetitionDetails = ({ match }) => {
  const [ competitonId, setCompetionId ] = useState(null)
  useEffect(() => {
    setCompetionId(match.params)
  })
}

export default CompetitionDetails