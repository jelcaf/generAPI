exports.index = function(req, res){
  res.render("index", { title: "generaAPI" });
};

exports.table = function(req, res){
  res.render("table_proposal", { title: "generaAPI" });
};