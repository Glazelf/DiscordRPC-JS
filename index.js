const DiscordRPC = require('discord-rpc');
const config = require('./config.json');

let clientID = config.clientID;
let startTimestamp = new Date();

try {
    DiscordRPC.register(clientID);
} catch (e) {
    return console.log("You must provide a valid client ID.");
};

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.login({ clientID }).catch(console.error);

rpc.on('ready'), () => {
    console.log(`Logged in as ${client.application.name}.`);
    console.log(`Authed for user ${client.user.username}.`);
    console.log(config.timestamp);

    setActivity();

    setInterval(() => {
        setActivity();
    }, 15e3);
};

async function setActivity() {
    let activiyObject = {};
    if (config.timestamp) {
        activityObject = { startTimestamp };
    };

    if (config.details) activityObject['details'] = config.details;
    if (config.state) activityObject['state'] = config.state;

    if (config.largeImageKey) {
        try {
            activityObject['largeImageKey'] = config.largeImageKey;
        } catch (e) {
            console.log("Large image key invalid.");
        };
    };
    if (config.largeImageText) activityObject['largeImageText'] = config.largeImageText;

    if (config.smallImageKey) {
        try {
            activityObject['smallImageKey'] = config.smallImageKey;
        } catch (e) {
            console.log("Small image key invalid.");
        };
    };
    if (config.smallImageText) activityObject['smallImageText'] = config.smallImageText;

    if (config.button1Label && config.button1URL) {
        activityObject['button1'] = {
            label: config.button1Label,
            URL: config.button1URL
        };
    };

    if (config.button2Label && config.button2URL) {
        activityObject['button2'] = {
            label: config.button2Label,
            URL: config.button2URL
        };
    };

    rpc.setActivity(activityObject);
};
