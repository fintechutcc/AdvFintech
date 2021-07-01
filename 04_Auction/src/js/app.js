App = {
    web3Provider: null,
    contracts: {},
  
    init: async function () {
      $.getJSON('../bikes.json', function (data) {
        var bikesRow = $('#bikesRow');
        var bikeTemplate = $('#bikeTemplate');
  
        for (i = 0; i < data.length; i++) {
          bikeTemplate.find('.panel-title').text(data[i].name);
          bikeTemplate.find('img').attr('src', data[i].picture);
          bikeTemplate.find('.bike-price').text(data[i].price);
          bikeTemplate.find('.bike-arrival-date').text(data[i].arrival_date);
          bikeTemplate.find('.btn-reserve').attr('data-id', data[i].id);
  
          bikesRow.append(bikeTemplate.html());
        }
      });
  
      return await App.initWeb3();
    },
  
    initWeb3: async function () {
      // Modern dapp browsers...
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
  
      web3 = new Web3(App.web3Provider);
  
      return App.initContract();
    },
  
    initContract: function () {
      $.getJSON('MyAuction.json', function (data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var MyAuctionArtifact = data;
        App.contracts.MyAuction = TruffleContract(MyAuctionArtifact);
  
        // Set the provider for our contract
        App.contracts.MyAuction.setProvider(App.web3Provider);
  
        // Use our contract to retrieve and mark the adopted pets
        //return App.markReserved();
      });
  
      //return App.bindEvents();
    }
}

function bid() {
    var mybid = document.getElementById('value').value;
    auction.bid({
        value: web3.toWei(mybid, "ether"),
        gas: 200000
    }, function (error, result) {
        if (error) {
            console.log("error is " + error);
            document.getElementById("biding_status").innerHTML = "Think to bidding higher";
        } else {
            document.getElementById("biding_status").innerHTML = "Successfull bid, transaction ID" + result;
        }
    });
}

function init() {
    auction.auction_end(function (error, result) {
        document.getElementById("auction_end").innerHTML = result;
    });
    auction.highestBidder(function (error, result) {
        document.getElementById("HighestBidder").innerHTML = result;
    });
    auction.highestBid(function (error, result) {
        var bidEther = web3.fromWei(result, 'ether');
        document.getElementById("HighestBid").innerHTML = bidEther;
    });
    auction.STATE(function (error, result) {
        document.getElementById("STATE").innerHTML = result;
    });
    auction.Mycar(function (error, result) {
        document.getElementById("car_brand").innerHTML = result[0];
        document.getElementById("registration_number").innerHTML = result[1];
    });
    auction.bids(bidder, function (error, result) {
        var bidEther = web3.fromWei(result, 'ether');
        document.getElementById("MyBid").innerHTML = bidEther;
        console.log(bidder);
    });
}

var auction_owner = null;
auction.get_owner(function (error, result) {
    if (!error) {
        auction_owner = result;
        if (bidder != auction_owner) {
            $("#auction_owner_operations").hide();
        }
    }
});

function cancel_auction() {
    auction.cancel_auction(function (error, result) {
        console.log(result);
    });
}

function Destruct_auction() {
    auction.destruct_auction(function (error, result) {
        console.log(result);
    });
}

var BidEvent = auction.BidEvent();
BidEvent.watch(function (error, result) {
    if (!error) {
        $("#eventslog").html(result.args.highestBidder + ' has bidden(' + result.args.highestBid + ' wei)');
    } else {
        console.log(error);
    }
});

var CanceledEvent = auction.CanceledEvent();
CanceledEvent.watch(function (error, result) {
    if (!error) {
        $("#eventslog").html(result.args.message + ' at ' + result.args.time);
    }
});

const filter = web3.eth.filter({
    fromBlock: 0,
    toBlock: 'latest',
    address: contractAddress,
    topics: [web3.sha3('BidEvent(address,uint256)')]
});

filter.get((error, result) => {
    if (!error) console.log(result);
});