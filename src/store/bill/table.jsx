import TableRow from "../../components/tableRow.jsx";
import {getHeaderRowList, getSummaryRowDefinition} from "../../data/helper.js";

export function Table(props) {
    const model = props.model;

    const headRow = getHeaderRowList(model);
    const summaryRow = getSummaryRowDefinition(model);
    const tableClass = model.amount > 0 ? 'billing_table section' : 'billing_table section hidden';

    return (
        <table className={tableClass}>
            <thead>
            <tr>
                {headRow.map((headTitle, id)=>{
                    return <th className={id === 0 ? "title" : ""}>{headTitle}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {model.rows.map((singleRow)=>{
                return <TableRow row={singleRow}/>
            })}
            <TableRow row={summaryRow} customClass="summary"/>
            </tbody>
        </table>
    );
}