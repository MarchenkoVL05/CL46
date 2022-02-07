   // Element.matches()
(function(e) {
        var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
        !matches ? (e.matches = e.matchesSelector = function matches(selector) {
        var matches = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matches, function(e) {
                return e === th;
        });
        }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);


function t431_init(recid) {
  var tableHead = t431__escapeHTML(document.querySelector('#rec' + recid + ' .t431 .t431__data-part1').innerHTML || "");
  var tableBody = t431__escapeHTML(document.querySelector('#rec' + recid + ' .t431 .t431__data-part2').innerHTML || "");
  var tableColSize = document.querySelector('#rec' + recid + ' .t431 .t431__table').getAttribute("data-table-width");
  var hasTargetBlank = document.querySelector('#rec' + recid + ' .t431 .t431__table').getAttribute("data-target-blank");
  var tHead = t431_parseData(tableHead);
  var tBody = t431_parseData(tableBody);
  var colSize = t431_parseData(tableColSize);
  var maxColNum = t431__findMaxRowLengthInTable(tHead, tBody);
  var colWidth = t431__setColumnsWidth(colSize, maxColNum, recid);
  var container = document.querySelector('#rec' + recid + ' .t431 .t431__table');
  var html = "";
  if (tHead) {
          html += t431__generateTable(tHead, "th", hasTargetBlank, colWidth, maxColNum)
  }
  if (tBody) {
          html += t431__generateTable(tBody, "td", hasTargetBlank, colWidth, maxColNum)
  }
  container.insertAdjacentHTML('beforeend', html)
}

function t431__findMaxRowLengthInTable(arrayHead, arrayData) {
  var headMaxLength = 0;
  var dataMaxLength = 0;
  if (arrayHead) {
          headMaxLength = t431__findMaxRowLengInArray(arrayHead)
  }
  if (arrayData) {
          dataMaxLength = t431__findMaxRowLengInArray(arrayData)
  }
  if (dataMaxLength > headMaxLength) {
          return dataMaxLength
  } else {
          return headMaxLength
  }
}

function t431__escapeHTML(string) {
    var html = string.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
    var result = "";
    var allowedTags = "";
    ['b', 'i', 'u', 'ul', 'li', 'ol', 'br', 'img', 's', 'sub', 'sup', 'span', 'hr', 'pre', 'code', 'mark', 'strong', 'small'].forEach(function (value) {
            allowedTags += ":not(" + value + ")"
    });
    var allowedAttrs = ['alt', 'class', 'title', 'id', 'src', 'style', 'width', 'height', 'data-replace-key'];
    var parseHTML = function (str) {
        fakeDOM = document.implementation.createHTMLDocument('fake');
        fakeDOM.body.innerHTML = str;
        return fakeDOM.body.childNodes;
      };
    var createdStructure;
    if (parseHTML(html)) {
        createdStructure = parseHTML(html)
    } else {
        createdStructure = []
    }
    for (var i = 0; i <createdStructure.length; i++) {
        if (createdStructure[i] !== allowedTags) {
            if (createdStructure[i].nodeType !== 3 && parseHtml[i].nodeType !== 8) {
                    var temp = document.createElement(el.tagName);
                    allowedAttrs.forEach(function (value) {
                            if (createdStructure[i].getAttribute(value) !== null) {
                                    temp.setAttribute(value, el.getAttribute(value).replace(/javascript:/gi, ''))
                            }
                    });
                    temp.textContent = createdStructure[i].textContent;
                    result += temp.outerHTML
            } else {
                    result += createdStructure[i].textContent
            }
        }
    }
    return result
}

function t431__findMaxRowLengInArray(curArray) {
  var maxLength = 0;
  for (var i = 0; i < curArray.length; i++) {
          if (curArray[i].length > maxLength) {
                  maxLength = curArray[i].length
          }
  }
  return maxLength
}

function t431__setColumnsWidth(colWidth, colsNumber, recid) {
  if (colWidth) {
          return colWidth[0]
  } else {
          var tableWidth = document.querySelector('#rec' + recid + ' .t431 .t-container .t-col');
          var computedWidth = parseFloat(getComputedStyle(tableWidth, null).width.replace("px", ""))
          return (computedWidth / colsNumber + "px")
  }
}

function t431__generateTable(arrayValues, colTag, hasTargetBlank, colWidth, maxColNumber) {
  var html = "";
  var tag = "";
  if (colTag == "td") {
          tag = "tbody"
  } else {
          tag = "thead"
  }
  html += '<' + tag + ' class="t431__' + tag + '">';
  for (var i = 0; i < arrayValues.length; i++) {
          if (colTag == "td") {
                  if ((i + 1) % 2 > 0) {
                          html += '<tr class="t431__oddrow">'
                  } else {
                          html += '<tr class="t431__evenrow">'
                  }
          } else {
                  html += '<tr>'
          }
          var addingCols = 0;
          if (arrayValues[i].length < maxColNumber) {
                  addingCols = maxColNumber - arrayValues[i].length
          }
          for (var j = 0; j < (arrayValues[i].length + addingCols); j++) {
                  if (arrayValues[i][j]) {
                          var curWidth = "";
                          if (Array.isArray(colWidth) && colWidth[j]) {
                                  curWidth = colWidth[j].myText
                          } else {
                                  curWidth = colWidth
                          }
                          var ColWithAttr = '';
                          if (colTag == "td") {
                                  ColWithAttr = '<td class="t431__td t-text" width="' + curWidth + '">'
                          } else {
                                  ColWithAttr = '<th class="t431__th t-title" width="' + curWidth + '">'
                          }
                          if (arrayValues[i][j].myHref) {
                                  var tBlank = "";
                                  if (hasTargetBlank) {
                                          tBlank = "target=\"_blank\""
                                  }
                                  var linkWithAttr = "";
                                  var linkCloseTag = "";
                                  if (arrayValues[i][j].myHrefType == "link") {
                                          linkWithAttr = '<a href="' + arrayValues[i][j].myHref + '"' + tBlank + '>';
                                          linkCloseTag = '</a>'
                                  } else {
                                          linkWithAttr = '<div class="t431__btnwrapper"><a href="' + arrayValues[i][j].myHref + '"' + tBlank + ' class="t-btn t-btn_sm"><table style="width:100%; height:100%"><tr><td>';
                                          linkCloseTag = '</td></tr></table></a></div>'
                                  }
                                  html += ColWithAttr + linkWithAttr + arrayValues[i][j].myText + linkCloseTag + '</' + colTag + '>'
                          } else {
                                  html += ColWithAttr + arrayValues[i][j].myText + '</' + colTag + '>'
                          }
                  } else {
                          html += '<' + colTag + ' class="t431__' + colTag + '" width="' + curWidth + '">' + '</' + colTag + '>'
                  }
          }
          html += "</tr>"
  }
  html += "</" + tag + ">";
  return html
}

function t431_parseData(data) {
  if (data !== "" && typeof data != "undefined") {
          data = t431__addBrTag(data);
          var arrayTable = [];
          var arrayRow = [];
          var curItem = {
                  myText: "",
                  myHref: "",
                  myHrefType: ""
          };
          var hasLink = "";
          var hasLinkWithSpace = "";
          var hasBtn = "";
          var hasBtnWithSpace = "";
          var endLine = "";
          for (var i = 0; i < data.length; i++) {
                  if (data[i] == ";" && !(data.slice(i - 4, i) == "&lt;" || data.slice(i - 4, i) == "&gt;" || data.slice(i - 5, i) == "&amp;" || data.slice(i - 6, i) == "&nbsp;")) {
                          arrayRow.push(curItem);
                          curItem = {
                                  myText: "",
                                  myHref: ""
                          };
                          hasLink = "";
                          hasLinkWithSpace = "";
                          hasBtn = "";
                          hasBtnWithSpace = ""
                  } else {
                          if (hasLink == "link=" || hasLinkWithSpace == " link=" || hasBtn == "button=" || hasBtnWithSpace == " button=") {
                                  if (curItem.myHref === "" && hasLink === "link=") {
                                          curItem.myText = curItem.myText.slice(0, -5);
                                          curItem.myHrefType = "link"
                                  } else {
                                          if (curItem.myHref === "" && hasLinkWithSpace === " link=") {
                                                  curItem.myText = curItem.myText.slice(0, -6);
                                                  curItem.myHrefType = "link"
                                          } else {
                                                  if (curItem.myHref === "" && hasBtn === "button=") {
                                                          curItem.myText = curItem.myText.slice(0, -7);
                                                          curItem.myHrefType = "btn"
                                                  } else {
                                                          if (curItem.myHref === "" && hasBtnWithSpace === " button=") {
                                                                  curItem.myText = curItem.myText.slice(0, -8);
                                                                  curItem.myHrefType = "btn"
                                                          }
                                                  }
                                          }
                                  }
                                  curItem.myHref += (data[i])
                          } else {
                                  curItem.myText += (data[i]);
                                  hasLink = t431__checkSubstr("link=", hasLink, data[i]);
                                  hasLinkWithSpace = t431__checkSubstr(" link=", hasLinkWithSpace, data[i]);
                                  hasBtn = t431__checkSubstr("button=", hasBtn, data[i]);
                                  hasBtnWithSpace = t431__checkSubstr(" button=", hasBtnWithSpace, data[i])
                          }
                          endLine = t431__checkSubstr("<br />", endLine, data[i]);
                          if (endLine == "<br />") {
                                  if (curItem.myHref) {
                                          curItem.myHref = curItem.myHref.slice(0, -6)
                                  } else {
                                          curItem.myText = curItem.myText.slice(0, -6)
                                  }
                                  arrayRow.push(curItem);
                                  arrayTable.push(arrayRow);
                                  curItem = {
                                          myText: "",
                                          myHref: ""
                                  };
                                  hasLink = "";
                                  hasLinkWithSpace = "";
                                  hasBtn = "";
                                  hasBtnWithSpace = "";
                                  arrayRow = []
                          }
                  }
          }
          if (arrayRow.length > 0 || curItem.myText !== "") {
                  if (curItem !== "") {
                          arrayRow.push(curItem)
                  }
                  arrayTable.push(arrayRow)
          }
  }
  return arrayTable
}

function t431__checkSubstr(targetSubstr, curSubstr, curSymbol) {
  if (!curSubstr && curSymbol == targetSubstr[0]) {
          return curSymbol
  } else {
          if (curSubstr) {
                  for (var i = 0; i < (targetSubstr.length - 1); i++) {
                          if (curSubstr[curSubstr.length - 1] == targetSubstr[i] && curSymbol == targetSubstr[i + 1]) {
                                  return (curSubstr += curSymbol)
                          }
                  }
          }
  }
}

function t431__addBrTag(oldStringItem) {
  var newStringItem = "";
  for (var i = 0; i < oldStringItem.length; i++) {
          if (oldStringItem[i] == "\n" || oldStringItem[i] == "\r") {
                  newStringItem += "<br />"
          } else {
                  newStringItem += oldStringItem[i]
          }
  }
  return newStringItem.replace(/&nbsp;/g, ' ')
}

function t431_createTable(recid, tablehead, tabledata, tablecolsize, hastargetblank, btnstyles, t431__tdstyles, t431__thstyles, t431__oddrowstyles, t431__evenrowstyles) {
  var t431__arrayColSize = t431_parseData(tablecolsize);
  var t431__arrayHead = t431_parseData(tablehead);
  var t431__arrayData = t431_parseData(tabledata);
  var t431__maxcolnumber = t431__findMaxRowLengthInTable(t431__arrayHead, t431__arrayData);
  var t431__colWidth = t431__setColumnsWidth(t431__arrayColSize, t431__maxcolnumber, recid);
  if (t431__colWidth[0].myText && t431__colWidth[0].myText[t431__colWidth[0].myText.length - 1] == "%") {
          for (var i = 0; i < t431__colWidth.length; i++) {
                  t431__colWidth[i].myText = t431__colWidth[i].myText.slice(0, -1);
                  t431__colWidth[i].myText += "vw"
          }
  }
  var t431__container = document.querySelector('#rec' + recid + ' .t431 .t-container .t431__table');
  var t431__htmlTable = "";
  if (t431__arrayHead) {
          t431__htmlTable += t431__generateHtml(recid, t431__arrayHead, "th", hastargetblank, t431__colWidth, btnstyles, t431__thstyles, null, null, t431__maxcolnumber)
  }
  t431__container.insertAdjacentHTML('afterbegin', t431__htmlTable);
  t431__htmlTable = "";
  if (t431__arrayData) {
          t431__htmlTable += t431__generateHtml(recid, t431__arrayData, "td", hastargetblank, t431__colWidth, btnstyles, t431__tdstyles, t431__oddrowstyles, t431__evenrowstyles, t431__maxcolnumber)
  }
  t431__container.insertAdjacentHTML('afterbegin', t431__htmlTable)
}

function t431__generateHtml(recid, arrayValues, coltag, hastargetblank, colWidth, btnstyles, colstyles, oddrowstyles, evenrowstyles, maxcolnumber) {
  var t431__htmlpart = "";
  if (coltag == "td") {
          var t431__theadorbodytag = "tbody"
  } else {
          var t431__theadorbodytag = "thead"
  }
  t431__htmlpart += '<' + t431__theadorbodytag + ' class="t431__' + t431__theadorbodytag + '">';
  var t431__firstbodyrowstyle = "";
  if (document.querySelector('#rec' + recid + ' .t431 .t-container .t431__thead th').length > 0 && document.querySelector('#rec' + recid + ' .t431 .t-container .t431__thead th').style.borderBottomWidth != '0') {
          t431__firstbodyrowstyle = "border-top: 0 !important;"
  }
  for (var i = 0; i < arrayValues.length; i++) {
          if (coltag == "td") {
                  if ((i + 1) % 2 > 0) {
                          t431__htmlpart += "<tr class=\"t431__oddrow\"" + "style=\"" + oddrowstyles + "\">"
                  } else {
                          t431__htmlpart += "<tr class=\"t431__evenrow\"" + "style=\"" + evenrowstyles + "\">"
                  }
          } else {
                  t431__htmlpart += "<tr>"
          }
          var t431__addingcols = 0;
          if (arrayValues[i].length < maxcolnumber) {
                  t431__addingcols = maxcolnumber - arrayValues[i].length
          }
          for (var j = 0; j < (arrayValues[i].length + t431__addingcols); j++) {
                  if (arrayValues[i][j]) {
                          if (Array.isArray(colWidth) && colWidth[j]) {
                                  var t431__curWidth = colWidth[j].myText
                          } else {
                                  var t431__curWidth = colWidth
                          }
                          if (i == 0 && coltag == "td") {
                                  var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + t431__firstbodyrowstyle + "\">"
                          } else {
                                  var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">"
                          }
                          if (arrayValues[i][j].myHref) {
                                  var t431__tblank = "";
                                  if (hastargetblank) {
                                          var t431__tblank = "target=\"_blank\""
                                  }
                                  if (arrayValues[i][j].myHrefType == "link") {
                                          var t431__linkwithattr = "<a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + ">";
                                          var t431__linkclosetag = "</a>"
                                  } else {
                                          var t431__linkwithattr = "<div class=\"t431__btnwrapper\"><a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + " class=\"t-btn t-btn_sm\" style=\"" + btnstyles + "\"><table style=\"width:100%; height:100%;\"><tr><td>";
                                          var t431__linkclosetag = "</td></tr></table></a></div>"
                                  }
                                  t431__htmlpart += t431__colwithattr + t431__linkwithattr + arrayValues[i][j].myText + t431__linkclosetag + "</" + coltag + ">"
                          } else {
                                  t431__htmlpart += t431__colwithattr + arrayValues[i][j].myText + "</" + coltag + ">"
                          }
                  } else {
                          t431__htmlpart += "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">" + "</" + coltag + ">"
                  }
          }
          t431__htmlpart += "</tr>"
  }
  t431__htmlpart += "</" + t431__theadorbodytag + ">";
  return t431__htmlpart
}