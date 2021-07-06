const Web3 = require('web3')
const web3 = new Web3('http://localhost:7545')
const fs = require('fs');

const rawCheque = fs.readFileSync('./build/contracts/Cheque.json')
const parsedCheque = JSON.parse(rawCheque)
const contractAddress = parsedCheque.networks['5777'].address

let signPayment = async (recipient, amount) => {
    const accounts = await web3.eth.getAccounts()
    const payer = accounts[0]
    const txCount = await web3.eth.getTransactionCount(payer)
    const hash = web3.utils.soliditySha3(recipient, amount, txCount, contractAddress)

    try {
        const sigObject = await web3.eth.accounts.sign(hash, '97316871bd3e702fa072ab9ec75dcd0c11932c7e85c7bcf5349d93aaa749d9d0')
        console.log(amount, txCount, sigObject)
    } catch (error) {
        console.log(error)
    }
} 

signPayment('0x4152Bc7419796D7bd252AD5EeE69905Cf1d31B85', 1e18)


