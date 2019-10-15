const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		this.heap.push(data, priority);
	}

	shift() {
		return this.heap.pop();
	}

	size() {
		// TODO: add implementation
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
