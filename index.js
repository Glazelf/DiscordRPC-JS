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

try {
    rpc.login({ clientId: clientID }).catch(console.error);
} catch (e) {
    return console.log(e);
};

// Ready event
rpc.on('ready', () => {
    console.log(`Setting rich presence for ${rpc.user.username}...`);

    setActivity();

    // Loop every 15 seconds
    setInterval(() => {
        setActivity();
    }, 15e3);
});

async function setActivity() {
    let activityObject = {};
    let buttons = [];
    if (config.timestamp) activityObject = { startTimestamp };

    if (config.details) activityObject['details'] = config.details;
    if (config.state) activityObject['state'] = config.state;

    // Images
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

    // Buttons
    if (config.button1Label && config.button1URL) {
        buttons.push({
            label: config.button1Label,
            url: config.button1URL
        });
    };
    if (config.button2Label && config.button2URL) {
        buttons.push({
            label: config.button2Label,
            url: config.button2URL
        });
    };
    if (buttons.length > 0) activityObject['buttons'] = buttons;

    rpc.setActivity(activityObject);
};
