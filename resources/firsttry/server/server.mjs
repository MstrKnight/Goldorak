import * as alt from 'alt';
import chat from 'chat';

const standardModel = 'ig_tylerdix';

const spawnPos = {
    x: 205.316,
    y: 1167.378,
    z: 227.005
};

alt.on('playerConnect', player => {
    chat.send(player, 'Connexion du joueur français ' + spawnPos.x);
    alt.emitClient(player, 'spawn:Player', spawnPos);
});

alt.onClient('spawn:Ready', (player, pos) => {
    player.model = standardModel;
    player.spawn(pos.x, pos.y, pos.z, 0);
});

chat.registerCmd('sethp', (player, arg) => {
    if (arg && arg.length <= 0) {
        return;
    }

    let amount = parseInt(arg[0]);

    if (amount < 100) {
        amount += 100;
    }

    if (isNaN(amount)) {
        return;
    }
    player.health = amount;
});

chat.registerCmd('loadpage', player => {
    alt.emitClient(player, 'webview:Load');
});

chat.registerCmd('veh', (player, arg) => {
    try {
        const newVehicle = new alt.Vehicle(
            arg[0],
            player.pos.x + 2,
            player.pos.y + 2,
            player.pos.z,
            0,
            0,
            0
        );
        newVehicle.numberPlateText = 'BABOOCHE';
        newVehicle.numberPlateIndex = 1;
        alt.emitClient(player, 'vehicle:SetInto', newVehicle);
    } catch (err) {
        chat.send(player, "Le véhicule n'existe pas");
    }
});
