
var geodata = null;
var renderTimes = 0;
var currentNode = null;
var cartesian_func = function (data, chartlayout) {
    let dataModel = new android.test.cartesian.DataModel(data);
    if (chartlayout == null) {
        var context = new android.app.Context();
        var comparedAnimationCache = new android.ComparedAnimationCache();
        context.setComparedAniamtionCache(comparedAnimationCache);
        chartlayout = new android.test.cartesian.ChartLayout(context);
        chartlayout.attachElement(document.getElementById("chart"), "Canvas", dataModel);
    } else {
        chartlayout.perpareComparedAnimation();
        chartlayout.attachElement(document.getElementById("chart"), "Canvas", dataModel);
        chartlayout.startCompare();
    }
    return chartlayout;
}

var hierarchical_func = function (data) {
    var context = new android.app.Context();
    var comparedAnimationCache = new android.ComparedAnimationCache();
    context.setArgs('comparedanimation', comparedAnimationCache);
    let dataModel = new android.test.hierarchical.DataModel(data);
    var chartlayout = new android.test.hierarchical.ChartLayout(context);
    chartlayout.attachElement(document.getElementById("chart"), "Canvas", dataModel);

    return chartlayout;
}

var geo_func = function (data) {
    var context = new android.app.Context();
    var comparedAnimationCache = new android.ComparedAnimationCache();
    context.setArgs('comparedanimation', comparedAnimationCache);
    let dataModel = new android.test.map.DataModel(data);
    var chartlayout = new android.test.map.ChartLayout(context);
    chartlayout.attachElement(document.getElementById("chart"), "Canvas", dataModel);
    chartlayout.beginLoadingAnimation();
    console.log(dataModel);
    return chartlayout;
}


// data.air_path.routes = data.air_path.routes.slice(000, 30000);
// let routes = [];
// for (let i = 0; i < data.air_path.routes.length; i += 10) {
//     routes.push(data.air_path.routes[i]);
// }
// data.air_path.routes = routes;
// data.values = (new android.test.map.FlightParser(data.air_path)).data;

var geopath_func = function (data, chartlayout) {
    var context = new android.app.Context();
    var comparedAnimationCache = new android.ComparedAnimationCache();
    context.setArgs('comparedanimation', comparedAnimationCache);
    // data.values=(new android.test.map.FlightParser(air_path)).data;

    data.air_path.routes = data.air_path.routes.slice(000, 30000);
    let routes = [];
    for (let i = 0; i < data.air_path.routes.length; i += 10) {
        routes.push(data.air_path.routes[i]);
    }
    data.air_path.routes = routes;
    data.values = (new android.test.map.FlightParser(data.air_path)).data;

    let dataModel = new android.test.map.relation.DataModel(data);
    chartlayout = new android.test.map.ChartLayout(context);
    chartlayout.attachElement(document.getElementById("chart"), "Canvas", dataModel);
    chartlayout.beginLoadingAnimation();
    console.log(dataModel);
    return chartlayout;
}

