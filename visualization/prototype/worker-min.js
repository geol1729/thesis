importScripts("https://d3js.org/d3-collection.v1.min.js"),importScripts("https://d3js.org/d3-dispatch.v1.min.js"),importScripts("https://d3js.org/d3-quadtree.v1.min.js"),importScripts("https://d3js.org/d3-timer.v1.min.js"),importScripts("https://d3js.org/d3-force.v1.min.js"),onmessage=function(o){var s=o.data.nodes,t=o.data.links;console.log(o);for(var r=d3.forceSimulation(s).force("charge",d3.forceManyBody()).force("link",d3.forceLink(t).id(function(o){return o.id}).distance(10)).force("x",d3.forceX()).force("y",d3.forceY()).stop(),e=0,i=500;e<500;++e)postMessage({type:"tick",progress:e/500}),r.tick(),console.log(e+" 500");postMessage({type:"end",nodes:s,links:t})};