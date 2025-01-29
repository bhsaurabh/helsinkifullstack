import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  // use deconstruction to get the values from the props

  // calculate the total, average and positive feedback
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  // if no feedback is given, return a message
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  // parent componet that keeps track of the state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    {id: 1, text: 'If it hurts, do it more often.'},
    {id: 2, text: 'Adding manpower to a late software project makes it later!'},
    {id: 3, text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'},
    {id: 4, text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'},
    {id: 5, text: 'Premature optimization is the root of all evil.'},
    {id: 6, text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'},
    {id: 7, text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'},
    {id: 8, text: 'The only way to go fast, is to go well.'}
  ]

  const [selected, setSelected] = useState(0)  // state for the selected anecdote's id
  const [votes, setVotes] = useState(
    anecdotes.reduce((acc, anecdote) => {
      acc[anecdote.id] = 0;
      return acc;
    }, {})
  )  // acc is the accumulator

  const handleVote = (id) => {
    const newVotes = {...votes}  // create a new object with the votes
    newVotes[id] = newVotes[id] + 1  // increment the vote for the selected anecdote
    setVotes(newVotes)  // update the state with the new votes
  }

  const findAnecdoteById = (id) => {
    return anecdotes.find(anecdote => anecdote.id === Number(id))
  }

  const getMaxVotesId = () => {
    const maxId = Object.keys(votes).reduce((acc, cur) => votes[acc] > votes[cur] ? acc : cur, 1)
    return findAnecdoteById(maxId)
  }

  console.log(getMaxVotesId())
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br />
      <h3>anecdote of the day</h3>
      <p>{anecdotes[selected].text}</p>
      <p>has {votes[anecdotes[selected].id]} votes</p>
      <Button onClick={() => handleVote(anecdotes[selected].id)} text="vote" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <h3>anecdote with most votes</h3>
      <p>{getMaxVotesId().text}</p>
    </div>
  )
}

export default App