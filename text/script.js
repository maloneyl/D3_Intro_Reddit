main();

function main() {
  setInterval(function() {
    getData(function(data) {
      viz(formatData(data))
    });
  }, 10000)
}

function formatData(data) {
  // turn data into [Story]
  return data.data.children.map(function(d) {
    return d.data
  })
}

function viz(stories) {

  stories.sort(function(a, b) {
    return b.score - a.score; // sort by descending score
    // return Math.random() - 0.5 // randomize
  });

  var update = d3.select("#stories") // this group could be empty or tons
                .selectAll("li")
                .data(stories, getId);

  var enter = update.enter() // get enter context
                .append("li");

  update
    .text(function(d) {
      return truncate(d.title);
    })
    .transition()
    .style("top", function(d, i) { // i: index
      return (i * 3) + "em"; // give it a block display
    })
}

function getId(story) {
  return story.id
}

function getData(callback) {
  d3.json("http://www.reddit.com/.json", function(err, data) {
    callback(data)
  })
}

function truncate(string, n) {
  n = n != null ? n : 40;
  if(string.length > n) {
    return string.slice(0, n) + "...";
  }
  return string;
}
