main();

function main() {
  //setInterval(function() {
    tick();
  //},2000)
  tick();
  function tick() {
    getData(function(data) {
      viz(formatData(data))
    });
  }

}
function formatData(data) {
  return data.data.children.map(function(d) {
    return d.data
  })
}
function viz(stories) {

  stories.sort(function(a,b) {
    return b.score - a.score;
  });

  var WIDTH = 200;

  var update = d3.select("#graph")
    .selectAll(".bar")
    .data(stories,getId);

  var scoreExtent = d3.extent(stories,function(d) {
    return d.score;
  })

  var xScale = d3.scale.linear()
    .domain([0,stories.length - 1])
    .range([0,200]);
  var widthScale = d3.scale.linear()
    .domain(scoreExtent)
    .range([5,WIDTH])

  var enter = update.enter()
    .append("rect")
    .attr("class","bar")
    .on("mouseover",displayStory)
    .on("click",visitStory)

  update
    .attr("width",function(d,i) {
      return widthScale(d.score);
    })
    .attr("height",20)
    .attr("x",0)
    .attr("y",function(d,i){
      return i * 25;
    });

}
function getId(story) {
  return story.id
}
function getData(callback) {
  d3.json("http://www.reddit.com/.json",function(err,data) {
    callback(data)
  })
}
function displayStory(story) {
  d3.select("#story-name")
    .text(truncate(story.title,25))
}
function visitStory(story) {
  window.location = story.url;
}


function truncate(string,n) {
  n = n != null ? n : 40;
  if(string.length > n) {
    return string.slice(0,n) + "...";
  }
  return string;
}
