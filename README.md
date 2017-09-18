# FruitCom
The following is a prototype fruit/vendor exchange market system created within a 5-day coding exercise.

## INSTALLATION:
- I have added a two files from QuickPHP (QuickPHP.exe & php5ts.dll) so that you may easily locally run the php needed for the purchase/purchase history functions.
- Please run (QuickPHP.exe) > change the 'Root Folder' to where you have downloaded the FruitCom project > click 'Start'.
- Navigate in your browser to: http://127.0.0.1:5723
- The FruitCom Market page should be visible.

## Main Code Sources:
- (js/main.js) --> features of FruitCom Market (index.html) page.
- (js/vendor-admin.js) --> features of the Vendor Admin (vendorAdmin.html) pages.
- (js/purchase-history.js) --> features of the Purchase History (purchaseHistory.html) page.
- (purchase.php) --> A POST page that recieves details of a purchase to write to a .csv file for the purchaseHistory.html page.
- Within each custom .js file, are 'TODO' notes of uncomplete features and my plans for them.

## LANGUAGES/PACKAGES USED:
- Javascript (For main features)
- Materialize CSS (for front-end styling)
- JQuery 3.2.1 (to suppliment Javascript features)
- Google Icon Font (for main font)
- QuickPHP (to locally run PHP): http://zachsaw.com/?pg=quickphp_php_tester_debugger
- QuickPHP Guide: http://www.zachsaw.com/forum/viewtopic.php?f=11&t=63

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
- PurchaseHistory.html: On initial loading of the page, after a purchase, the table does not show, there seems to be a time delay when the purchase function is written to the purchase-history.csv, refreshing the page should display the results.
- Purchase modal: On some occasions, when entering a permissible quantity and pressing enter right away with the keyboard, this will close the modal. The modal has been set so it only closes if the user presses 'Cancel', or so it should have. This does not record a purchase.
