import Amount from "./amount.jsx";
import {taxesList} from "../data/taxGridFees.js";

export default function TaxDetail(props) {
    const row = props.row;
    let taxList = [];
    const taxDefList = taxesList(row.state);
    for (const [name, value] of Object.entries(row)) {
        if(taxDefList.includes(name) && value > 0){
            taxList.push({'name': name, 'value': value});
        }
    }

    return (
        <div>
            <p>Total taxes: <Amount amount={row.totalTax}/></p>
            <p>
                {taxList.map((singleTax)=>{
                    return <span>{singleTax.name}: <Amount amount={singleTax.value} currency={row.currency}/> </span>
                })}
            </p>
        </div>
    );
}