import TaxDetail from "./taxDetail.jsx";
import Amount from "./amount.jsx";
import {taxesList} from "../data/taxGridFees.js";

export default function TableRow(props) {
    const row = props.row;
    const title = row.title || 'Amount';
    const customClass = props.customClass || '';

    let taxList = [];
    const taxDefList = taxesList(row.state);
    for (const [name, value] of Object.entries(row)) {
        if(taxDefList.includes(name)){
            taxList.push({'name': name, 'value': value});
        }
    }
    const convClass = row.totalConverted ? '' : 'hidden';

    return (
        <tr className={customClass}>
            <td className="title">{title}</td>
            <td><Amount amount={row.amount} currency={row.currency}/></td>
            {taxList.map((singleTax)=>{
                return <td> <Amount amount={singleTax.value} currency={row.currency}/> </td>
            })}
            <td><Amount amount={row.amountWithTaxes} currency={row.currency}/></td>
            <td className={convClass}><Amount amount={row.totalConverted} currency={row.currency}/></td>
        </tr>
    );
}