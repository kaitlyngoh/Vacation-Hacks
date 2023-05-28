<template>
    <h2 class = "Current">Current portfolio</h2>
        <table id = "table" class = "auto-index">
            <tr>
                <th>S.No</th>
                <th>Coin</th>
                <th>Ticker</th>
                <th>Buy_Price</th>
                <th>Buy_Quantity</th>
                <th>Current_Price</th>
                <th>Profit</th>
                <th>Options</th>
            </tr>
        </table> <br><br>
        <h2 id = "TP">Total Profit Is : $0 </h2>
</template>

<script>
import fireBaseApp from "../firebase.js"
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import ccxt from "ccxt"
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const db = getFirestore(fireBaseApp);

export default {
    data() {
        return {
            user: false,
            useremail: ''
        }
    },
    async mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user
                this.useremail = user.email
                console.log(this.useremail)
                display(this.useremail)
            }
        })

        async function display(useremail) {
            let index = 1
            let totalProfit = 0
            let allDocuments = await getDocs(collection(db,String(useremail)))
            allDocuments.forEach((docs) => {
                let documentData = docs.data()
                let coin = (documentData.Coin)
                let ticker = (documentData.Ticker)
                let buyPrice = (documentData.Buy)
                let amt = (documentData.Quantity)
            
                // create rows and cells in the table
                let table = document.getElementById("table")
                let row = table.insertRow(index)

                let cell1= row.insertCell(0)
                let cell2 = row.insertCell(1)
                let cell3 = row.insertCell(2)
                let cell4 = row.insertCell(3)
                let cell5 = row.insertCell(4)
                let cell6 = row.insertCell(5)
                let cell7 = row.insertCell(6)
                let cell8 = row.insertCell(7)

                cell1.innerHTML = index
                cell2.innerHTML = coin
                cell3.innerHTML = ticker
                cell4.innerHTML = buyPrice
                cell5.innerHTML = amt
                cell6.innerHTML = 0
                cell7.innerHTML = 0

                cell7.className = "profits"
                let deleteButton = document.createElement("button")
                deleteButton.id = String(coin)
                deleteButton.className = "bwt"
                deleteButton.innerHTML = "delete"
                
                cell8.appendChild(deleteButton)
                deleteButton.onclick = function() {
                    deleteInstrument(coin, useremail)
                }

                calculatePrice(ticker)

                async function calculatePrice(ticker) {
                    let binance = new ccxt.binance()
                    let x = await binance.fetch_ohlcv(ticker,"5m")
                    let price = x[499][4]
                    cell6.innerHTML = price
                    let profit = Math.round(amt * (parseFloat(price) - parseFloat(buyPrice)))
                    cell7.innerHTML = profit
                    totalProfit = totalProfit + profit
                    document.getElementById("TP").innerHTML = "Total Profit Is : $ " + String(totalProfit);
                }
                index += 1
            })
    }
    async function deleteInstrument(coin, useremail) {
            alert("DELETING : " + coin)
            await deleteDoc(doc(db,String(useremail),coin))
            console.log("Document Successfully Deleted", coin);
            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            document.getElementById("TP").innerHTML = "Total Profit Is : $0";
            display(useremail)
        }
        }
    }
</script>

<style>
h1,h2 {
    text-align: center;
    background-color: rgb(146, 76, 226);
    font: 700;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

tr:nth-child(even) {
    background-color: antiquewhite;
}
th,td {
    border: 1px solid cornsilk;
    text-align: center;
    padding: 8px;
}
.bwt {
    color: aquamarine;
    background-color: red;
}
</style>