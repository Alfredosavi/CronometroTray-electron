const { Tray, app, Menu } = require("electron");
const menuTemplate = [
  {
    label: "Sair",
    click: () => {
      app.quit();
    },
  },
];

class ChronoTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.on("click", this.onClick.bind(this));

    this.setToolTip("Cronômetro");
    this.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { width, height } = this.mainWindow.getBounds();

    if (!this.mainWindow.isVisible()) {
      this.mainWindow.setBounds({
        x: x >= 400 ? x - Math.floor(width / 2) : x,
        y: y >= 300 ? y - height : y,
        width,
        height,
      });
      this.mainWindow.show();
    } else {
      this.mainWindow.hide();
    }
  }
}

module.exports = ChronoTray;
