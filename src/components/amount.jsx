
export default function Amount(props) {
    const currency = props.currency || 'CAD';
    const amount = props.amount !== 0 ? props.amount.toFixed(2) : props.amount;
    return (<span>{amount} {currency} </span>);
}