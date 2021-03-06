class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createGameScene, this);
    }

    private food: Food;
    private snake: Snake;
    private stageW: number;
    private stageH: number;
    private radius = 10;
    private score = new egret.TextField();
    

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        //计分板
        var jf = new egret.Shape();
        jf.graphics.beginFill(0x0000ff);
        jf.graphics.drawRect(0, 0, this.stageW, this.stageH  * 0.2);
        jf.graphics.endFill();
        this.addChild(jf);
        this.score.text = "分数：1";
        this.score.x = 50;
        this.score.y = 50;
        // this.score.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.score);

        //白色背景
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH  * 0.8);
        bg.graphics.endFill();
        bg.y = this.stage.stageHeight  * 0.2;
        this.addChild(bg);

        this.randomFood();

        this.snake = new Snake(this.stageW * 0.5, this.stageH * 0.5, this.radius, 0x000000);
        this.addChild(this.snake);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
    }
    private color = 0x4c8dae;

    private onEat() {
        this.removeChild(this.food);
        this.snake.afterEat(this.food.color);
        this.randomFood();
        this.removeChild(this.score)
        this.score.text = "分数：" + this.snake.getlg();
        this.addChild(this.score);
    }

    private randomFood() {
        //显示果实
        var tmpx = Math.random() * (this.stageW - this.radius * 2);
        var tmpy = Math.random() * (this.stageH - this.radius * 2);
        while(tmpy < this.stageH * 0.2){
             var tmpy = Math.random() * (this.stageH - this.radius * 2);
        }
        this.food = new Food(tmpx, tmpy, this.radius);
        this.addChild(this.food);
        //模拟被吃
        // this.food.touchEnabled = true;
        // this.food.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEat, this);
    }


    private timer: egret.Timer;
    private during: number = 40;
    private moveEvent: egret.TouchEvent;
    private head: egret.Shape;
    private move(e: egret.TouchEvent) {
        this.snake.move(e, this.during);
    }
    private onMove(e: egret.TouchEvent) {
        this.moveEvent = e;
        if (this.timer == null) {
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        }
    }
    private moveEnd(e: egret.TouchEvent) {
        if (this.timer != null) {
            this.timer.stop();
            this.timer = null;
        }
    }
    private onTimer(e: egret.TimerEvent) {
        this.head = this.snake.getHead();
        if (this.hit(this.head, this.food))
            this.onEat();
        this.snake.move(this.moveEvent, this.during);
    }

    private hit(a, b) {
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height))
            .intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
    }
 }