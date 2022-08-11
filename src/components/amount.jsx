export default function Amount(props) {
    const currency = props.currency || 'CAD';
    let amount = 0 + ' ' + currency;
    if(props.amount){
        if(typeof props.amount === 'string'){
            amount = props.amount;
        } else {
            amount = props.amount.toFixed(2) + ' ' + currency;
        }
    }
    return (<span>{amount}</span>);
}