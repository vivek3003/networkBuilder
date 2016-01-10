import d3 from 'd3';
let dependencyGraph = {};

dependencyGraph.init = function(el, data, options){
    this.nodes = [];
    this.links = [];

    //Process Options
    this.width = options.width;
    this.height = options.height;
    this.nodeOptions = options.node;
    this.linkOptions = options.link;

    this.svg = d3.select(el).append('svg')
                .attr('width', this.width)
                .attr('height',this.height)
                .attr('class', 'dependencyGraph');

    this.link = this.svg.selectAll(".link");
    this.node = this.svg.selectAll(".node");

    this.force = d3.layout.force()
            .nodes(this.nodes)
            .links(this.links)
            .charge(this.nodeOptions.charge)
            .linkDistance(this.linkOptions.distance)
            .size([this.width, this.height]);



    this.update(data, options);
}

dependencyGraph.update = function(data, options){
    //Process Data
    this.nodes = data.nodes;
    this.links = data.links.map((link, i)=>{
        return {
            'source':this.nodes[link.source],
            'target':this.nodes[link.target]
        }
    });

    this.force
        .nodes(this.nodes)
        .links(this.links)


    //Process Options
    this.width = options.width;
    this.height = options.height;
    this.nodeOptions = options.node;
    this.linkOptions = options.link;


    this.link = this.link.data(this.links, function(d) {return(d.source.id+'-'+d.target.id); });

    this.link
        .enter()
        .append("line")
        .attr("class", "link")
        .style('stroke', this.linkOptions.stroke)

    this.link.exit().remove();

    this.node = this.node.data(this.nodes, function(d) {return(d.id); });
    var nodeG = this.node
        .enter()
        .append("g")
        .attr("title", function(d){ return d.label})
        //.call(this.force.drag);

    nodeG.append("circle")
        .attr("class", "node")
        .attr("r", this.nodeOptions.radius)
        .style("fill", this.nodeOptions.fill)

    nodeG.append("text")
        .style("fill", this.nodeOptions.text.fill)
        .attr("transform", `translate(${this.nodeOptions.radius * 1.5},${this.nodeOptions.radius/2})`)
        .text(function(d){ return d.label;})

    this.node.exit().remove();

    var _ = this;
    this.force.on("tick", function() {
        _.node.attr('transform',function(d) {
            var x = d.x || 0;
            var y = d.y || 0;
            return `translate(${x}, ${y})`;
        })

        _.node.select('circle').attr("r", function(d){
            return _.nodeOptions.radius * (d.weight || 1);
        })

        _.link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    });
    this.force.start();
};

export default dependencyGraph;