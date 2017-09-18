$(document).ready(function () {

    //Populate div#purchase-history-table
    $.ajax({
        url: 'database/purchase-history.csv',
        dataType: 'text',
        contentType: 'text/plain',
        success: displayPurchaseHistoryList
    });

});

function displayPurchaseHistoryList(data) {

    if (!$.trim(data)) {
        document.getElementById('noPurchasesMessage').innerHTML = 'No Purchases have been made.';
    } else {
        var allRows = data.split(/\r?\n|\r/); //Every new line
        var table = '<table id="purchaseHistoryTable" class="table-hover">'
            + '<thead><tr><th>Date</th><th>Vendor</th><th>Fruit</th><th>Qty.</th><th>Buy Price</th><th>Total</th></tr></thead>'
            + '<tbody>';

        for (var singleRow = 0; singleRow < allRows.length - 1; singleRow++) {

            table += '<tr>';

            var rowCells = allRows[singleRow].split(',');
            for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
                if (rowCell === 0 || rowCell === 1) {
                    table += '<td>';
                    table += rowCells[rowCell].replace(/"/g, '');
                    table += '</td>';
                } else if (rowCell === 2) {
                    var fruitName = rowCells[rowCell];
                    table += '<td>';
                    table += '<img style="vertical-align:middle" src="images/fruit-icons/' + fruitName.toLowerCase() + '.png"> ' + fruitName;
                    table += '</td>';
                } else if (rowCell === 4) {
                    var quantity = rowCells[rowCell];
                    table += '<td class="green-currency">';
                    table += CADCurrencyFormatter.format(rowCells[rowCell]);
                    table += '</td>';
                } else if (rowCell === 5) {
                    var price = rowCells[rowCell];
                    table += '<td class="green-currency bold">';
                    table += CADCurrencyFormatter.format(price);
                    table += '</td>';
                } else {
                    table += '<td>';
                    table += rowCells[rowCell];
                    table += '</td>';
                }
            }

            table += '</tr>';
        }

        table += '</tbody>';
        table += '</table>';

        $('div#purchase-history-table').append(table);
    }

}