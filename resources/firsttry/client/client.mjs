import * as alt from 'alt';
import * as native from 'natives';

let webview;
//alt.log('suce mes couilles');

alt.onServer('spawn:Player', pos => {
    alt.setTimeout(() => {
        alt.emitServer('spawn:Ready', pos);
    }, 1000);
});

alt.onServer('webview:Load', () => {
    if (!webview) {
        alt.log('yes');
        webview = new alt.WebView('http://resource/client/html/index.html');
        webview.on('close:Webview', closeWebview);
        webview.on('spawn:Vehicle', spawnVehicle);
        webview.on('ready', ready);
        webview.focus();
    }

    alt.showCursor(true);
});

function ready() {
    webview.emit('display:Name', alt.Player.local.name);
    webview.emit('display:Pos', alt.Player.local.pos);
}

function spawnVehicle(model) {
    alt.emitServer('spawn:Vehicle', model);
}

function closeWebview() {
    alt.showCursor(false);
    webview.destroy();
    webview = undefined;
}

alt.onServer('vehicle:SetInto', newVehicle => {
    alt.setTimeout(() => {
        native.setPedIntoVehicle(alt.Player.local.scriptID, newVehicle.scriptID, -1);
    }, 500);
});
