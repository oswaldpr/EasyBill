
export default function Amount(props) {
    const currency = props.currency || 'CAD';
    return (<span>{props.amount} {currency} </span>);
}