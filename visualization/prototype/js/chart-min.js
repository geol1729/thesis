function explore(){clearNodeClick(),d3.select("#intro").transition().style("opacity",0);var e=d3.select("div#sidebar");d3.select("div#sidebar").style("display","block"),d3.select("div#sidebar").transition().style("left","0%")}function getDate(e){var t="";return e.value.hasOwnProperty("date")&&(t=e.value.date),e.value.hasOwnProperty("bdate")&&(t="b. "+e.value.bdate),e.value.hasOwnProperty("ddate")&&(t+=" d. "+e.value.ddate),t}function formatRank(e){return"Rank: "+e.value.rank+"%"}function getLocation(e){return e.value.hasOwnProperty("location")?e.value.location:""}function showDeets(){return function(e){var t=e.value.title,r=getLocation(e),n=getDate(e),a=formatRank(e),l=50;d3.select(this).transition().attrs({r:circleSize(4)});var i=d3.select("div#chart").append("div").attrs({class:"nodeDeets card"}).styles({left:e.x+25+"px",top:e.y-50+"px",opacity:0});e.value.hasOwnProperty("image")&&null!=e.value.image&&i.append("div").classed("imgBox",!0).append("img").attrs({src:e.value.image,class:"svgHoverImg"}),i.append("p").text(t).append("span").classed("details",!0).html(" <br/> "+a+" <br/> "+r+" <br/> "+n),i.transition().style("opacity",1)}}function circleSize(e){return function(t){return"Dada"==t.id?5+e:1.5*Math.ceil(100*+t.value.rank)+e}}function hideDeets(){return function(e){d3.select("div.nodeDeets").remove(),d3.select(this).transition().attrs({r:circleSize(0)})}}function toggler(){return function(e){var t=d3.select("div.toggle.g"+e.value),r=d3.select("svg").selectAll("circle.g"+e.value);t.classed("clicked")?(t.classed("clicked",!1),r.classed("toggled",!1)):(t.classed("clicked",!0),r.classed("toggled "+colorStrArr[e.value%8],!0))}}var colorStrArr=["lblu","oran","tgol","brow","blue","purp","ttea","gree"],svg=d3.select("svg");width=+svg.attr("width"),height=+svg.attr("height");var zg=svg.append("g"),slider=document.getElementById("slider-connect");d3.json("data/forceChart-sm.json",function(e,t){function r(e,r){var n=e.selectAll("div.article").data(t.nodes.filter(function(e){return e.value.distance==r})).enter().append("div").attrs({class:"article card",id:function(e){return"a_"+e.id}}),a=n.filter(function(e){return e.value.hasOwnProperty("image")&&null!=e.value.image}).append("div").classed("imgBox",!0).append("img").attrs({src:function(e){return e.value.image},class:"articleImg"}),l=n.append("p").classed("articleTitle",!0).text(function(e){return e.value.title}),i=n.append("p").classed("textLite",!0).html(function(e){var t=getDate(e)+"<br/>",r=e.value.hasOwnProperty("location")?e.value.location+"<br/>":"";return formatRank(e)+"<br/>"+r+t}),s=n.append("a").attrs({href:function(e){return"https://en.wikipedia.org/wiki/"+e.url},target:"new",class:"wiki"}).text("Wiki")}function n(e){var t=e.progress;meter.style.width=100*t+"%"}function a(e){var t=e.nodes,r=e.links;meter.style.display="none",console.log(t),console.log(r);var n=zg.append("g").attr("class","links").selectAll("line").data(r).enter().append("line").attrs({x1:function(e){return e.source.x},y1:function(e){return e.source.y},x2:function(e){return e.target.x},y2:function(e){return e.target.y},class:function(e){return e.source.id+" "+e.target.id}}),a=zg.append("g").attr("class","nodes").selectAll("circle").data(t).enter().append("circle").attrs({r:circleSize(0),cx:function(e){return e.x},cy:function(e){return e.y},class:function(e){var t="";for(var r in e.value.group)t=t+" g"+e.value.group[r];return t},id:function(e){return e.id}}).on("mouseover",showDeets()).on("mouseout",hideDeets()).on("click",nodeClick()),l=d3.select("#titleList"),i=document.getElementById("search");l.selectAll("option").data(titleList).enter().append("option").attr("value",function(e){return e}),new Awesomplete(i,{list:"#titleList",minChars:3,maxItems:10})}if(e)throw e;var l=d3.select("#catBox").selectAll("div.toggle").data(t.groupKey).enter().append("div").attr("class",function(e){return"toggle g"+e.value}).text(function(e){return e.key});l.append("input").attrs({class:"tgl tgl-light",id:function(e){return"g"+e.value},type:"checkbox"}).on("mouseup",toggler()),l.append("label").attrs({class:function(e){return"tgl-btn tgl-"+colorStrArr[e.value%8]},for:function(e){return"g"+e.value}}).on("mouseup",toggler());var i=d3.select("#row_d2");r(d3.select("#row_d1"),1),r(i,2);var s=t.links,o=t.nodes;meter=document.querySelector("#progress"),worker=new Worker("js/worker.js"),urlList=[],titleList=[];for(var c in o)urlList.push(o[c].id),titleList.push(o[c].value.title);worker.postMessage({nodes:o,links:s}),worker.onmessage=function(e){switch(e.data.type){case"tick":return n(e.data);case"end":return a(e.data)}}});