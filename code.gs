function onInstall() {
onOpen();
}

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Export to CSV')
      .addItem('Export to CSV', 'exportDataModal')
      .addToUi();

}

function exportDataModal() {
  var html = HtmlService.createHtmlOutputFromFile('download')
    .setWidth(300)
    .setHeight(113);
  DocumentApp.getUi().showModalDialog(html, 'Export Journal Data');
}

function sanitizeString (desc) {
    var itemDesc;
    if(desc){
      desc = desc.replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/[\u2026]/g, '...');
    }
    if (desc) {
        itemDesc = desc.replace(/(\r\n|\n|\r|\s+|\t|&nbsp;)/gm,' ');
        itemDesc = itemDesc.replace(/"/g, '""');
        itemDesc = itemDesc.replace(/ +(?= )/g,'');
    } else {
        itemDesc = '';
    }
    return itemDesc;
}

function exportDoc(exportName){
	var doc = DocumentApp.getActiveDocument();
	var body = doc.getBody();
	var paragraphs = body.getParagraphs();
    var title = h1 = h2 = h3 = h4 = h5 = h6 = "";
    var myExport = [];
    var newline = "\r\n";
    for (var i = 0; i < paragraphs.length; i++) {
      switch(paragraphs[i].getHeading()) {
      case DocumentApp.ParagraphHeading.TITLE:
          title = paragraphs[i].getText();
          break;
      case DocumentApp.ParagraphHeading.HEADING1:
          h1 = paragraphs[i].getText();
          break;
      case DocumentApp.ParagraphHeading.HEADING2:
          h2 = paragraphs[i].getText();
          break;
      case DocumentApp.ParagraphHeading.HEADING3:
          h3 = paragraphs[i].getText();
          break;
      case DocumentApp.ParagraphHeading.HEADING4:
          h4 = paragraphs[i].getText();
          break;
      case DocumentApp.ParagraphHeading.HEADING5:
          h5 = paragraphs[i].getText();
          break;
      case DocumentApp.ParagraphHeading.HEADING6:
          h6 = paragraphs[i].getText();
          break;
      default:
          myExport.push([title, h1, h2, h3,h4, h5, h6, paragraphs[i].getText()])

      }
    }
    
    var csvContent = "data:text/csv;charset=UTF-8,";
    //insert headings
    csvContent += "Title,H1,H2,H3,H4,H5,H6,Text" + newline;
    myExport.forEach(function(rowArray){

     rowArray.forEach(function(part, index, theArray) {
        theArray[index] = '"' + sanitizeString(part) + '"';
    });
     var row = rowArray.join(",");
     csvContent += row + newline;
    }); 

   var encodedUri = encodeURI(csvContent);
   return {
    url: encodedUri,
    filename: exportName+".csv"
  };
}
