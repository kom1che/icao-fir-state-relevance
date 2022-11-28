console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const icaoCols = [
      {
        id: "Title",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "FIR",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Location_x0020_Indicator",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Region",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    let IcaoTableSchema = {
      id: "ICAO",
      alias: "ICAO FIR-Country relevance",
      columns: icaoCols,
    };

    schemaCallback([IcaoTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://www.icao.int/safety/FITS/Lists/Current%20FIR%20Status/AllItems.aspx",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            Title: resp[i].Title,
            FIR: resp[i].FIR,
            Location_x0020_Indicator: resp[i].Location_x0020_Indicator,
            Region: resp[i].Region,
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "ICAO FIR-Country relevance";
  tableau.submit();
}