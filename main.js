let accounts;

window.onload = function() {
    console.log("DApp is loaded");

    if(window.ethereum) {
        // we can access web3!
        this.ethereum.on('accountsChanged', handleAccountsChanged);

        window.ethereum.request({ method: 'eth_accounts'})
            .then(handleAccountsChanged)
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        console.log("Please install a digital wallet like Metamask");
    }
}

const handleAccountsChanged = (a) => {
    console.log("Accounts changed");
    accounts = a;
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

const sendTransaction = async () => {
    let params = [
        {
            from: accounts[0],
            to: '0x1Abe2FA6908F74863BB857029e353cA3997feefA',
            gas: Number(21000).toString(16),
            gasPrice: Number(2500000).toString(16),
            value: Number(1000000000000000000).toString(16)
        }
    ]

    let result = await window.ethereum.request({method: 'eth_sendTransaction', params}).catch((err) => {
        console.log(err);
    })

}