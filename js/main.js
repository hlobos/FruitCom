/*
Credit: Fruit Icons
    Fruits:https://www.iconfinder.com/aomam.ss
    Pineapple: https://www.iconfinder.com/zapolzun
    Cranberry: https://www.iconfinder.com/oviyan
*/

//var onChangeQuantityInput;

var vendorList = [
    { id: 'bigshinyfruits', vendorName: 'Big Shiny Fruits' },
    { id: 'cahillesnutriciousmunchies', vendorName: 'Cahille\'s Nutricious Munchies' },
    { id: 'daiquiriinc', vendorName: 'Daiquiri Inc.' },
    { id: 'keatonnesstand', vendorName: 'Kea Tonnes Stand' },
    { id: 'sunnysidecorp', vendorName: 'Sunny Side Corp' }
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

    //Initiate Modal
    $('.modal').modal();

    $('#purchaseModal').modal({
        dismissible: false,
        ready: function (modal) {
            setFruitVendorModalInformation();
        },
        complete: function () {
            //Reset input#input-quantity and Total
            document.getElementById('input-quantity').value = '';
            document.getElementById('purchaseModalTotalPrice').innerHTML = '';
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

        table += '<td><a onclick="setFruitVendorModalInformation(this)" class="waves-effect waves-light modal-trigger btn" href="#purchaseModal"><i class="material-icons left">add_shopping_cart</i>Purchase</a></td>';
        table += '</tr>';
    }

    table += '</tbody>';
    table += '</table>';

    $('div#fruits-vendors-table').append(table);
}

function populateVendorAdminSideNavLinks() {
    
    for (i in vendorList) {
        for (key in vendorList[i]) {

            if (key === 'id') {
                var vendorId = vendorList[i][key];
            } 
            else if (key === 'vendorName') {
                var vendorName = vendorList[i][key];
            }
        }

        var newNavLink = '<li class="side-nav-underline"><a href="vendorAdmin.html?vendor=' + vendorId + '" target="_parent">' + vendorName + '</a></li>';
        $('li#vendor-admin-subheader').append(newNavLink);
    }
}

function getSingleVendorName(vendorId) {
    for (i in vendorList) {
        for (key in vendorList[i]) {
            if (key === 'id' && vendorList[i][key] === vendorId) {
                var vendorName = vendorList[i]['vendorName'];
                break;
            }
        }
    }
    return vendorName;
}

function getRowIndex(element) {
    return element.parentNode.parentNode.rowIndex;
}

function setFruitVendorModalInformation(element) {
    var rowIndex = getRowIndex(element);

    if (rowIndex != null) {
        var fruitMarketTable = document.getElementById('fruitMarketTable');

        var cellVendorName = fruitMarketTable.rows[rowIndex].cells[0].getAttribute('title');
        var cellFruitName = fruitMarketTable.rows[rowIndex].cells[1].getAttribute('title');
        var cellQuantity = fruitMarketTable.rows[rowIndex].cells[2].getAttribute('title');
        var cellPrice = fruitMarketTable.rows[rowIndex].cells[3].getAttribute('title');

        document.getElementById('purchaseModalSubheader').innerHTML = cellVendorName;
        document.getElementById('purchaseModalSubheader').setAttribute('title', cellVendorName);

        document.getElementById('purchaseModalFruitLabel').innerHTML = cellFruitName;
        document.getElementById('purchaseModalFruitLabel').setAttribute('title', cellFruitName);

        document.getElementById('purchaseModalImgSrc').src = 'images/fruit-icons/' + cellFruitName.toLowerCase() + '.png';

        document.getElementById('purchaseModalQuantityLabel').innerHTML = cellQuantity;

        document.getElementById('purchaseModalPriceLabel').innerHTML = CADCurrencyFormatter.format(cellPrice);
        document.getElementById('purchaseModalPriceLabel').setAttribute('title', cellPrice);

        //Set input max purchase quantity
        document.getElementById('input-quantity').max = cellQuantity;
    }
}

function calculateTotal() {
    var total = 0;
    var numberInputElement = document.getElementById('input-quantity');

    var quantitySelected = numberInputElement.value;
    var fruitPrice = document.getElementById('purchaseModalPriceLabel').getAttribute('title');

    if (Number(quantitySelected) <= Number(numberInputElement.getAttribute('max'))) {
        total = quantitySelected * fruitPrice;     
    } else {
        numberInputElement.value = '';
    }

    document.getElementById('purchaseModalTotalPrice').innerHTML = CADCurrencyFormatter.format(total);
}
 
function makePurchase() {

    var purchaseDateTime = new Date().toLocaleString(); //Form: "DD/MM/YYYY, H:MM:SS AM"
    var vendorName = document.getElementById('purchaseModalSubheader').getAttribute('title');
    var fruitName = document.getElementById('purchaseModalFruitLabel').getAttribute('title');
    var quantityPurchased = document.getElementById('input-quantity').value;
    var oldQuantity = document.getElementById('input-quantity').getAttribute('max');
    var newQuantityAvailable = oldQuantity -  quantityPurchased;
    var buyPrice = document.getElementById('purchaseModalPriceLabel').getAttribute('title');

    if (quantityPurchased === '') {
        alert('A Quantity must be selected to purchase.');
    } else {
        passPurchaseValuesToPurchasePHP(purchaseDateTime.replace(/,/g, ''), vendorName, fruitName, quantityPurchased, newQuantityAvailable, buyPrice, (quantityPurchased * buyPrice));
    }
    
    window.location.reload(true);
}

function passPurchaseValuesToPurchasePHP(purchaseDateTime, vendorName, fruitName, quantityPurchased, newQuantityAvailable, buyPrice, total) {
    var data = {
        purchaseDateTime: purchaseDateTime,
        vendorName: vendorName,
        fruitName: fruitName,
        quantityPurchased: quantityPurchased,
        newQuantityAvailable: newQuantityAvailable,
        buyPrice: buyPrice,
        total: total
    };
    
    $.post('purchase.php', data);

    alert('Purchase recorded in Purchase History page.');
}

//TODO: In order to always see the best price for a fruit, the table should be ordered by the fruit name and then by price
//-Use Javascript to reorder the table columns by fruitName, then by price
function sortFruitMarketTableByFruitNameAndPrice() {

}