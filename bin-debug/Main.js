var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.radius = 10;
        _this.color = 0x4c8dae;
        _this.during = 40;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createGameScene, _this);
        return _this;
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //计分板
        var jf = new egret.Shape();
        jf.graphics.beginFill(0x0000ff);
        jf.graphics.drawRect(0, 0, this.stageW, this.stageH * 0.2);
        jf.graphics.endFill();
        this.addChild(jf);
        //白色背景
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH * 0.8);
        bg.graphics.endFill();
        bg.y = this.stage.stageHeight * 0.2;
        this.addChild(bg);
        this.randomFood();
        this.snake = new Snake(this.stageW * 0.5, this.stageH * 0.5, this.radius, 0x000000);
        this.addChild(this.snake);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
    };
    Main.prototype.onEat = function () {
        this.removeChild(this.food);
        this.snake.afterEat(this.food.color);
        this.randomFood();
    };
    Main.prototype.randomFood = function () {
        //显示果实
        var tmpx = Math.random() * (this.stageW - this.radius * 2);
        var tmpy = Math.random() * (this.stageH - this.radius * 2);
        while (tmpy < this.stageH * 0.2) {
            var tmpy = Math.random() * (this.stageH - this.radius * 2);
        }
        this.food = new Food(tmpx, tmpy, this.radius);
        this.addChild(this.food);
        //模拟被吃
        // this.food.touchEnabled = true;
        // this.food.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEat, this);
    };
    Main.prototype.move = function (e) {
        this.snake.move(e, this.during);
    };
    Main.prototype.onMove = function (e) {
        this.moveEvent = e;
        if (this.timer == null) {
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        }
    };
    Main.prototype.moveEnd = function (e) {
        if (this.timer != null) {
            this.timer.stop();
            this.timer = null;
        }
    };
    Main.prototype.onTimer = function (e) {
        this.head = this.snake.getHead();
        if (this.hit(this.head, this.food))
            this.onEat();
        this.snake.move(this.moveEvent, this.during);
    };
    Main.prototype.hit = function (a, b) {
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height))
            .intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map