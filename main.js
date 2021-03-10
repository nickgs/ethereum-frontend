let accounts;

window.onload = function() {
    console.log("DApp is loaded");
}

const enableEth = async () => {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts'}).catch((err) => {
        // error handling.
        console.log(err.code);
    })

    console.log(accounts);
}

const checkEthBalance = async () => {
    let balance = await window.ethereum.request({ method: 'eth_getBalance',
        params: [
            accounts[0]
        ]
    }).catch((err) => {
        console.log(err);
    });

    // we will have the balance. Convert hex Wei to Eth.
    balance = parseInt(balance);
    balance = balance / Math.pow(10, 18);
    console.log(balance);

}