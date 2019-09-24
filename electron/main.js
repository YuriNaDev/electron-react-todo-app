process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const { app, BrowserWindow } = require('electron')

const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')

let win = null

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 700,
		show: false,
		resizable: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
		},
	})
	win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`)
	if (isDev) {
		win.webContents.once('dom-ready', () => {
			win.webContents.openDevTools()
		})
	}
	win.once('ready-to-show', () => {
		win.show()
	})
	win.on('closed', () => (win = null))
}

app.on('ready', () => {
	const dbPath = path.join(app.getPath('userData'), 'lowdb.json')
	if (!fs.existsSync(dbPath)) {
		fs.writeFileSync(dbPath, '')
	}
	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})
