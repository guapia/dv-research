
// air_path.routes= air_path.routes.slice(000,30000);
let routes = [];
for(let i = 0; i < air_path.routes.length; i+=30){
    routes.push(air_path.routes[i]);
}
air_path.routes = routes;
var geodata=null;
var renderTimes =0;
var currentNode=null;
var cartesian_func = function(data,chartlayout){
    let dataModel = new android.test.cartesian.DataModel(data);
    if(chartlayout == null){
        var context = new android.app.Context();
        var comparedAnimationCache = new android.ComparedAnimationCache();
        context.setComparedAniamtionCache(comparedAnimationCache);
        chartlayout = new android.test.cartesian.ChartLayout(context);
        chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
    }else{
        chartlayout.perpareComparedAnimation();
        chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
        chartlayout.startCompare();
    }
    return chartlayout;
}

var hierarchical_func = function(data){
    var context = new android.app.Context();
    var comparedAnimationCache = new android.ComparedAnimationCache();
    context.setArgs('comparedanimation',comparedAnimationCache);
    let dataModel = new android.test.hierarchical.DataModel(data);
    var chartlayout = new android.test.hierarchical.ChartLayout(context);
    chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);

    return chartlayout;
}

var geo_func= function(data){
    var context = new android.app.Context();
    var comparedAnimationCache = new android.ComparedAnimationCache();
    context.setArgs('comparedanimation',comparedAnimationCache);
    let dataModel = new android.test.map.DataModel(data);
    var chartlayout = new android.test.map.ChartLayout(context);
    chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
    chartlayout.beginLoadingAnimation();
    console.log(dataModel);
    return chartlayout;
}

var geopath_func= function(data, chartlayout){
    var context = new android.app.Context();
    var comparedAnimationCache = new android.ComparedAnimationCache();
    context.setArgs('comparedanimation',comparedAnimationCache);
    data.values=(new android.test.map.FlightParser(air_path)).data;
    let dataModel = new android.test.map.relation.DataModel(data);
    chartlayout = new android.test.map.ChartLayout(context);
    chartlayout.attachElement(document.getElementById("chart"),"Canvas", dataModel);
    chartlayout.beginLoadingAnimation();
    console.log(dataModel);
    return chartlayout;
}

document.addEventListener('DOMContentLoaded', function () {
    var calculate_button = document.querySelector('#calculate_button');
    var chartcontainer = document.querySelector('#chart');
    var editor_left = ace.edit("chartmodel_layout");
    editor_left.setTheme("ace/theme/tomorrow");
    editor_left.session.setMode("ace/mode/javascript");
    editor_left.renderer.setOption('showLineNumbers', true);
    var samples = [];
    var sample_item_container = document.querySelector('#sample_item_container');
    // samples.push(new Node('USAMap1', "geo", geo_data_usa1,geo_func));
    // samples.push(new Node('WorldMap', "geo", geo_data_world,geo_func));
    samples.push(new Node('simplebar', "cartesian", data0,cartesian_func));

    samples.push(new Node('multi-series-type', "cartesian", data,cartesian_func));
    samples.push(new Node('Aggregation', "cartesian", dataagg,cartesian_func));
    samples.push(new Node('莆田系地址', "geo", geo_data_china2,geo_func));
    samples.push(new Node('World', "geo", world_geo_data,geo_func));
    samples.push(new Node('flight', "geopath", flight,geopath_func));
    samples.push(new Node('AreaStack', "cartesian", data6,cartesian_func));
    samples.push(new Node('big_amount', "cartesian", data1,cartesian_func));
    samples.push(new Node('stack', "cartesian", data2,cartesian_func));
    samples.push(new Node('radial', "cartesian", data3,cartesian_func));
    samples.push(new Node('negativevalues', "cartesian", data4,cartesian_func));
    samples.push(new Node('sin&cos', "cartesian", data5,cartesian_func));
    samples.push(new Node('tan', "cartesian", data9,cartesian_func));
    samples.push(new Node('House Price in China', "cartesian", china_house,cartesian_func));
    samples.push(new Node('Pop in China', "cartesian", pop_china,cartesian_func));
    samples.push(new Node('linear', "cartesian", data7,cartesian_func));
    samples.push(new Node('Date', "cartesian", data8,cartesian_func));
    samples.push(new Node('TreeMap', "hierarchical", h_data,hierarchical_func));
    samples.push(new Node('SunBurst', "hierarchical", h_data1,hierarchical_func));
    samples.push(new Node('ChinaMap', "geo", geo_data_china,geo_func));
    samples.push(new Node('ChinaMap_pop', "geo", geo_data_china1,geo_func));
    samples.push(new Node('large_data', "cartesian", large_data,cartesian_func));

    
    
    samples.push(new Node('USAMap', "geo", geo_data_usa,geo_func));
    samples.forEach(node => {
        var item = document.createElement('div');
        item.className = "item";

        item.innerText = node.name;
        item.onclick = function (event) {
            if (node.value) {
                chartcontainer.innerHTML = '';
                if(node.desc == 'geo'){
                    geodata = node.value.geo;
                    let value = _.cloneDeep(node.value);
                    editor_left.setValue(JSON.stringify(value, null, 4));
                }else{
                    editor_left.setValue(JSON.stringify(node.value, null, 4));
                }
                node.chart =node.fun(node.value,node.chart);
                node.chart.beginLoadingAnimation();
                currentNode= node;
            }
        };
        sample_item_container.appendChild(item);

    });
    calculate_button.onclick = function (event) {
        var obj = editor_left.getValue();
        chartcontainer.innerHTML = '';
        if(currentNode.desc=='cartesian'){
            currentNode.chart =cartesian_func(JSON.parse(obj),currentNode.chart);
        }else if(currentNode.desc =='hierarchical'){
            hierarchical_func(JSON.parse(obj)).beginLoadingAnimation();
        }else if(currentNode.desc == "geo"){
            let datamodel =JSON.parse(obj);
            datamodel.geo = geodata;
            geo_func(datamodel);
        }else if(currentNode.desc == 'geopath'){
            let datamodel =JSON.parse(obj);
            datamodel.geo = geodata;
            geopath_func(datamodel);
        }
    };
    currentNode =samples[0];
    if(currentNode.desc =='geo'||currentNode.desc =='geopath'){
        geodata = currentNode.value.geo;
    }
    currentNode.chart = currentNode.fun(currentNode.value);
    currentNode.chart.beginLoadingAnimation();
    let value = _.cloneDeep(currentNode.value);
    editor_left.setValue(JSON.stringify(value, null, 4));

});


var Node = function (name, desc, value,fun) {
    this.name = name;
    this.value = value;
    this.desc = desc;
    this.fun = fun;
    this.chart = null;

}