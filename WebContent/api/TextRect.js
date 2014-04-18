function TextRect(configs){
	this.configs = configs;
	this.group = new Kinetic.Group();
	var ref = this;
    this.text = new Kinetic.Text({
        x: ref.configs["x"],
        y: ref.configs["y"],
        text: ref.configs["text.value"],
        fontSize: ref.configs["text.font.size"],
        fontFamily: ref.configs["text.font.family"],
        fill: ref.configs["text.fill.color"],
        width: ref.configs["text.width"],
        align: ref.configs["text.align"]
      });

     this.rect = new Kinetic.Rect({
          x: ref.configs["x"],
          y: ref.configs["y"],
          width: ref.configs["rect.width"],
          height: ref.configs["rect.height"],
          fill: ref.configs["rect.fill.color"],
          stroke: ref.configs["rect.stroke.color"],
          strokeWidth: ref.configs["rect.stroke.width"]
        });

      this.group.add(this.rect);
      this.group.add(this.text);
      
      this.getGroup = function(){
    	  return this.group;
      };
      this.getRect = function(){
    	  return this.rect;
      };
      this.getText = function(){
    	  return this.text;
      };
}