module.exports = function (app, conn) {
  app.get("/", function (req, res) {
    res.render("index.html");
  });

  // PollPlace API
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

  app.get("/PollPlace_do", function (req, res) {
    var sgId = req.query.date;
    var sggName = req.query.elecplace;
    var pollType = req.query.pollinfo;
    var stmt = "SELECT DISTINCT sgId FROM election_code; ";

    if (pollType == 'pre') {
      var sql = "SELECT * FROM pre_polls WHERE sgId LIKE '%"+sgId+"%' AND evPsName LIKE '%"+sggName+"%'; ";

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
      var sql = "SELECT * FROM main_polls WHERE sgId LIKE '%"+sgId+"%' AND PsName LIKE '%"+sggName+"%'; ";

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

  // PollPlace CandidateInfo API
  app.get("/CandInfo", function (req, res) {
    var sql = 'SELECT DISTINCT sgId FROM election_code;'

    conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }else{
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.render("CandInfo.html", { codes: resultArray });
      }
    })
  });

  app.get("/CandInfo_do", function (req, res) {
    var sgId = req.query.date;
    var sggName = req.query.elecplace
    var name = req.query.name;

    var sql = 'SELECT DISTINCT sgId FROM election_code; '
    var sql1 = "SELECT * FROM candidate WHERE sgId LIKE '%"+sgId+"%' AND sggName LIKE '%"+sggName+"%' AND name LIKE '%"+name+"%' ORDER BY giho ASC; ";

    conn.query(sql + sql1, function (err, result) {
      if (err) {
        console.log(err);
      }else {
        var resultArray1 = Object.values(JSON.parse(JSON.stringify(result[0])));
        var resultArray2 = Object.values(JSON.parse(JSON.stringify(result[1])));

        res.render("CandInfo.html", { codes : resultArray1, candList : resultArray2 })
      }
    })
  })

  // Candidate Promise API
  app.get("/CandProm", function (req, res) {
    res.render("CandProm.html");
  });

  app.get("/CandProm_do", function (req, res) {
    var name = req.query.name;
    var partyName = req.query.partyName;

    var sql = "SELECT * FROM promise JOIN candidate ON promise.cnddtId=candidate.cnddtId WHERE candidate.name LIKE '%"+name+"%' AND candidate.partyName LIKE '%"+partyName+"%'; ";

    conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }else {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.render("CandProm.html", {promiseList: resultArray})
      }
    })
  })

  // Politician Member API
  app.get("/Member", function (req, res) {
    res.render("Member.html");
  });

  app.get("/Member_do", function (req, res) {
    var name = req.query.name;
    var partyName = req.query.partyName;

    var sql = "SELECT * FROM politician WHERE name LIKE '%"+name+"%' AND partyName LIKE '%"+partyName+"%' ORDER BY name ASC; ";

    conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }else {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

        res.render("Member.html", { memberList : resultArray })
      }
    })
  })

  // Previous Election API
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
};
