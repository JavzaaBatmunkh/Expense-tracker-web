export function CurrencyDisplay({ amount }) {
    const formattedAmount = new Intl.NumberFormat('mn-MN', {
        style: 'currency',
        currency: 'MNT'
    }).format(amount);

    return <span>{formattedAmount}</span>;
}