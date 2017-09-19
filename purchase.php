<?php

	$purchaseDateTime =  $_POST['purchaseDateTime'];
	$vendorName =  $_POST['vendorName'];
	$fruitName =  $_POST['fruitName'];
	$quantityPurchased =  $_POST['quantityPurchased'];
	$newQuantityAvailable =  $_POST['newQuantityAvailable'];
	$buyPrice =  $_POST['buyPrice'];
	$total =  $_POST['total'];

  $vendorName = stripslashes($vendorName);
   
	/* --- Append purchase history info to end of file: database/purchase-history.csv --- */
	$line = array($purchaseDateTime, $vendorName, $fruitName, $quantityPurchased, $buyPrice, $total);
	$handle = fopen("database/purchase-history.csv", "a");
	fputcsv($handle, $line);
	fclose($handle);
	
  /* --- Update fruit.csv with new quantity information --- */
	$dir = "database/fruits.csv";

	//vendor,fruit as key
	$key = $vendorName . "," . $fruitName; 

	//New line with quantity changed
	$new_line = $vendorName . "," . $fruitName . "," . $newQuantityAvailable . "," . $buyPrice . "\n";

	$contents = file_get_contents($dir);

	$new_contents = "";

	if(strpos($contents, $key) !== false) {
	  $contents_array = preg_split("/\\r\\n|\\r|\\n/", $contents);
	  
	  foreach ($contents_array as &$record) {   
		  if (strpos($record, $key) !== false) {
        //If newAvailableQuantity is zero, do not add the line into the new content
        if ($newQuantityAvailable != 0) {
          $new_contents .= $new_line;
        }
		  } else {
			  if($record !== '') {
				$new_contents .= $record . "\n";
			  }
		  }
	  }
	}

	// Save the new records to file
	file_put_contents($dir, $new_contents);
  
	/* --- Update vendor-....csv with new quantity information --- */

?>