const { app, BrowserWindow, Menu } = require('electron')

// include the Node.js 'path' module at the top of your file
const path = require('path')

let win
let addWindow

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
	})

	win.loadURL(`file://${__dirname}/main.html`)
	win.on('closed', () => app.quit())
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})

	const mainMenu = Menu.buildFromTemplate(menuTemplate)
	Menu.setApplicationMenu(mainMenu)
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

let createAddWindow = () => {
	addWindow = new BrowserWindow({
		width: 500,
		height: 300,
		title: 'Add New Todo',
	})

	addWindow.loadURL(`file://${__dirname}/todo.html`)
}

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Todo',
				click() {
					createAddWindow()
				},
			},
			{
				label: 'Quit',
				accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Control+Q',
				click() {
					app.quit()
				},
			},
		],
	},
]

//add {} on mac
if (process.platform === 'darwin') {
	menuTemplate.unshift({})
}
