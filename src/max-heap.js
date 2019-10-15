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
		if(!this.root){
			return null;
		}

		// detachRoot - 1
		// restoreRootFromLastInsertedNode - 1
		// shiftNodeDown - 1
	}

	detachRoot() {
		const parentNodes = this.parentNodes;

		if (parentNodes && parentNodes.length > 0) {
			const node = parentNodes[parentNodes.length - 1];
			const parent = node.parent;

			if (parent) {
				if (parent.left === node) {
					parent.left = null;
				} else {
					parent.right = null;
				}

				node.parent = null;
			} else {
				this.root = null;
			}

			return node;
		} else {
			return null;
		}
	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {}

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

		while (rootsToHandle && rootsToHandle.length > 0) {
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
		if(!node.parent){
			this.root = node;
			return;
		}

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if(!node || !node.left){
			return;
		}

		const leftNode = node.left;

		if(!node.parent){
			this.root = leftNode;
		}

		leftNode.swapWithParent();

		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
