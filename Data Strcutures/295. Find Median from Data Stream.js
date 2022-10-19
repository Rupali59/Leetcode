var MedianFinder = function() {
    this.maxQueue = new MaxPriorityQueue();
    this.minQueue = new MinPriorityQueue();
    this.numElements = 0;
    this.median = 0;
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if (num < this.median)
        this.maxQueue.enqueue(num);

    if (num >= this.median)
        this.minQueue.enqueue(num);

    this.numElements++;
    this.balance();
    this.median = this.findMedian();
};


/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    var maxElement = this.maxQueue.front().element;
    if (!this.minQueue.isEmpty())
        var minElement = this.minQueue.front().element;
    this.median = (this.numElements % 2 == 1) ? maxElement : ((maxElement + minElement) / 2);
    return this.median;
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */


/** 
 * @param {void}
 * @return {void}
 */
MedianFinder.prototype.balance = function(num) {
    var maxQueueLength = this.maxQueue.size();
    var minQueueLength = this.minQueue.size();
    var expectedMaxQueueLength = Math.ceil(this.numElements / 2);
    var expectedMinQueueLength = Math.floor(this.numElements / 2);

    var numSwaps = 0;
    if (maxQueueLength > expectedMaxQueueLength) {
        numSwaps = maxQueueLength - expectedMaxQueueLength;
        this.swap(numSwaps, this.maxQueue, this.minQueue);
    }
    if (minQueueLength > expectedMinQueueLength) {
        numSwaps = minQueueLength - expectedMinQueueLength;
        this.swap(numSwaps, this.minQueue, this.maxQueue);
    }
};

/** 
 * @param {void}
 * @return {void}
 */
MedianFinder.prototype.swap = function(numSwaps, q1, q2) {
    for (var i = 0; i < numSwaps; ++i) {
        var element = q1.dequeue().element;
        q2.enqueue(element);
    }
};