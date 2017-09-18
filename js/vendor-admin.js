/*
    Checkmark/XMark Icon Credit: http://www.graphicrating.com/
*/

var vendorId = '';

$(document).ready(function () {

    var params = getUrlSearchParameters();
    vendorId = params.vendor;

    //Populate header span#vendorName
    document.getElementById('vendorName').innerHTML = getSingleVendorName(vendorId);

    //Populate div#vendors-table
    var csvUrl = 'database/vendor-' + vendorId + '.csv';

    $.ajax({
        url: csvUrl,
        dataType: 'text',
        contentType: 'text/plain',
        success: displayTableVendersList
    });

});

function getUrlSearchParameters() {
    var paramString = window.location.search.substr(1);
    return paramString != null && paramString != '' ? transformToAssocArray(paramString) : {};
}

function transformToAssocArray(paramString) {
    var params = {};
    var paramArray = paramString.split('&');

    for (var i = 0; i < paramArray.length; i++) {
        var tempArray = paramArray[i].split('=');
        params[tempArray[0]] = tempArray[1];
    }
    return params;
}

function displayTableVendersList(data) {
    var allRows = data.split(/\r?\n|\r/); //Every new line
    var table = '<table id="vendorFruitTable" class="table-hover">'
        + '<thead><tr><th>Fruit</th><th>Qty.</th><th>Starting Price</th><th>Sell Price</th><th>Market Active</th></tr></thead>'
        + '<tbody>';

    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {

        table += '<tr>';

        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (rowCell === 0) {
                var fruitName = rowCells[rowCell];
                table += '<td title="' + fruitName + '">';
                table += '<img style="vertical-align:middle" src="images/fruit-icons/' + fruitName.toLowerCase() + '.png"> ' + fruitName;
                table += '</td>';
            } else if (rowCell === 1) {
                var quantity = rowCells[rowCell];
                table += '<td title="' + quantity + '">';
                table += quantity;
                table += '</td>';
            } else if (rowCell === 2 || rowCell === 3) {
                var price = rowCells[rowCell];
                table += '<td class="green-currency">';
                table += CADCurrencyFormatter.format(price);
                table += '</td>';
            } else if (rowCell === 4) {
                var isFruitMarketActive = rowCells[rowCell];
                table += '<td title="' + isFruitMarketActive + '">';
                table += '<img style="vertical-align:middle" src="images/vendor-icons/active-' + isFruitMarketActive.toLowerCase() + '.png">';
                table += '<a id="edit-button" onclick="setActiveMarketModalInformation(this)" class="waves-effect waves-light modal-trigger btn" href="#activeMarketModal"><i class="material-icons edit-icon-adjust">edit</i>Edit</a></td>';
                table += '</td>';
            }
        }

        table += '</tr>';
    }

    table += '</tbody>';
    table += '</table>';

    $('div#vendors-table').append(table);
}

function setActiveMarketModalInformation(element) {
    var rowIndex = getRowIndex(element);

    if (rowIndex != null) {
        var activeMarketTable = document.getElementById('vendorFruitTable');

        var cellFruitName = activeMarketTable.rows[rowIndex].cells[0].getAttribute('title');
        var cellQuantity = activeMarketTable.rows[rowIndex].cells[1].getAttribute('title');
        var cellIsFruitMarketActive = activeMarketTable.rows[rowIndex].cells[4].getAttribute('title');
        
        document.getElementById('activeMarketModalFruitImgSrc').src = 'images/fruit-icons/' + cellFruitName.toLowerCase() + '.png';
        document.getElementById('activeMarketModalFruitLabel').innerHTML = cellFruitName;
        document.getElementById('activeMarketModalQuantityLabel').innerHTML = cellQuantity;
        document.getElementById('activeMarketModalStatusImgSrc').src = 'images/vendor-icons/active-' + cellIsFruitMarketActive.toLowerCase() + '.png';
        document.getElementById('activeMarketModalStatusLabel').innerHTML = eval(cellIsFruitMarketActive) ? 'Active' : 'In-Active' ;
    }
}

function downloadCsv() {
    window.location = 'database/vendor-' + vendorId + '.csv';
}

//TODO: Sellers can input fruit prices by uploading a new csv file.
//-When form is submitted through the UploadCsv form, replace the contents of the proper 'vendors-....csv', refresh page to display new price(s)
function uploadNewFruitPrice(form){
    alert('Sorry, this feature is not available!');

    //create a global variable to keep track of last successful upload time
    //hasAnUploadOccuredWithinAMinute(lastUploadTime)
}

//TODO: Sellers can update the fruit price, once per minute.
//-If upload is within a minute of the lastUploadTime, return true
function hasAnUploadOccuredWithinAMinute(lastUploadTime) {
    return false;
}

//TODO: Functionality for the "Active Market" column
//-Case: Fruit that vendors do not want to sell (but have stock in) will have a button to widthdraw that fruit from the Trade Day.
//-When user presses 'YES' in the Edit modal, the true/false switches it's current state, the proper 'vendors-....csv' file is updated.
function activeMarketModalChangeStatus() {
    alert('Sorry, this feature is not available!');
}
