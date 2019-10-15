const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
	}

	get parentNodes() {
		if (!this.root) {
			return [];
		}

		let result = [];
		let roots = [ this.root ];

		while (roots && roots.length > 0) {
			const newRoots = [ ...roots ];
			roots = [];
			for (let i = 0; i < newRoots.length; i++) {
				const currentRoot = newRoots[i];
				if (!(currentRoot.left && currentRoot.right)) {
					result.push(currentRoot);
				}

				currentRoot.left && roots.push(currentRoot.left);
				currentRoot.right && roots.push(currentRoot.right);
			}
		}

		return result;
	}

	push(data, priority) {
		const newNode = new Node(data, priority);

		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if (!this.root) {
			return null;
		}

		const detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);

		return detachedRoot;
		// shiftNodeDown - 1
	}

	detachRoot() {
		const oldRoot = this.root;

		this.shiftNodeDown(oldRoot);

		oldRoot.remove();

		if (oldRoot === this.root) {
			this.root = null;
		}

		return oldRoot;
	}

	restoreRootFromLastInsertedNode(detached) {}

	size() {
		let result = 0;

		// TODO: move to the separated method (traverse method)
		let rootsForHandle = this.isEmpty() ? [] : [ this.root ];

		while (rootsForHandle.length > 0) {
			const roots = [ ...rootsForHandle ];
			rootsForHandle = [];

			for (let i = 0; i < roots.length; i++) {
				result++;

				const currentRoot = roots[i];

				if (currentRoot.left) {
					rootsForHandle.push(currentRoot.left);
				}
				if (currentRoot.right) {
					rootsForHandle.push(currentRoot.right);
				}
			}
		}

		return result;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;

			return;
		}

		let rootsToHandle = [ this.root ];

		while (rootsToHandle.length > 0) {
			const roots = [ ...rootsToHandle ];
			rootsToHandle = [];

			for (let i = 0; i < roots.length; i++) {
				const currentRoot = roots[i];

				if (!currentRoot.left) {
					currentRoot.appendChild(node);
					return;
				} else {
					rootsToHandle.push(currentRoot.left);
				}

				if (!currentRoot.right) {
					currentRoot.appendChild(node);
					return;
				} else {
					rootsToHandle.push(currentRoot.right);
				}
			}
		}
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if (!node) {
			return;
		}

		if (!(node.left || node.right)) {
			return;
		}

		const leftPriority = (node.left && node.left.priority) || 0;
		const rightPriority = (node.right && node.right.priority) || 0;

		const changableNode = leftPriority >= rightPriority ? node.left : node.right;

		if (!node.parent) {
			this.root = changableNode;
		}

		// if(changableNode){
		// 	changableNode.swapWithParent();
		// 	this.shiftNodeDown(node);
		// }

		changableNode.swapWithParent();
			this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
