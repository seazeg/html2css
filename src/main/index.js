import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  dialog,
  ipcMain
} from 'electron'
import {
  appMenuTemplate
} from './menu';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1280
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menu = Menu.buildFromTemplate(appMenuTemplate);
  menu.items[0].submenu.append(new MenuItem({
    label: "新建工程",
    click() {
      mainWindow.webContents.send('action', 'new');
    },
    accelerator: 'CmdOrCtrl+N' //快捷键：Ctrl+N
  }));
  menu.items[0].submenu.append(new MenuItem({
    label: "打开工程",
    click() {
      mainWindow.webContents.send('action', 'open');
    },
    accelerator: 'CmdOrCtrl+O' //快捷键：Ctrl+O
  }));
  menu.items[0].submenu.append(new MenuItem({
    label: "保存工程",
    click() {
      mainWindow.webContents.send('action', 'save');
    },
    accelerator: 'CmdOrCtrl+S' //快捷键：Ctrl+S
  }));
  menu.items[0].submenu.append(new MenuItem({
    label: "导入",
    submenu: [{
      label: "HTML",
      click() {
        mainWindow.webContents.send('action', 'importHTML');
      },
    }, {
      label: "CSS",
      click() {
        mainWindow.webContents.send('action', 'importCSS');
      },
    }]
  }));
  menu.items[0].submenu.append(new MenuItem({
    label: "导出",
    submenu: [{
      label: "HTML",
      click() {
        mainWindow.webContents.send('action', 'exportHTML');
      },
    }, {
      label: "CSS",
      click() {
        mainWindow.webContents.send('action', 'exportCSS');
      },
    }]
  }));

  Menu.setApplicationMenu(menu);

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})




/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */