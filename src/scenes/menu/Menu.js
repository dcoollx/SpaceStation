var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Phaser from 'phaser';
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(config) {
        return _super.call(this, { key: 'main_menu' }) || this;
        //good spot to load save files
    }
    Menu.prototype.preload = function () {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('background', 'assets/skies/space3.png');
    };
    Menu.prototype.create = function () {
        var image = this.add.image(400, 300, 'background');
        this.add.text(0, 0, 'Phasers Deploy ');
    };
    return Menu;
}(Phaser.Scene));
export default Menu;
