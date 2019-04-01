/**
 * 
 */

class Navigator {

/*
async _checkMiniatures() {
   const knotPanel = document.querySelector("#knot-panel");
   
   if (this._knots != null) {
      for (let kn in this._knots) {
         if (this._knots[kn].render && !this._knots[kn].miniature) {
            let htmlKnot = await this._author._generateHTML(kn);
            knotPanel.innerHTML = htmlKnot;
            let promiseCapture = html2canvas(knotPanel, {scale: 0.2});
            this._knots[kn].miniature = await promiseCapture;
            // this._knots[kn].miniature = canvas.toDataURL();
         }
      }
   }
}
*/
   
constructor() {
   this._mountTreeClicked = this._mountTreeClicked.bind(this);
}
   
async mountPlainCase(author, knots) {
   this._author = author;
   this._knots = knots;
   this._navigationPanel = document.querySelector("#navigation-panel");
   
   this._capsule = await window.messageBus.ext.request("capsule/knot/get", "", "capsule/knot");
   
   let openTree = this._createKnotEntry("_opentree_");
   openTree.innerHTML = "<h2 style='color: white; background-color: black; cursor: pointer'>Gordon&gt;</h2>";
   openTree.addEventListener("click", this._mountTreeClicked);
   this._navigationPanel.appendChild(openTree);
   
   for (let kn in this._knots) {
      if (this._knots[kn].type == "knot") {
         let miniature = this._createKnotEntry("mini-" + kn.replace(/\./g, "_"));
         
         const dot = this._knots[kn].title.lastIndexOf(".");
         const title = (dot == -1) ? this._knots[kn].title : this._knots[kn].title.substring(dot);
         if (this._knots[kn].render) {
            miniature.innerHTML = "<h3><dcc-trigger action='knot/" + kn + "/selected' xstyle='none' " +
                                       "label = '" + title + "'>" +
                                  "</dcc-trigger></h3>";
            let iframe = await this._createMiniature(kn);
            miniature.appendChild(iframe);
         } else
            miniature.innerHTML = "<h2 style='background-color: lightgray'>" + title + "</h2>";
         this._navigationPanel.appendChild(miniature);
      }
         
   }
}

_createKnotEntry(id) {
   let miniature = document.createElement("div");
   miniature.id = id; 
   miniature.classList.add("navigation-knot");
   miniature.classList.add("std-border");
   return miniature;
}

async _createMiniature(kn) {
   let htmlKnot = await this._author._generateHTML(kn);
   let iframe = document.createElement('iframe');
   iframe.width = Navigator.standardDimensions.miniWidth;
   iframe.height = Navigator.standardDimensions.miniHeight;
   iframe.srcdoc = this._capsule.message.replace("{knot}", htmlKnot);
   return iframe;
}

async _mountTreeClicked(event) {
   this.mountTreeCase(this._author, this._knots);
}

async mountTreeCase(author, knots) {
   this._author = author;
   this._knots = knots;
   this._navigationPanel = document.querySelector("#navigation-panel");
   this._knotPanel = document.querySelector("#knot-panel");
   
   this._capsule = await window.messageBus.ext.request("capsule/knot/get", "", "capsule/knot");
   
   this._navigationPanel.innerHTML = "";
   this._knotPanel.style.flex = "20%";
   this._navigationPanel.style.flex = "80%";
   
   // building the visual tree
   let tree = {level: 0, children: []};
   let current = tree;
   let levelStack = [];
   let previousKnot = null;
   let maxLevel = 0;
   for (let k in this._knots) {
      if (!this._knots[k].categories || this._knots[k].categories.indexOf("note") < 0) {
         let newKnot = {id: "mini-" + k.replace(/\./g, "_"),
                        title: this._knots[k].title,
                        level: this._knots[k].level};
         if (previousKnot == null || newKnot.level == previousKnot.level)
            current.children.push(newKnot);
         else if (newKnot.level > previousKnot.level) {
            previousKnot.children = [newKnot];
            levelStack.push(current);
            current = previousKnot;
         } else {
            let newLevel = previousKnot.level;
            while (levelStack.length > 0 && newKnot.level < newLevel) {
               current = levelStack.pop();
               newLevel = current.level;
            }
            current.children.push(newKnot);
         }
         previousKnot = newKnot;
      }
      maxLevel = (this._knots[k].level > maxLevel) ? this._knots[k].level : maxLevel;
   }
   
   // computing dimensions
   const baseTitle =
      Navigator.standardDimensions.titleBase + Navigator.standardDimensions.titleDelta * maxLevel;
   this._computeDimension(tree, true, 0, -baseTitle, maxLevel);
   
   console.log(tree);
   
   // set the dimensions and margins of the graph
   /*
   let margin = {top: 10, right: 10, bottom: 10, left: 10},
     width = 2048 - margin.left - margin.right,
     height = 1200 - margin.top - margin.bottom;
   */
   let margin = {top: 10, right: 10, bottom: 10, left: 10},
       width = tree.width,
       height = tree.height;
   
   // append the svg object to the body of the page
   this._navigationPanel.innerHTML =
      "<div id='navigation-tree' style='width:" +
      tree.width + " height:" + tree.height + "'></div>";
   let svg = d3.select("#navigation-tree")
     .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
         .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");
   
   // console.log(tree);
   
   var root = d3.hierarchy(tree).sum(function(d){return 1});

   /*
   d3.treemap()
     .size([width, height])
     .tile(d3.treemapSliceDice)
     .paddingTop(28)
     .paddingRight(7)
     .paddingInner(3)
     (root);
   */

   let gs =
      svg
      .selectAll("rect")
      .data(root.descendants().filter(function(d){return d.depth >= 1}))
      .enter()
      .append("g");
   
   /*
   gs.append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("opacity", function(d){ return 0.5});
   */
   gs.append("rect")
      .attr("x", function (d) { return d.data.x; })
      .attr("y", function (d) { return d.data.y; })
      .attr("width",  function (d) { return d.data.width; })
      .attr("height", function (d) { return d.data.height; })
      .style("opacity", function(d){ return 0.5});
   
   /*
   gs.append("foreignObject")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr("id", function(d){ return d.data.id; })
      .attr("width", function (d) { return d.x1 - d.x0; })
      .attr("height", function (d) { return d.y1 - d.y0; });
   */

   gs.append("foreignObject")
     .attr("x", function (d) { return d.data.x; })
     .attr("y", function (d) { return d.data.y + d.data.titleSize; })
     .attr("id", function(d){ return d.data.id; })
     .attr("width", function (d) { return d.data.width; })
     .attr("height", function (d) { return d.data.height; });
   
   /*
   svg
     .selectAll("text")
     .data(root.descendants().filter(function(d){return d.depth>=1}))
     .enter()
     .append("text")
     .attr("x", function(d){ return d.x0+5})
     .attr("y", function(d){ return d.y0+20})
     .text(function(d){ return d.data.title; })
     .attr("font-size", function(d) {return ((4-d.data.level) * 10) + "px"})
     .attr("fill", "white");
   */
   
   svg
      .selectAll("text")
      .data(root.descendants().filter(function(d){return d.depth>=1}))
      .enter()
      .append("text")
      .attr("x", function(d){ return d.data.x + 5})
      .attr("y", function(d){ return d.data.y + 20})
      .text(function(d){ return d.data.title; })
      .attr("font-size", function(d) {return d.data.titleSize + "px"})
      .attr("fill", "white");
   
   for (let kn in this._knots) {
      if (this._knots[kn].render) {
         let id = "#mini-" + kn.replace(/\./g, "_");
         // console.log(id);
         let fo = document.querySelector(id);
         if (fo != null) {
            let iframe = await this._createMiniature(kn);
            fo.appendChild(iframe);
         }
      }
   }
}

_computeDimension(knot, horizontal, x, y, titleLevel) {
   knot.x = x;
   knot.y = y;
   knot.titleSize = Navigator.standardDimensions.titleBase +
                    Navigator.standardDimensions.titleDelta * titleLevel;
   if (!knot.children) {
      knot.width = Navigator.standardDimensions.miniWidth;
      knot.height = Navigator.standardDimensions.miniHeight;
   } else {
      knot.width = 0;
      knot.height = 0;
      let shiftX = x + Navigator.standardDimensions.paddingX;
      let shiftY = y + Navigator.standardDimensions.paddingY + knot.titleSize;
      for (let k in knot.children) {
         this._computeDimension(
            knot.children[k], !horizontal, shiftX, shiftY, titleLevel - 1);
         if (horizontal) {
            knot.width += knot.children[k].width;
            knot.height = (knot.children[k].height > knot.height)
               ? knot.children[k].height
               : knot.height;
            shiftX += knot.children[k].width + Navigator.standardDimensions.marginX;
         } else {
            knot.height += knot.children[k].height;
            knot.width = (knot.children[k].width > knot.width)
               ? knot.children[k].width
               : knot.width;
            shiftY += knot.children[k].height + Navigator.standardDimensions.marginY;
         }
      }
      if (horizontal)
         knot.width += (knot.children.length - 1) * Navigator.standardDimensions.marginX;
      else
         knot.height += (knot.children.length - 1) * Navigator.standardDimensions.marginY;
   }
   knot.width += Navigator.standardDimensions.paddingX * 2;
   knot.height += Navigator.standardDimensions.paddingY * 2 + knot.titleSize;
}

}

(function() {
   Navigator.standardDimensions = {
      miniWidth: 200, // 16:9
      miniHeight: 112,
      marginX : 5,
      marginY : 5,
      paddingX: 3,
      paddingY: 3,
      titleBase: 10,
      titleDelta: 10
   };
})();