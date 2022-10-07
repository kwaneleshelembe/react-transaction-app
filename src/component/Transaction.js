import {useContext} from "react";
import {FaTimes} from "react-icons/fa";
import {TransactionsContext,IncomeExpenseContext} from "./App.js";

const Transaction=({title,amount})=>{

	const type= amount>0 ? "income" : "expense";

	const [transactions,setTransactions]=useContext(TransactionsContext);
	const [income,setIncome,expense,setExpense]=useContext(IncomeExpenseContext);

	function deleteTransaction(){
		setTransactions(transactions.filter((t)=>{
			return t.title!=title && t.amount!=amount;
		}));

		if(amount>0){
			setIncome(income-amount);
		}else{
			setExpense(expense+Number(amount));
		}
	}

	return (
		<div className={"transaction container rounded-3 border "+type}>
			<div className="row align-items-center p-2">
				<small className="col-4">{title}</small>
				<h5 className="col-4">R {amount}</h5>
				<div className="col-4 row align-items-center justify-content-end">
					<button onClick={deleteTransaction} className="btn-close"></button>
				</div>
			</div>
		</div>
	)
}

export default Transaction;