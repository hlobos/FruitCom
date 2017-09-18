<?php

	$purchaseDateTime =  $_POST['purchaseDateTime'];
	$vendorName =  $_POST['vendorName'];
	$fruitName =  $_POST['fruitName'];
	$quantity =  $_POST['quantity'];
	$buyPrice =  $_POST['buyPrice'];
	$total =  $_POST['total'];

	//Append to end of file: database/purchase-history.csv
	$line = array($purchaseDateTime, $vendorName, $fruitName, $quantity, $buyPrice, $total);
	$handle = fopen("database/purchase-history.csv", "a");
	fputcsv($handle, $line);
	fclose($handle);
	
?>