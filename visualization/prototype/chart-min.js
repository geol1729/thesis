function showDeets(){return function(e){var t=e.value.title,n=50;d3.select(this).transition().attrs({r:8});var r=d3.select("div#chart").append("div").attrs({class:"nodeDeets"}).styles({left:e.x+25+"px",top:e.y-50+"px",opacity:0});r.append("p").text(t),e.value.hasOwnProperty("location")&&r.append("p").text(e.value.location),e.value.hasOwnProperty("date")&&r.append("p").text(e.value.date),e.value.hasOwnProperty("image")&&r.append("img").attr("src",e.value.image).attr("width","100px"),r.transition().style("opacity",1)}}function hideDeets(){return function(e){d3.select("div.nodeDeets").remove(),d3.select(this).transition().attrs({r:3})}}function pathBack(){return function(e){}}function toggler(){return function(e){var t=d3.select("div.toggle.g"+e.value.id),n=d3.select("svg").selectAll("circle.g"+e.value.id);t.classed("clicked")?(t.classed("clicked",!1),n.classed("toggled",!1)):(t.classed("clicked",!0),n.classed("toggled",!0))}}var svg=d3.select("svg"),width=+svg.attr("width"),height=+svg.attr("height"),zg=svg.append("g");d3.json("data/forceChart.json",function(e,t){function n(e){var t=e.progress;meter.style.width=100*t+"%"}function r(e){var t=e.nodes,n=e.links;meter.style.display="none",console.log(t),console.log(n);var r=zg.append("g").attr("class","links").selectAll("line").data(n).enter().append("line").attrs({r:3,x1:function(e){return e.source.x},y1:function(e){return e.source.y},x2:function(e){return e.target.x},y2:function(e){return e.target.y}}),s=zg.append("g").attr("class","nodes").selectAll("circle").data(t).enter().append("circle").attrs({r:3,cx:function(e){return e.x},cy:function(e){return e.y},class:function(e){console.log(e);var t="";for(var n in e.value.group)t=t+" g"+e.value.group[n];return t}}).on("mouseover",showDeets()).on("mouseout",hideDeets())}if(e)throw e;var s=d3.select("#sidebar").selectAll("div.toggle").data(t.groupKey).enter().append("div").attr("class",function(e){return"toggle g"+e.value.id}).text(function(e){return e.key}).on("mouseup",toggler()),a=t.links,o=t.nodes;meter=document.querySelector("#progress"),worker=new Worker("worker.js"),worker.postMessage({nodes:o,links:a}),worker.onmessage=function(e){switch(e.data.type){case"tick":return n(e.data);case"end":return r(e.data)}}});