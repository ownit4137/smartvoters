module.exports = function (app, conn) {
  app.get("/", function (req, res) {
    res.render("index.html");
  });

  app.get("/PollPlace", function (req, res) {
    var sql = 'SELECT DISTINCT sgId FROM election_code;'

    conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }else{
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.render("PollPlace.html", { codes: resultArray });
      }
    })
  });

  app.get("/CandInfo", function (req, res) {
    res.render("CandInfo.html");
  });

  app.get("/CandProm", function (req, res) {
    res.render("CandProm.html");
  });

  app.get("/Member", function (req, res) {
    res.render("Member.html");
  });

  app.get("/PrevElec", function (req, res) {
    var stmt = "SELECT * FROM election_code;";

    conn.query(stmt, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.render("PrevElec.html", { codes: resultArray });
      }
    });
  });

  app.get("/PollPlace_do", function (req, res) {
    var sgId = req.query.date;
    var sggName = req.query.elecplace;
    var pollType = req.query.pollinfo;
    var stmt = "SELECT DISTINCT sgId FROM election_code; ";

    if (pollType == 'pre') {
      var sql = "SELECT * FROM pre_polls WHERE sgId="+sgId+" AND evPsName LIKE '%"+sggName+"%'; ";

      conn.query(stmt + sql, function (err, result) {
        if (err) {
          console.log(err);
        }else {
          var resultArray1 = Object.values(JSON.parse(JSON.stringify(result[0])));
          var resultArray2 = Object.values(JSON.parse(JSON.stringify(result[1])));

          res.render("PollPlace.html", { pollList : resultArray2, codes : resultArray1, pollType:pollType });
        }
      })
    }else {
      var sql = "SELECT * FROM main_polls WHERE sgId="+sgId+" AND PsName LIKE '%"+sggName+"%'; ";

      conn.query(stmt + sql, function (err, result) {
        if (err) {
          console.log(err);
        }else {
          var resultArray1 = Object.values(JSON.parse(JSON.stringify(result[0])));
          var resultArray2 = Object.values(JSON.parse(JSON.stringify(result[1])));

          res.render("PollPlace.html", { pollList : resultArray2, codes : resultArray1, pollType:pollType });
        }
      })
    }
  })

  app.get("/getCandidate", function (req, res) {
    var name = req.query.name;
    var partyName = req.query.partyName;
    var sql =
      "SELECT * FROM candidate WHERE name LIKE '%" +
      name +
      "%' and partyName LIKE '%" +
      partyName +
      "%';";

    conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.render("poll.html", { candidate: resultArray });
      }
    });
  });
};
