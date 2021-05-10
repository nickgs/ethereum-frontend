let accounts;

// first piece of the puzzle. Our contract address!
const libcAddress = "0x4a99d5183fd1d5ffbd1cc32492cd43686c01e945";

// the second piece of the puzzle. Our ABI.
const libcABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

let provider;


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
        
            provider = new ethers.providers.Web3Provider(window.ethereum)
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

const checkTokenBalance = async () => {
    let libcContract = new ethers.Contract(libcAddress, libcABI, provider);

    let balance = await libcContract.balanceOf(accounts[0]);

    console.log(balance.toString());
}

const transferToken = async () => {

    let libcContract = new ethers.Contract(libcAddress, libcABI, provider.getSigner());

    const amount = ethers.utils.parseUnits("1.0", 18);

    let tx = await libcContract.transfer("0x92Ce0aC59ACCA8Ec7BdC5085AA17866a5D133a6A", amount);

    checkEvents();
}

const checkEvents = async() => {
    let libcContract = new ethers.Contract(libcAddress, libcABI, provider);
    
    libcContract.on("Transfer", (from, to, amount) => {
        console.log("Got the event!");
        console.log(from, to, amount.toString());
    })
    
}