var money = 0 ;
var availableBills = [1,2,5,10,20,50];
//var money = 89;

function getWalletSum(wallet) {
    var sum = 0;
    for (var bill in wallet) {
        sum += wallet[bill] * bill;
    }
    return sum;
}
 
function copyWallet(wallet) {
    var newWallet = {};
    for (var bill in wallet) {
        if (wallet[bill] != 0) {
            newWallet[bill] = wallet[bill];
        }
    }
    return newWallet;
}
 
function mergeWallets(wallet1, wallet2) {
    var mergedWallet = copyWallet(wallet1);
    for (var bill in wallet2) {
        if (wallet2[bill] != 0) {
            mergedWallet[bill] = wallet2[bill];
        }
    }
    return mergedWallet;
}
 
var cycles = 0;
var loops = 0;
 

function getPossibleWallets(money, startingBills) {
    cycles++;
    var possibleWallets = [];
    var wallet = {};
    var bills = startingBills.slice();
    var maxBill = bills.pop();
    wallet[maxBill] = Math.ceil(money / maxBill);
    while (wallet[maxBill] >= 0) {
        loops++;
        var walletSum = getWalletSum(wallet);
        if (walletSum == money) {
            possibleWallets.push(copyWallet(wallet));
            return possibleWallets;
        }
        if (walletSum > money) {
            possibleWallets.push(copyWallet(wallet));
        } else {
            if (bills.length > 0) {
                var remaining = money - getWalletSum(wallet);
                var remainingWallets = getPossibleWallets(remaining, bills);
                for (var i = 0; i < remainingWallets.length; i++) {
                    var mergedWallet = mergeWallets(wallet, remainingWallets[i]);
                    possibleWallets.push(mergedWallet);
                    if (getWalletSum(mergedWallet) == money) {
                        return possibleWallets;
                    }
                };
            }
        }
        wallet[maxBill] = wallet[maxBill] - 1;
    }
    return possibleWallets;
}
 

function getSmallestSufficientWallet(money, startingBills) {
    var possibleWallets = getPossibleWallets(money, startingBills);
    console.log(possibleWallets);
    var minWallet = possibleWallets[0];
    for (var i = 0; i < possibleWallets.length; i++) {
        var possibleWallet = possibleWallets[i];
        var possibleWalletSum = getWalletSum(possibleWallet);
        if (possibleWalletSum == money) {
            return possibleWallet;
        }
        if (possibleWalletSum < getWalletSum(minWallet) && possibleWalletSum >= money) {
            minWallet = possibleWallet;
        }
    }
    return minWallet;
}
 

 

function billsToString(billsArray) {
    return billsArray.join(', ') + ' ';
}
 

function walletToString(wallet) {
    var result = [];
    for (bill in wallet) {
        result.push(wallet[bill] + ' * ' + bill + '');
    }
    return result.join(' , ');
}
 
function main() {
    money = parseInt(document.getElementById("txtAmout").value)

    var wallet = getSmallestSufficientWallet(money, availableBills);
    console.log('cycles = ' + cycles);
    console.log('loops = ' + loops);

var questionString = '<div>Money : ' + money + '</div>';
questionString += '<div>Denominations : ' + billsToString(availableBills) + '</div>';
document.getElementById('question').innerHTML = questionString;
document.getElementById('bills').innerHTML = 'Wallet : ' + walletToString(wallet);
}
 
 
 
 
 

 
