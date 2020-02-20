import * as alt from 'alt';
import chat from 'chat';
import mysql from 'mysql';

const cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'goldorak'
});

cnx.connect(function(error) {
    if (error) {
        console.error('error connecting :' + error.stack);
        return;
    }
    console.log('Connected as id :' + cnx.threadId);
});

const standardModel = 'mp_m_freemode_01';

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

alt.onClient('spawn:Vehicle', spawnVehicle);

//command
chat.registerCmd('sethp', (player, arg) => {
    if (arg && arg.length <= 0) {
        return;
    }

    let amount = parseInt(arg[0]);
    if (isNaN(amount)) {
        return;
    }
    if (amount <= 100) {
        amount += 100;
    }

    player.health = amount;
});

chat.registerCmd('getmeta', player => {
    player.setSyncedMeta('money', 1250);
    // player.setEyeColor(getRandomInt(15));
    alt.emitClient(player, 'change:Ped', player);
});

chat.registerCmd('loadpage', player => {
    alt.emitClient(player, 'webview:Load');
});

chat.registerCmd('veh', (player, arg) => {
    spawnVehicle(player, arg[0]);
});

//fonction

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function spawnVehicle(player, model) {
    try {
        const newVehicle = new alt.Vehicle(
            model,
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
}
