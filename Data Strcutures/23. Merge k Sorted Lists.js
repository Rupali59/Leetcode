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
    // return mergeKListsByHeap(lists);
    return mergeKListHeapDS(lists);
    // return mergeKListsMerge(lists);
};


var mergeKListHeapDS = function(lists) {
    var minPriorityQueue = new MinPriorityQueue({ priority: x => x.val });
    for (var i = 0; i < lists.length; ++i) {
        var list = lists[i];
        while (list) {
            minPriorityQueue.enqueue(list);
            list = list.next;
        }
    }

    var result = new ListNode();
    var head = result;
    while (!minPriorityQueue.isEmpty()) {
        const { val, next } = minPriorityQueue.dequeue().element;
        head.next = new ListNode(val);
        head = head.next;
    }
    return result.next;
}

var mergeKListsMerge = function(lists) {
    if (!lists.length)
        return null;
    for (let i = 1; i < lists.length; i++) {
        // Merge each ListNode with the first
        lists[0] = merge(lists[0], lists[i]);
    }

    // Return the merged ListNode
    return lists[0];
}

var merge = function(l1, l2) {
    // If either list is empty, return the other list's node
    if (l1 == null) return l2;
    if (l2 == null) return l1;

    // If l1 is lower
    if (l1.val < l2.val) {
        l1.next = merge(l1.next, l2);
        return l1;
    }
    // If l2 is lower
    else {
        l2.next = merge(l1, l2.next);
        return l2;
    }
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
    var size = array.length - 1;
    var n = size;

    if (n < 1)
        return null;

    var node = new ListNode();
    var current;

    while (n >= 0) {
        var temp = new ListNode(array[size - n]);
        if (!current) {
            current = temp;
            node = current;
        } else {
            current.next = temp;
            current = current.next;
        }
        n--;
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