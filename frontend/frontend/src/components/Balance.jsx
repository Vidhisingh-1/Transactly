
export function Balance ({balance})
{
    return (
        <div className ="balance-container" >
            <div className = "balance-label" >
                Your Balance
            </div>
            <div className = "balance-amount">
                Rs. {balance}
            </div>
        </div>
    )
}