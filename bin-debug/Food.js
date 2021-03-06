var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Food = (function (_super) {
    __extends(Food, _super);
    /**
    * @param x 横坐标
    * @param y 纵坐标
    * @param r 半径
    */
    function Food(x, y, r) {
        var _this = _super.call(this) || this;
        _this.init(x, y, r);
        return _this;
    }
    /**
     * 初始化
     *
     * 1.绘制果实
     */
    Food.prototype.init = function (x, y, r) {
        //获取随机颜色
        this.color = this.randomColor();
        this.food = new egret.Shape();
        this.food.graphics.beginFill(this.color);
        this.food.graphics.drawCircle(0, 0, r);
        this.food.graphics.endFill();
        this.food.x = r;
        this.food.y = r;
        //位置
        this.x = x;
        this.y = y;
        this.addChild(this.food);
        //增加滤镜
        // var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        // var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        // var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        // var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        // var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        // var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        // var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        // var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        // var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
        //     strength, quality, inner, knockout );
        // this.filters = [glowFilter]
    };
    /**
     * 获取随机的颜色
     */
    Food.prototype.randomColor = function () {
        // return Food.colorList[Math.round(Math.random() * Food.colorList.length)];
        return parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
    };
    /**
     * 被吃
     */
    Food.prototype.onEat = function () {
        this.parent.removeChild(this);
    };
    /**
     * 食物颜色
     */
    Food.colorList = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400,];
    return Food;
}(egret.Sprite));
__reflect(Food.prototype, "Food");
//# sourceMappingURL=Food.js.map