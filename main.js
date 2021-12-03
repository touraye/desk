const { create } = require('domain')
const { app, BrowserWindow, Menu, ipcRenderer, ipcMain } = require('electron')

// const form = document.getElementById('#form')
// const todoVal = document.getElementById('inputValue').value
// const checkVal = document.getElementById('checkValue').value

// include the Node.js 'path' module at the top of your file
const path = require('path')

let win
let addWindow

const createWindow = () => {
	win = new BrowserWindow({
		width: 900,
		height: 700,
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
		width: 570,
		height: 490,
		title: 'Add New Todo',
	})

	addWindow.loadURL(`file://${__dirname}/todo.html`)
}

let createAboutWindow = () => {
	addWindow = new BrowserWindow({
		width: 500,
		height: 300,
		title: 'About',
	})

	addWindow.loadURL(`file://${__dirname}/about.html`)
}

//Listen for form submission
// form.addEventListener('submit', (event) => {
// 	event.preventDefault()

// 	ipcRenderer.send('todo:add', todoVal)
// })

// //listen to
// ipcMain.on('todo:add', (event, todo) => {
// 	win.webContents.send('todo:add', todo)
// })

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Todo',
				accelerator: process.platform === 'darwin' ? 'Command+N' : 'Control+N',
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
	{
		label: 'Edit',
	},
	{
		label: 'View',
	},
	{
		label: 'About',
		click() {
			createAboutWindow()
		},
	},
]

//add {} on mac
if (process.platform === 'darwin') {
	menuTemplate.unshift({})
}

//check for not in product to show dev tool
if (process.env.NODE_ENV !== 'production') {
	menuTemplate.push({
		label: 'Dev Tool',
		submenu: [
			{
				label: 'Toggle Dev Tool',
				accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools()
				},
			},
		],
	})
}
