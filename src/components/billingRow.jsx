import TaxDetail from "./taxDetail.jsx";
import Amount from "./amount.jsx";

export default function BillingRow(props) {
    const row = props.row;
    const title = row.title || 'Amount';
    return (
        <div className="billingRow">
            <p>{title}: <Amount amount={row.amount} currency={row.currency}/></p>
            <TaxDetail row={row}/>
            Amount with taxes: <Amount amount={row.amountWithTaxes} currency={row.currency}/>
            <hr/>
        </div>
    );
}