import d3 from 'd3';
let dependencyGraph = {};

dependencyGraph.init = function(el, data, options){
    this.nodes = [];
    this.links = [];

    this.svg = d3.select(el).append('svg')
                .attr('width', options.width)
                .attr('height',options.height)
                .attr('class', 'dependencyGraph')
                .style('background-color', options.background);

    this.link = this.svg.selectAll(".link");
    this.node = this.svg.selectAll(".node");

    this.force = d3.layout.force()
            .nodes(this.nodes)
            .links(this.links)
            .charge(options.nodeCharge)
            .linkDistance(options.linkLength)
            .size([options.width, options.height]);

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

    this.svg.selectAll("defs").remove();
    this.svg.selectAll("marker").remove();
    this.markers = null;

    if(options.directional){
        var size = parseInt(options.nodeRadius/2) * 1.5;
        this.svg.append("defs").selectAll("marker")
            .data(["end"])
            .enter().append("marker")
            .attr("id", function(d) { return d; })
            .attr("refX", size+options.nodeRadius)
            .attr("refY", size/2)
            .attr("markerWidth", size)
            .attr("markerHeight", size)
            .attr("orient", "auto")
            .append("path")
            .attr("d", `M 0,0 L 0,${size} L ${size},${size/2} Z`)
            .style("stroke", options.linkStroke)
            .style("fill", options.linkStroke)
    }

    this.force
        .nodes(this.nodes)
        .links(this.links)
        .charge(options.nodeCharge)
        .linkDistance(options.linkLength)
        .size([options.width, options.height]);


    this.svg.attr('width', options.width)
            .attr('height',options.height)
            .style('background-color', options.background);


    this.link = this.link.data(this.links, function(d) {return(d.source.id+'-'+d.target.id); });

    this.link
        .enter()
        .insert("line",":first-child")
        .attr("class", "link")
        .style("marker-end",  "url(#end)");

    this.link.exit().remove();

    this.link.style('stroke', options.linkStroke)

    this.node = this.node.data(this.nodes, function(d) {return(d.id); });
    var nodeG = this.node
        .enter()
        .append("g")
        .attr("title", function(d){ return d.label})

    if(options.allowForce){
        this.svg.selectAll('g').call(this.force.drag);
        nodeG.call(this.force.drag);
    }else{
        this.svg.selectAll('g').on('mousedown.drag', null);
    }


    nodeG.append("circle")
        .attr("class", "node")

    nodeG.append("text")
        .attr("transform", `translate(${options.nodeRadius * 1.5},${options.nodeRadius/2})`)
        .text(function(d){ return d.label;})

    this.node.exit().remove();

    this.node.selectAll('circle')
        .attr("r", options.nodeRadius)
        .style("fill", options.nodeFill);

    this.node.selectAll('text')
            .style("fill", options.nodeTextFill)

    var _ = this;
    this.force.on("tick", function() {
        _.node.attr('transform',function(d) {
            var x = d.x || 0;
            var y = d.y || 0;
            return `translate(${x}, ${y})`;
        });

        if(options.allowGrow && !options.directional){
            _.node.select('circle').attr("r", function(d){
                return options.nodeRadius * ((1+(0.1*d.weight)) || 1);
            });

            _.node.select('text').attr("transform",function(d){
                var radius = options.nodeRadius * ((1+(0.2*d.weight)) || 1);
                return `translate(${radius},${radius/2})`;
            })
        }else{
            _.node.select('circle').attr("r", function(d){
                return options.nodeRadius;
            });

            _.node.select('text').attr("transform",function(d){
                var radius = options.nodeRadius;
                return `translate(${radius},${radius/2})`;
            })
        }


        _.link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    });
    this.force.start();
};

export default dependencyGraph;