jQuery.noConflict();

if (jQuery('#posadi_home_wrap_1').length) {

    (function() {
        var Kaleidoscope, footer, c, dragger, gui, i, image, kaleidoscope, len, onChange, onMouseMoved, options, ref, tr, tx, ty, update, bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
    };

    Kaleidoscope = function () {
        Kaleidoscope.prototype.HALF_PI = Math.PI / 2;
        Kaleidoscope.prototype.TWO_PI = Math.PI * 2;
        function Kaleidoscope(options1) {
            var key, ref, ref1, val;
            this.options = options1 != null ? options1 : {};
            this.defaults = {
                offsetRotation: 0,
                offsetScale: 1,
                offsetX: 0,
                offsetY: 0,
                radius: 260,
                slices: 12,
                zoom: 1
            };

            ref = this.defaults;

            for (key in ref) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }

                val = ref[key];
                this[key] = val;
            }

            window.CP.exitedLoop(1);
            ref1 = this.options;

            for (key in ref1) {
                if (window.CP.shouldStopExecution(2)) {
                    break;
                }
                val = ref1[key];
                this[key] = val;
            }

            window.CP.exitedLoop(2);

            if (this.domElement == null) {
                this.domElement = document.createElement('canvas');
            }

            if (this.context == null) {
                this.context = this.domElement.getContext('2d');
            }

            if (this.image == null) {
                this.image = document.createElement('img');
            }
        }


        Kaleidoscope.prototype.draw = function () {
            var cx, i, index, ref, results, scale, step;
            this.domElement.width = this.domElement.height = this.radius * 2;
            this.context.fillStyle = "white";
            try {
                this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
            } catch (e) {
                if (e.name == "NS_ERROR_NOT_AVAILABLE") {
                } else {
                    throw e;
                }
            }

            scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
            step = this.TWO_PI / this.slices;
            cx = this.image.width / 2;
            results = [];
            for (index = i = 0, ref = this.slices; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
                if (window.CP.shouldStopExecution(3)) {
                    break;
                }

                this.context.save();
                this.context.translate(this.radius, this.radius);
                this.context.rotate(index * step);
                this.context.beginPath();
                this.context.moveTo(-0.5, -0.5);
                this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
                this.context.lineTo(0.5, 0.5);
                this.context.closePath();
                this.context.rotate(this.HALF_PI);
                this.context.scale(scale, scale);
                this.context.scale([-1, 1][index % 2], 1);
                this.context.translate(this.offsetX - cx, this.offsetY);
                this.context.rotate(this.offsetRotation);
                this.context.scale(this.offsetScale, this.offsetScale);
                this.context.fill();
                results.push(this.context.restore());
            }

            window.CP.exitedLoop(3);
            return results;
        };
        return Kaleidoscope;
    }();



    image = new Image();
    image.onload = function ( _this) {
        return function () {
            return kaleidoscope.draw();
        };
    }(this);

    image.src = 'images/ks.jpg';
    kaleidoscope = new Kaleidoscope({
        image: image,
        slices: 20
    });

    kaleidoscope.domElement.style.position = 'absolute';
    kaleidoscope.domElement.style.margin = 'auto';
    kaleidoscope.domElement.style.right = '0';
    kaleidoscope.domElement.style.left = '0';
    kaleidoscope.domElement.style.top = '0';
    kaleidoscope.domElement.style.bottom = '0';
    kaleidoscope.domElement.style.zIndex = '200';
    kaleidoscope.domElement.style.width = '50%';
    kaleidoscope.domElement.style.height = '';

    document.getElementById('posadi_home_wrap_1').appendChild(kaleidoscope.domElement);
        if(document.body.clientWidth > 1500 && document.body.clientHeight < 800){
            kaleidoscope.domElement.style.width = '40%';
        }

    if(document.body.clientWidth <= 1366 && document.body.clientHeight <=650){
        kaleidoscope.domElement.style.width = '50%';
        kaleidoscope.domElement.style.right = '0';
    }



    tx = kaleidoscope.offsetX;
    ty = kaleidoscope.offsetY;
    tr = kaleidoscope.offsetRotation;

    onMouseMoved = function (_this) {
        return function (event) {
            var cx, cy, dx, dy, hx, hy;
            cx = window.innerWidth / 2;
            cy = window.innerHeight / 2;
            dx = event.pageX / window.innerWidth;
            dy = event.pageY / window.innerHeight;
            hx = dx - 0.5;
            hy = dy - 0.5;
            tx = hx * kaleidoscope.radius * -2;
            ty = hy * kaleidoscope.radius * 2;
            return tr = Math.atan2(hy, hx);
        };
    }(this);

    document.getElementById('posadi_home_wrap_1').addEventListener('mousemove', onMouseMoved, false);
        options = {
            interactive: true,
            ease: 0.1
        };

        (update = function (_this) {
            return function () {
                var delta, theta;

                if (options.interactive) {
                    delta = tr - kaleidoscope.offsetRotation;
                    theta = Math.atan2(Math.sin(delta), Math.cos(delta));
                    kaleidoscope.offsetX += (tx - kaleidoscope.offsetX) * options.ease;
                    kaleidoscope.offsetY += (ty - kaleidoscope.offsetY) * options.ease;
                    kaleidoscope.offsetRotation += (theta - kaleidoscope.offsetRotation) * options.ease;
                    kaleidoscope.draw();
                }
                return setTimeout(update, 1000 / 60);
            };
        }(this))();

        gui = new dat.GUI();
        gui.add(kaleidoscope, 'zoom').min(0.25).max(2);
        gui.add(kaleidoscope, 'slices').min(6).max(32).step(2);
        gui.add(kaleidoscope, 'radius').min(200).max(500);
        gui.add(kaleidoscope, 'offsetX').min(-kaleidoscope.radius).max(kaleidoscope.radius).listen();
        gui.add(kaleidoscope, 'offsetY').min(-kaleidoscope.radius).max(kaleidoscope.radius).listen();
        gui.add(kaleidoscope, 'offsetRotation').min(-Math.PI).max(Math.PI).listen();
        gui.add(kaleidoscope, 'offsetScale').min(0.5).max(4);
        gui.add(options, 'interactive').listen();
        gui.close();

        onChange = function (_this) {
            return function () {
                kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';
                kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';
                options.interactive = false;
                return kaleidoscope.draw();
            };
        }(this);

        ref = gui.__controllers;
            for (i = 0, len = ref.length; i < len; i++) {
                if (window.CP.shouldStopExecution(4)) {
                    break;
                }

                c = ref[i];
                if (c.property !== 'interactive') {
                    c.onChange(onChange);
                }
            }

            window.CP.exitedLoop(4);
        }.call(this));
}
