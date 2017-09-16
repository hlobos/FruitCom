# FruitCom
The following is a prototype fruit/vendor exchange market system created within a 5-day coding exercise.

## INSTALLATION/NOTES:
- To begin, open (index.html)
- (js/main.js) --> features of FruitCom Market (index.html) page.
- (js/vendor-admin.js) --> features of the Vendor Admin (vendorAdmin.html) pages.
- (js/purchase-history.js) --> features of the Purchase History (purchaseHistory.html) page.
- Within each custom .js file, are 'TODO' notes of uncomplete features and my plans for them.

## LANGUAGES/PACKAGES USED:
- Javascript (For main features)
- Materialize CSS (for front-end styling)
- JQuery 3.2.1 (to suppliment Javascript features)
- Google Icon Font

## ASSIGNMENT USE CASES:

### Market Main Page:
- Displays a listing (database/fruits.csv) of current fruit/vendors open in the market.
- Once a vendor's fruit sells out that row will disappear from the market.
- In order to always see the best price for a fruit, the table has been ordered by the fruit name and then by price

### Client Actions:
- Max number of fruit purchased at one time: Client can purchase one fruit type at a time, per vendor, to the max current quantity available (or less).

### Purchase History:
- Client purchases can be viewed by clicking "Purchase History" in the navigation. This displays a (.csv) list of transactions with the following data per row: timestamp, vendor, fruit, Qty, price, total.

### Vendor Admin:
- Displays a list of fruits which they sell: fruit, quantity, starting price, sell price, market active (shows if the fruit is active in the market)
- Fruit that vendors do not want to sell (but have stock in) will have a button to widthdraw that fruit from the Trade Day.
- Sellers can input fruit prices by uploading a new csv file
- Sellers can update the fruit price, once per minute.

## KNOWN ERRORS:
- Console error: Initial AJAX call for fruits.csv/vendors-....csv for populating tables fails due to "XML Parsing Error: syntax error". It seemed that it does not find the data initially because page hasn't loaded fully. Unable to fully troubleshoot, table loads after DOM items have loaded. 
