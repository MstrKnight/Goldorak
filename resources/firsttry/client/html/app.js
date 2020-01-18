const { createElement, render, Component } = preact;
const h = createElement;
const p = createElement;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            pos: { x: 'ici', y: 'lol', z: 'plop' },
            vehicles: [
                'raiden',
                'brioso',
                'washington',
                'akuma',
                'sanctus',
                'infernus',
                'shotaro',
                'cheetah'
            ]
        };

        this.keydownBind = this.keydown.bind(this);
    }

    componentDidMount() {
        if ('alt' in window) {
            alt.on('display:Name', this.displayName.bind(this));
            alt.emit('ready');
        } else {
            this.setState({ name: 'Johnne Dosse' });
            this.setState({ pos: { x: 'ici', y: 'lol', z: 'plop' } });
        }

        window.addEventListener('keydown', this.keydownBind);
    }

    componentWillUmount() {
        window.removeEventListener('keydown', this.keydownBind);
    }

    displayName(name) {
        this.setState({ name });
    }

    displayPos(pos) {
        this.setState({ pos });
    }

    keydown(e) {
        if (e.key === 'Delete') {
            if ('alt' in window) {
                alt.emit('close:Webview');
            } else {
                console.log('Closing Window');
            }
        }
    }

    spawnVehicle(e) {
        console.log(e);
        const vehModel = e.target.id;
        if ('alt' in window) {
            alt.emit('spawn:Vehicle', vehModel);
        }
    }

    renderVehicles() {
        const vehicles = this.state.vehicles.map(vehicle => {
            return h('button', { id: vehicle, onclick: this.spawnVehicle.bind(this) }, vehicle);
        });

        return h('div', {}, vehicles);
    }

    render() {
        //return h('span', {}, this.state.name + ' ' + this.state.pos['x']);
        return h('div', {}, h(this.renderVehicles.bind(this)));
    }
}

render(h(App), document.querySelector('#render'));

/*
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
    displayPos({ x: 'ici', y: 'lol', z: 'plop' });
}
*/
