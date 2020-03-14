let user = { longitude: "", latitude: "", device: "" };

async function readTezosContract() {

    const conseilServer = {
        url: 'https://conseil-dev.cryptonomic-infra.tech:443',
        apiKey: 'a3dc7fd7-4b65-49c8-ab65-4441415c63a3',
        network: 'babylonnet'
    }

    const contractAddress = 'KT1LrAq2YYw9z8M5ZMEvHe7fZGC673HaJyix';

    let conseilResult = await conseiljs.TezosConseilClient.getAccount(conseilServer, conseilServer.network, contractAddress);

    let device_alert = conseilResult.storage;
    console.log(device_alert);

    user.latitude = Number(device_alert.substring(0, 6));
    user.longitude = Number(device_alert.substring(6, 12));
    user.device = device_alert.substring(12, 16);

    console.log(user);

    infoWindow = new google.maps.InfoWindow;

    var pos = {
        lat: user.latitude,
        lng: user.longitude
    };

    var contentString = '<div id="content">' +
        '<center><strong><span class="tag is-danger is-light">' +
        user.device +
        '</span></strong></center>' +
        '</div>';

    infoWindow.setPosition(pos);
    infoWindow.setContent(contentString);
    infoWindow.open(map);
    map.setCenter(pos);

}

