import TaxDetail from "./taxDetail.jsx";
import Amount from "./amount.jsx";
import {taxesList} from "../data/taxGridFees.js";

export default function TableRow(props) {
    const row = props.row;
    const title = row.title || 'Amount';

    let taxList = [];
    const taxDefList = taxesList();
    for (const [name, value] of Object.entries(row)) {
        if(taxDefList.includes(name)){
            taxList.push({'name': name, 'value': value});
        }
    }

    return (
        <tr>
            <td>{title}</td>
            <td><Amount amount={row.amount}/></td>
            {taxList.map((singleTax)=>{
                // return <td>{singleTax.name}: <Amount amount={singleTax.value}/> </td>
                return <td> <Amount amount={singleTax.value}/> </td>
            })}
            <td><Amount amount={row.amountWithTaxes}/></td>
        </tr>
    );
}