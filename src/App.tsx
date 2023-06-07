import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

function App() {
  const [starting, setStarting ] = useState(0);
  const [income, setIncome]  = useState(0);
  const [expenses, setExpenses ]  = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [dateList, setDateList] = useState< (string | number)[][] | undefined>();

  useEffect(()=>{
    function budgetByDate(targetDate: Date){
      function frequencyMulti(amt: number, frequency: number){
        return Math.floor(amt *  Math.floor((((targetDate.getTime() - Date.now())/(1000*60*60*24))/frequency)));
      }
      function monthlyMulti(amt: number){
        let monthDifference = targetDate.getMonth() - startDate.getMonth();
        let yearDifferenceInMonths = (targetDate.getFullYear() - startDate.getFullYear())* 12;
        return  amt * (monthDifference + yearDifferenceInMonths) ;
      }
      return starting  - monthlyMulti(expenses) + frequencyMulti(income, 14);
    }
    const targetDate = new Date(startDate);
    const resultArray = [];
    for(let i =0; i<60; i++){
      targetDate.setDate(targetDate.getDate()+7);
      resultArray.push([targetDate.toLocaleDateString(),budgetByDate(targetDate) ]);
    }
    setDateList(resultArray);
  },[income,expenses, starting, startDate])
  return (
    <MainDiv className="App">
      <main>
        <h3>Inputs</h3>
        <div className="inputs" >
        <div  className="inputDiv" >
          <p>Starting</p> <input type="number" value={starting} onChange={e=>setStarting(+e.target.value)} />
        </div>
        <div  className="inputDiv" >
          <p>Bi-weekly Income</p> <input type="number" value={income} onChange={e=>setIncome(+e.target.value)} />
        </div>
        <div  className="inputDiv" >
          <p>Monthly Expenses</p> <input type="number" value={expenses} onChange={e=>setExpenses(+e.target.value)} />
        </div>
        </div>
        <h3>Results</h3>
        <div className="results">
{
  (dateList || []).map(element=>(<div className="item">
  <h5>{element[0]}</h5> <h5>{element[1]}</h5>
  </div>))
}
        </div>
     </main>
    </MainDiv>
  );
}

const MainDiv =  styled.div`
display: grid;
grid-template-columns: 1fr 4fr 1fr;
.inputDiv{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: .5rem;
}
p{
  margin-bottom: .5rem;
}
input{
  height: 2rem;
}
.inputs{
  display: flex;
}
h5{
  padding: .75rem;
  margin: 0;
}

.results{
  width: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  div:nth-child(even) {
    background-color: lightgrey;
}

}
.item{
  display: flex;
  width: 50%;
  justify-content: space-between;

  padding: 0 2rem;
}
main{
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
`
export default App;
