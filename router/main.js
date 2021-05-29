module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.html");
  });

  app.get("/about", function (req, res) {
    res.render("about.html");
  });

  /*
  app.get("/getCode", function (req, res) {
    var stmt = "SELECT * FROM election_code;";

    conn.query(stmt, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
  */
};
