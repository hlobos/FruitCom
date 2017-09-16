/*
Credit: Fruit Icons
    Fruits:https://www.iconfinder.com/aomam.ss
    Pineapple: https://www.iconfinder.com/zapolzun
    Cranberry: https://www.iconfinder.com/oviyan
*/

var vendorList = [
    { id: "bigshinyfruits", vendorName: "Big Shiny Fruits" },
    { id: "cahillesnutriciousmunchies", vendorName: "Cahille's Nutricious Munchies" },
    { id: "daiquiriinc", vendorName: "Daiquiri Inc." },
    { id: "keatonnesstand", vendorName: "Kea Tonnes Stand" },
    { id: "sunnysidecorp", vendorName: "Sunny Side Corp" }
];

var CADCurrencyFormatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
});

$(document).ready(function() {

    populateVendorAdminSideNavLinks();

    //Populate div#fruits-vendors-table
    $.ajax({
        url: 'database/fruits.csv',
        dataType: 'text',
        contentType: 'text/plain',
        success: displayTableFruitVendersList
    });

    //Initiate Modals
    $('.modal').modal();

    $('#purchaseModal').modal({
        ready: function (modal) {
            setFruitVendorModalInformation();
        }
    });

});

function displayTableFruitVendersList(data) {
    var allRows = data.split(/\r?\n|\r/); //Every new line
    var table = '<table id="fruitMarketTable" class="table-hover">'
        + '<thead><tr><th>Vendor</th><th>Fruit</th><th>Qty.</th><th>Price</th><th></th></tr></thead>'
        + '<tbody>';

    for (var singleRow = 0; singleRow < allRows.length - 1; singleRow++) {
       
        table += '<tr>';
        
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (rowCell === 0) {
                var vendorName = rowCells[rowCell];
                table += '<td title="' + vendorName + '">';
                table += rowCells[rowCell];
                table += '</td>';
            } else if (rowCell === 1) {
                var fruitName = rowCells[rowCell];
                table += '<td title="' + fruitName + '">';
                table += '<img style="vertical-align:middle" src="images/fruit-icons/' + fruitName.toLowerCase() + '.png"> ' + fruitName;
                table += '</td>';
            } else if (rowCell === 2) {
                var quantity = rowCells[rowCell];
                table += '<td title="' + quantity + '">';
                table += rowCells[rowCell];
                table += '</td>';
            } else if (rowCell === 3) {
                var price = rowCells[rowCell];
                table += '<td title="' + price + '" class="green-currency">';
                table += CADCurrencyFormatter.format(price);
                table += '</td>';
            } else {
                table += '<td>';
                table += rowCells[rowCell];
                table += '</td>';
            }
        }

        table += '<td><a class="waves-effect waves-light modal-trigger btn" href="#purchaseModal"><i class="material-icons left">add_shopping_cart</i>Purchase</a></td>';
        table += '<td><button class="btnSelect" onclick="getId(this)">Select</button></td>';
        table += '</tr>';
    }

    table += '</tbody>';
    table += '</table>';

    $("div#fruits-vendors-table").append(table);
}

function populateVendorAdminSideNavLinks() {
    
    for (i in vendorList) {
        for (key in vendorList[i]) {

            if (key === "id") {
                var vendorId = vendorList[i][key];
            } 
            else if (key === "vendorName") {
                var vendorName = vendorList[i][key];
            }
        }

        var newNavLink = '<li class="side-nav-underline"><a href="vendorAdmin.html?vendor=' + vendorId + '" target="_parent">' + vendorName + '</a></li>';
        $("li#vendor-admin-subheader").append(newNavLink);
    }
}

function getSingleVendorName(vendorId) {
    for (i in vendorList) {
        for (key in vendorList[i]) {
            if (key === "id" && vendorList[i][key] === vendorId) {
                var vendorName = vendorList[i]["vendorName"];
                break;
            }
        }
    }
    return vendorName;
}

function setFruitVendorModalInformation() {
    console.log("hi");
}


function getId(element) {
    var row = element.parentNode.parentNode.rowIndex;
    var fruitMarketTable = document.getElementById("fruitMarketTable");
    var cellVendorName = fruitMarketTable.rows[row].cells[0].getAttribute('title');
    var cellFruitName = fruitMarketTable.rows[row].cells[1].getAttribute('title');
    var cellQuantity = fruitMarketTable.rows[row].cells[2].getAttribute('title');
    var cellPrice = fruitMarketTable.rows[row].cells[3].getAttribute('title');

    alert(cellVendorName + cellFruitName + cellQuantity + cellPrice);
}
//TODO: Max number of fruit purchased at one time
//-Client can purchase one fruit type at a time, per vendor, to the max current quantity available (or less).
//-Set the form > input > #input-quantity > max attribute in the modal from the data row of the existing table

//TODO: Once a vendor's fruit sells out that row will disappear from the market.
//-Remove the row from the fruits.csv, reupload the page

//TODO: In order to always see the best price for a fruit, the table has been ordered by the fruit name and then by price
//-Use Javascript to reorder the table columns by fruitName, then by price