import "../css/App.css";
import {useState,useRef,createContext} from "react";
import {FaPlus,FaBiohazard} from "react-icons/fa";
import Transaction from "./Transaction.js";

export const TransactionsContext=createContext();
export const IncomeExpenseContext=createContext();

const App=()=>{
	
	const [transactions,setTransactions]=useState([]);
	const [expense,setExpense]=useState(0);
	const [income,setIncome]=useState(0);
	const titleEntry=useRef(0);
	const amountEntry=useRef(0);


	function addTransaction(event){
		event.preventDefault();
		const title=titleEntry.current.value;
		titleEntry.current.value="";
		const amount=amountEntry.current.value;
		amountEntry.current.value="";

		if(title==""||amount==""){
			return;
		}

		setTransactions([...transactions,{title:title,amount:amount}]);
		if(amount<0){
			setExpense(expense+Math.abs(amount));
		}else{
			setIncome(income+Math.abs(amount));
		}


	}

	return(
		<>
			<header className="fixed-top text-bg-dark p-1">
				<h1>Budget App <FaBiohazard/></h1>	
			</header>
			<main>
				<section className="text-center p-2 container">
					<h5 className="fw-light">Your Balance</h5>
					<h2>R {income-expense}</h2>	
				</section>

				<section className="container ">
					<div className="row m-4">
						<div className="col-6 text-center">
							<h3>Income</h3>
							<hr/>
							<h2 className="text-success">R  {income}</h2>
						</div>

						<div className="col-6 text-center">
							<h3>Expense</h3>
							<hr/>
							<h2 className="text-danger">R  {expense}</h2>
						</div>
					</div>
				</section>

				<TransactionsContext.Provider value={[transactions,setTransactions]}>
					<IncomeExpenseContext.Provider value={[income,setIncome,expense,setExpense]}>
						<section className="border container p-3 col-10 rounded-3 mb-4">
							<h3>History</h3>
							<div className="p-3">
								{transactions.map(t=>{
									return <Transaction key={t.title} title={t.title} amount={t.amount}/>
								})}
							</div>
						</section>
					</IncomeExpenseContext.Provider>
				</TransactionsContext.Provider>
				
				<section className="border container p-3 col-10 rounded-3">
					<div className="row row-cols-1">
						<h3>Make transaction</h3>
						<form>			
							<div className="m-2">
								<input autoFocus ref={titleEntry} type="text" placeholder="transaction title" className="form-control form-control-lg"/>
							</div>
							<div className="m-2">
								<label className="m-1">(negative - expense, positive - income)</label>
								<input ref={amountEntry} type="number" placeholder="amount" className="form-control form-control-lg"/>
							</div>
							<div className="m-2 row justify-content-center">
								<button onClick={addTransaction} id="add-btn" className="btn"><FaPlus/></button>
							</div>
						</form>
					</div>
					
				</section>
			</main>
			<footer>
				<small className="text-muted">Copyright &copy; 2022 Kwanele Shelembe.</small>
			</footer>	
		</>
	)
}

export default App;