window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if ('alt' in window) {
            alt.emit('close:Webview');
        } else {
            console.log('Closing Window');
        }
    }
});

function displayName(name) {
    document.getElementById('myname').innerHTML = name;
}

function displayPos(pos) {
    document.getElementById('mypos').innerHTML = pos['x'] + ' ' + pos['y'] + ' ' + pos['z'];
}

if ('alt' in window) {
    alt.on('display:Name', displayName);
    alt.on('display:Pos', displayPos);
    alt.emit('ready');
} else {
    displayName('JohnDoe');
    displayPos('ici');
}