document.addEventListener('DOMContentLoaded', function () {
    var calculate_button = document.querySelector('#calculate_button');
    var radial_btn = document.querySelector('#radial');
    var stack_btn = document.querySelector('#stack');
    var chartcontainer = document.querySelector('#chart');
    var editor_left = ace.edit("chartmodel_layout");
    editor_left.setTheme("ace/theme/tomorrow");
    editor_left.session.setMode("ace/mode/javascript");
    editor_left.renderer.setOption('showLineNumbers', true);
    var samples = [];
    var sample_item_container = document.querySelector('#sample_item_container');
    // samples.push(new Node('USAMap1', "geo", geo_data_usa1,geo_func));
    // samples.push(new Node('WorldMap', "geo", geo_data_world,geo_func));
    samples.push(new Node('simplebar', "cartesian", 'simplebar', cartesian_func));
    samples.push(new Node('multi-series-type', "cartesian", 'multi-series-type', cartesian_func));
    samples.push(new Node('TreeMap', "hierarchical", 'treemap', hierarchical_func));
    samples.push(new Node('Aggregation', "cartesian", 'aggregation', cartesian_func));
    samples.push(new Node('莆田系地址', "geo", 'putianxi', geo_func));
    samples.push(new Node('World', "geo", 'world', geo_func));
    samples.push(new Node('flight', "geopath", 'flight', geopath_func));
    samples.push(new Node('AreaStack', "cartesian", 'areastack', cartesian_func));
    samples.push(new Node('big_amount', "cartesian", 'big_amount', cartesian_func));
    samples.push(new Node('stack', "cartesian", 'stack', cartesian_func));
    samples.push(new Node('radial', "cartesian", 'radial', cartesian_func));
    samples.push(new Node('negativevalues', "cartesian", 'negativevalues', cartesian_func));
    samples.push(new Node('sin&cos', "cartesian", 'sin&cos', cartesian_func));
    samples.push(new Node('tan', "cartesian", 'tan', cartesian_func));
    samples.push(new Node('House Price in China', "cartesian", 'china_house', cartesian_func));
    samples.push(new Node('Pop in China', "cartesian", 'china_pop', cartesian_func));
    samples.push(new Node('linear', "cartesian", 'linear', cartesian_func));
    samples.push(new Node('Date', "cartesian", 'date', cartesian_func));
    // samples.push(new Node('TreeMap', "hierarchical", h_data,hierarchical_func));
    samples.push(new Node('SunBurst', "hierarchical", 'sunburst', hierarchical_func));
    samples.push(new Node('ChinaMap', "geo", 'geo_data_china', geo_func));
    samples.push(new Node('ChinaMap_pop', "geo", 'chinamap_pop', geo_func));
    samples.push(new Node('USAMap', "geo", 'geo_data_usa', geo_func));

    samples.forEach(node => {
        var item = document.createElement('div');
        item.className = "item";

        item.innerText = node.name;
        item.onclick = function (event) {
            if (node.value) {
                chartcontainer.innerHTML = '';
                let dataurl = 'models/' + node.value + '.json';
                console.log(dataurl);
                let res = $.ajax({ url: dataurl, async: false });
                node.chart = node.fun(JSON.parse(res.responseText), node.chart);
                node.chart.beginLoadingAnimation();
                editor_left.setValue(JSON.stringify(JSON.parse(res.responseText), null, 4));
                currentNode = node;
            }
        };
        sample_item_container.appendChild(item);

    });
    calculate_button.onclick = function (event) {
        var obj = editor_left.getValue();
        chartcontainer.innerHTML = '';
        if (currentNode.desc == 'cartesian') {
            currentNode.chart = cartesian_func(JSON.parse(obj), currentNode.chart);
        } else if (currentNode.desc == 'hierarchical') {
            hierarchical_func(JSON.parse(obj)).beginChartAnimation();
        } else if (currentNode.desc == "geo") {
            let datamodel = JSON.parse(obj);
            datamodel.geo = geodata;
            currentNode.chart = geo_func(datamodel, currentNode.chart);
        } else if (currentNode.desc == 'geopath') {
            let datamodel = JSON.parse(obj);
            datamodel.geo = geodata;
            currentNode.chart = geopath_func(datamodel, currentNode.chart);
        }

    };
    radial_btn.onclick = function (event) {
        var obj = JSON.parse(editor_left.getValue());
        chartcontainer.innerHTML = '';
        if (currentNode.desc == 'cartesian') {
            if(obj.encoding.radial != null){
                obj.encoding.radial = !obj.encoding.radial
            }
            currentNode.chart = cartesian_func(obj, currentNode.chart);
            editor_left.setValue(JSON.stringify((obj), null, 4));

        } 
    };

    stack_btn.onclick = function (event) {
        var obj = JSON.parse(editor_left.getValue());
        chartcontainer.innerHTML = '';
        if (currentNode.desc == 'cartesian') {
            if(obj.encoding.stack != null){
                obj.encoding.stack = !obj.encoding.stack
            }
            currentNode.chart = cartesian_func((obj), currentNode.chart);
            editor_left.setValue(JSON.stringify((obj), null, 4));

        } 
    };

    currentNode = samples[0];
    let dataurl = 'models/' + currentNode.value + '.json';
    console.log(dataurl);
    let res = $.ajax({ url: dataurl, async: false });
    let value = JSON.parse(res.responseText);
    if (currentNode.desc == 'geo' || currentNode.desc == 'geopath') {
        geodata = value.geo;
    }


    currentNode.chart = currentNode.fun(value, currentNode.chart);
    currentNode.chart.beginLoadingAnimation();
    editor_left.setValue(JSON.stringify(value, null, 4));

});


var Node = function (name, desc, value, fun) {
    this.name = name;
    this.value = value;
    this.desc = desc;
    this.fun = fun;
    this.chart = null;

}