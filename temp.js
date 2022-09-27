function productArray(arr)
	{	
		var n =arr.length;

		var prod = Array(n).fill(1);
		for (var i = 1; i < n; i++) {
			prod[i] = prod[i-1]*arr[i-1];
		}
		console.log(arr);
		console.log(prod);

		/* Initialize temp to 1 for
		product on right side */
		temp = 1;

		/*
		In this loop, temp variable contains
		product of elements on right side
		excluding arr[i]
		*/
		var prod2 = JSON.parse(JSON.stringify(prod));

		for (i = n - 1; i >= 0; i--) {
			prod[i] *= temp;
			temp *= arr[i];
			console.log([prod, temp]);
		}
		console.log(prod)

		for (i = n - 2; i >= 0; i--) {
			prod2[i] = prod2[i+1] *arr[i+1];
		}

		/* print the constructed prod array */
			console.log(prod2)

		return prod;
	}

	/* Driver program to test above functions */
	
		
		var arr = [ 1,2,3,4];
		console.log("The product array is : "+productArray(arr));
