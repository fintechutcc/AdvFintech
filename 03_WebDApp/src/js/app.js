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
    $.getJSON('Reservation.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ReservationArtifact = data;
      App.contracts.Reservation = TruffleContract(ReservationArtifact);

      // Set the provider for our contract
      App.contracts.Reservation.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markReserved();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-reserve', App.handleReservation);
  },

  markReserved: function () {
    var reservationInstance;

    App.contracts.Reservation.deployed().then(function (instance) {
      reservationInstance = instance;

      return reservationInstance.getReservers.call();
    }).then(function (reservers) {
      for (i = 0; i < reservers.length; i++) {
        if (reservers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-bike').eq(i).find('button').text('จองโดย : ' + String(reservers[i]).substring(0,6) + '...' + String(reservers[i]).substring(38))
          .attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleReservation: function (event) {
    event.preventDefault();

    var bikeId = parseInt($(event.target).data('id'));
    var reservationInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Reservation.deployed().then(function (instance) {
        reservationInstance = instance;

        // Execute adopt as a transaction by sending account
        return reservationInstance.reserve(bikeId, { from: account });
      }).then(function (result) {
        return App.markReserved();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
