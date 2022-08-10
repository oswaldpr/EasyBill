
export default function Amount(props) {
    const currency = props.currency || 'CAD';
    let amount = 0;
    if(props.amount !== 0 || props.amount !== null){
        amount = props.amount !== 0 ? props.amount.toFixed(2) : props.amount;
    }
    return (<span>{amount} {currency} </span>);
}