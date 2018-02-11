document.addEventListener('DOMContentLoaded', function () {
    window.root = new test.FireLayout(new android.app.Context());
    root.attachElement(document.getElementById('container'),"Canvas");
    root.init();
    root.animationTest();
});