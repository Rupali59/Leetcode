function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
 }

class MyMinHeap {
    heap = [];

    leftChild(index) {
        return (index * 2) - 1;
    }

    rightChild(index) {
        return index * 2;
    }

    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    isLeaf(index) {
        return index >= Math.floor(this.heap.length / 2);
    }

    buildHeap(element) {
        if (element.length < 1)
            return;
        while (element) {
            this.heap.push(element.val);
            element = element.next;
        }

        for (var i = Math.floor(this.heap.length / 2); i >= 0; --i)
            this.heapifyBottom(i);
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    heapifyUp(index) {
        if (index > 0)
            return;
        var parentIndex = this.parent(index);
        if (this.heap[index] < this.heap[parentIndex]) {
            swap(index, parentIndex);
            return this.heapifyUp(parentIndex);
        }
    }

    heapifyBottom(index) {
        if (!this.isLeaf(index)) {
            var minIndex = index;
            var leftChild = this.leftChild(index);
            if (leftChild < this.heap.length - 1 && this.heap[leftChild] < this.heap[index])
                minIndex = leftChild;
            var rightChild = this.rightChild(index);
            if (rightChild < this.heap.length - 1 && this.heap[rightChild] < this.heap[minIndex])
                minIndex = rightChild;
            if (index != minIndex) {
                this.swap(minIndex, index);
                this.heapifyBottom(minIndex);
            }
        }
    }

    getMinElement() {
        this.swap(0, this.heap.length - 1);
        var min = this.heap.pop();

        this.heapifyBottom(0);
        return min;
    }
}


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    lists = lists.filter(x => x.length);
    if (lists.length == 0)
        return [];
    return mergeKListsByHeap(lists);
};

var mergeKListsByHeap = function(lists) {
    var minHeap = new MyMinHeap();
    lists = lists.filter(Boolean);

    minHeap.buildHeap(lists[0]);
    for (var i = 1; i < lists.length; ++i)
        minHeap.buildHeap(lists[i]);
    return convertToLL(minHeap.heap);
}


var convertToLL = function(array) {
    var node = new Node();
    if (array.length < 1)
        return node;
    for (var i = array.length - 1; i >= 0; --i) {
        var temp = new Node(array[i]);
        temp.next = node;
        node = temp;
    }
    return node;
}


var printLL = function(LL) {
    var x = [];
    while (LL) {
        x.push(LL.val);
        LL = LL.next;
    }
    console.log(x.join("->"));
}


/*__________________________________________________________________________________________________________________*/
var testcases = [{
        lists: [
            convertToLL([1, 4, 5]),
            convertToLL([1, 3, 4]),
            convertToLL([2, 6])
        ],
        result: convertToLL([1, 1, 2, 3, 4, 4, 5, 6])
    },
    {
        lists: [],
        result: []
    },
    {
        lists: [
            convertToLL([])
        ],
        result: []
    },
]

testcases.map((testcase, index) => {
    /***************************/
    var output = mergeKLists(testcase.lists);
    /***************************/
    status = true;
    showErrorOnly = false;
    var expected = testcase.result;
    var inOrder = true;

    switch (typeof(expected)) {
        case "object":
            {

                if (Array.isArray(expected)) {
                    if (expected.length != output.length) {
                        status = false;
                        break;
                    }
                    if (inOrder) {
                        expected.map((val, i) => {
                            if (output[i] != val)
                                status = false;
                        });
                    } else {
                        var copy_op = JSON.parse(JSON.stringify(output));
                        expected.map(element => {
                            var e_index = copy_op.indexOf(element);
                            if (e_index < 0)
                                status = false;
                            else
                                copy_op.splice(e_index, 1);
                        });
                    }
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
        inputKeys.map(y => {
            input[y] = testcase[y]
        });

        console.log("------------");
        console.log("[" + (status ? "Success" : "Error") + "] Input: " + JSON.stringify(input).slice(0, 1000) + " | Output: " + JSON.stringify(output) + " | Expected: " + JSON.stringify(testcase.result));
        console.log("------------");
    }
})
/*__________________________________________________________________________________________________________________*/