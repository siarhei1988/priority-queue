const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		const size = this.size();

		if (size === this.maxSize) {
			throw new Error('The push operation is not allowed due to max size restriction.');
		}

		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.isEmpty()) {
			throw new Error('The queue is empty.');
		}

		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
