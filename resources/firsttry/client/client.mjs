import * as alt from 'alt';
import * as native from 'natives';

let webview;
//alt.log('');

alt.onServer('spawn:Player', pos => {
    alt.setTimeout(() => {
        alt.emitServer('spawn:Ready', pos);
        alt.on('keydown', keydown);
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function keydown(key) {
    if (key == 70) {
        let pedId = native.playerPedId();
        let drawable = 0;

        let random_variation = getRandomInt(
            native.getNumberOfPedPropDrawableVariations(pedId, drawable)
        );
        let random_texture = getRandomInt(native.getNumberOfPedTextureVariations(pedId, drawable));

        let random_hair_color = getRandomInt(native.getNumHairColors());
        //alt.log('Ped' + native.playerPedId() + ' - ' + random + ' - ' + alt.Player.local.scriptID);
        alt.log(
            pedId +
                ' - ' +
                native.getNumberOfPedPropDrawableVariations(pedId, drawable) +
                ' - ' +
                native.getNumberOfPedTextureVariations(pedId, drawable) +
                ' - ' +
                native.getNumHairColors() +
                ' - ' +
                random_hair_color
        );
        native.setPedComponentVariation(pedId, drawable, getRandomInt(32), random_texture, 1);
        native.setPedComponentVariation(pedId, 2, 15);
        native.setPedHairColor(pedId, 6, 5);
        native.setPedEyeColor(pedId, 16);
        /*
        native.setPedComponentVariation(pedId, 2, 12, 1, 1);
        alt.setTimeout(() => {
            native.setPedComponentVariation(pedId, 2, 15, 5, 1);
        }, 2 * 1000);
        */
        // native.setPedComponentVariation(pedId, 1, 102, 1, 1);
        // https://wiki.gtanet.work/index.php?title=Masks

        /*
               ;
        native.setPedHairColor(pedId, 32, 32);

        */
    }
}

alt.onServer('vehicle:SetInto', newVehicle => {
    alt.setTimeout(() => {
        native.setPedIntoVehicle(alt.Player.local.scriptID, newVehicle.scriptID, -1);
    }, 500);
});

alt.onServer('change:Ped', player => {
    alt.log(' META ' + player.getSyncedMeta('money'));

    native.setPedComponentVariation(native.playerPedId(), 0, 5, 1, 1);
    //native.setPedComponentVariation(native.playerPedId(), 2, 1, 1, 1);
    //native.setPedComponentVariation(native.playerPedId(), 3, 1, 1, 1);
    native.setPedEyeColor(native.playerPedId(), 5);
});
