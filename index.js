const electron = require('electron');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

let createWindow = _ => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'window/scene.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', _ => {
        mainWindow = null;
    });
};
app.on('ready', createWindow);

app.on('window-all-closed', _ => {
    app.quit();
});

app.on('activate', _ => {
    if (mainWindow === null) {
        createWindow();
    }
});