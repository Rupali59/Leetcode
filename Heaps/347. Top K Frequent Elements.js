class Node {
    constructor(value, frequency) {
        this.value = value;
        this.frequency = frequency ? frequency : 1;
    }
}

class MaxHeap {
    heap = [];

    // index of the parent node
    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // index of the left child node
    leftChild(index) {
        return (index * 2) + 1;
    }

    // index of the right child node
    rightChild(index) {
        return (index * 2) + 2;
    }

    isLeaf(index) {
        return (index >= Math.floor(this.heap.length / 2)) && (index <= (this.heap.length - 1));
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    getMaxElement() {
        if (this.heap.length < 1)
            throw Exception("Heap is empty");

        // get max and last element
        const max = this.heap[0];
        const end = this.heap.pop();
        // reassign first element to the last element
        this.heap[0] = end;
        // heapify down until element is back in its correct position
        this.heapifyBottom(0);
        // return the max
        return max.value;
    }

    heapifyUp(index) {
        var currentIndex = index;
        var parent = this.parent(currentIndex);

        while (currentIndex > 0 && parent >= 0 && this.heap[currentIndex].frequency > this.heap[parent].frequency) {
            this.swap(currentIndex, parent);
            currentIndex = parent;
            parent = this.parent(currentIndex);
        }
    }


    heapifyBottom(index) {
        if (!this.isLeaf(index)) {
            var maxIndex = index;
            var lChild = this.leftChild(index);
            if (this.heap[maxIndex].frequency <= this.heap[lChild].frequency)
                maxIndex = lChild;
            var rChild = this.rightChild(index);
            if (this.heap[rChild] && this.heap[maxIndex].frequency < this.heap[rChild].frequency)
                maxIndex = rChild;
            if (maxIndex != index) {
                this.swap(maxIndex, index);
                this.heapifyBottom(maxIndex);
            }

        }
    }

    buildHeap(frequencyMap) {

        frequencyMap.forEach((value, key, map) => {
            var node = new Node(key, value);
            this.heap.push(node);

        });

        for (var i = Math.floor(this.heap.length/2); i >=0 ; --i) {
            this.heapifyBottom(i);
        }
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var frequencyMap = new Map();
    nums.map(x => {
        var existingValue = frequencyMap.get(x) ? frequencyMap.get(x) : 0;
        frequencyMap.set(x, existingValue + 1);
    });
    var heap = new MaxHeap();
    heap.buildHeap(frequencyMap);

    var result = new Array(k);
    for (var i = 0; i < k; ++i)
        result[i] = heap.getMaxElement();
    return result;
};


/*__________________________________________________________________________________________________________________*/
var testcases = [
    // { nums: [1, 1, 1, 2, 2, 3], k: 2, result: [1, 2] },
    // { nums: [1], k: 1, result: [1] },
    {
        nums: [-5, -9, 67, -10, 4, -57, 47, 13, -67, -26, -57, 63, 38, -68, 62, -45, -37, 95, 49, -91, -53, -42, -33, 80, 78, -30, -36, 22, 9, -86, 79, -1, 44, -92, 30, -68, -94, 58, -51, -26, -38, 5, -74, 25, 71, -93, 52, -12, -86, 7, -86, 53, 78, -31, -5, -87, 88, -98, -39, 9, 99, 23, 96, -90, 51, -64, 35, -73, 9, 60, -78, 70, 99, 14, 70, 71, -78, 50, 7, 46, -89, 57, -1, 87, -87, -95, 48, 49, 79, -54, 31, 28, -27, 75, 31, -76, -12, 35, 40, -90, -60, -60, -7, 67, 73, -34, -42, -35, 61, 51, 18, 95, 16, 78, -81, -91, -30, 92, 57, -79, 5, 41, 29, 72, -62, -47, 80, 29, 1, -21, -36, 5, 82, 4, -12, -52, -56, -47, -68, 95, 85, -87, -7, -12, 98, 75, -64, -93, 11, 73, -81, -9, -12, -9, 51, 17, -94, 33, -9, 57, -35, 10, -17, 87, -18, -55, -52, 30, -62, 73, 35, -74, -47, -63, 77, -72, -55, 5, 73, 21, 14, 7, -65, -51, -55, -49, 98, -20, -22, -68, 34, -20, 92, 55, 47, -20, 6, -54, -12, 3, 75, 69, 60, 15, 88, 64, 2, -27, -50, 55, 73, 46, -15, -64, 93, -47, -75, -55, -75, 21, -57, 91, -12, -99, -68, -56, -14, -4, -77, -94, 55, 93, -31, 68, -12, -23, 59, -56, -86, 43, 83, -93, -78, -11, -7, 96, -3, -87, -37, 19, -78, 67, -29, 77, -28, 91, -73, -68, -22, 18, -7, 3, 15, 77, 99, 31, -48, -86, -45, -82, 52, -39, 8, -88, -83, -58, -77, 5, 87, -61, 50, 32, -66, -36, 60, -53, 52, 70, -36, -1, 83, -56, 33, 98, -80, 28, 1, -21, -50, -60, 44, 99, 18, 83, -29, 83, -36, -55, -6, 96, -60, 61, 75, 6, -57, 2, 82, 62, -27, 36, 60, 72, 92, 61, -65, 79, -57, -34, -23, -28, -55, 53, 36, -80, 5, -76, 64, -81, -32, -43, -1, 50, -16, -72, -74, 22, 88, 28, -79, -99, 85, -13, -34, -76, 85, 6, 21, -99, 10, -46, 79, 11, -70, 17, 47, -22, -62, 0, 6, 75, -19, 57, -25, -52, -83, 90, 21, 95, 52, 68, 47, -12, 76, -9, -65, 86, 90, 16, 74, 64, 26, 84, 64, -42, 97, -72, 53, -76, 11, 89, -62, 67, 100, 15, 53, 68, -16, 24, 11, -77, 20, 59, -95, -50, -20, 27, 45, 94, 13, -93, 86, 49, 12, 19, 17, -33, -52, -28, 71, 79, -19, -73, 40, -99, 83, 77, 19, -20, 98, 86, -5, -5, 73, 18, 100, 73, -45, 33, 3, 89, 32, -53, 73, 16, -3, -26, -80, 49, -78, 67, 31, 1, -85, -44, -91, -68, 75, -74, 95, 23, 89, 99, -84, 54, -93, 68, 0, -41, 66, -15, -27, -23, -9, -68, 37, 45, -69, 57, 80, 10, -64, 35, 26, 55, -67, 31, -76, 36, -99, 21],
        k: 7,
        result: [-12, -68, 73, -55, -9, 5, 75]
    }
]

testcases.map((testcase, index) => {
    /***************************/
    var output = topKFrequent(testcase.nums, testcase.k);
    /***************************/
    status = true;
    showErrorOnly = false;
    var expected = testcase.result;
    switch (typeof(expected)) {
        case "object":
            {

                if (Array.isArray(expected)) {
                    expected.map((val, i) => {
                        if (output[i] != val)
                            status = false;
                    });
                }
                break;
            }
        default:
            if (output != expected)
                status = false;
    }

    if ((showErrorOnly && !status) || !showErrorOnly) {

        var inputKeys = Object.keys(testcase);
        inputKeys.splice(inputKeys.indexOf("result"));
        var input = {};
        inputKeys.map(y => { input[y] = testcase[y] });

        console.log("------------");
        console.log("[" + (status ? "Success" : "Error") + "] Input: " + JSON.stringify(input).slice(0, 100) + " | Output: " + JSON.stringify(output) + " | Expected: " + JSON.stringify(testcase.result));
        console.log("------------");
    }
})
/*__________________________________________________________________________________________________________________*/