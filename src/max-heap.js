const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
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
		this.shiftNodeDown(this.root);

		return detachedRoot.data;
	}

	detachRoot() {
		const oldRoot = this.root;
		this.root = null;

		if(!(oldRoot.left && oldRoot.right)){
			this.parentNodes.splice(0, 1);
		}

		return oldRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!detached) {
			return;
		}

		const { left: leftNode, right: rightNode } = detached;
		const lastInsertedNode = this.parentNodes.splice(this.parentNodes.length - 1, 1)[0];

		if(lastInsertedNode){
			if(lastInsertedNode.parent && lastInsertedNode.parent !== detached){
				this.parentNodes.unshift(lastInsertedNode.parent);
			}
		
			lastInsertedNode.remove();
			
			if (leftNode && leftNode !== lastInsertedNode) {
				lastInsertedNode.left = leftNode;
				leftNode.parent = lastInsertedNode;
			}
			if (rightNode && rightNode !== lastInsertedNode) {
				lastInsertedNode.right = rightNode;
				rightNode.parent = lastInsertedNode;
			}

			if(!(lastInsertedNode.left && lastInsertedNode.right)){
				this.parentNodes.unshift(lastInsertedNode);
			}
			
			this.root = lastInsertedNode;
		}
	}

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
		this.parentNodes = [];
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);

			return;
		}

		const handleNodeForParentNodes = (node) => {
			const parent = node.parent;

			const currentIndexInParentNodes = this.parentNodes.indexOf(parent);

			if (parent.left && parent.right) {
				currentIndexInParentNodes > -1 && this.parentNodes.splice(currentIndexInParentNodes, 1);
			}

			this.parentNodes.push(node);
		};

		let rootsToHandle = [ this.root ];

		while (rootsToHandle.length > 0) {
			const roots = [ ...rootsToHandle ];
			rootsToHandle = [];

			for (let i = 0; i < roots.length; i++) {
				const currentRoot = roots[i];

				if (!currentRoot.left) {
					currentRoot.appendChild(node);
					handleNodeForParentNodes(node);
					return;
				} else {
					if (!currentRoot.right) {
						currentRoot.appendChild(node);
						handleNodeForParentNodes(node);
						return;
					} else {
						rootsToHandle.push(currentRoot.left);
						rootsToHandle.push(currentRoot.right);
					}
				}
			}
		}
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}

		const modifyParentNodes = (node, oldParent) => {
			const oldParentIndex = this.parentNodes.indexOf(oldParent);
			const nodeIndex = this.parentNodes.indexOf(node);

			if (oldParentIndex > -1) {
				this.parentNodes.splice(oldParentIndex, 1, node);
			}

			if (nodeIndex > -1) {
				this.parentNodes.splice(nodeIndex, 1, oldParent);
			}
		};
		const parent = node.parent;

		if (parent.priority < node.priority) {
			// Add code to modify this.parentNodes
			const parent = node.parent;
			node.swapWithParent();
			modifyParentNodes(node, parent);
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (!node) {
			return;
		}

		// const modifyParentNodes = (node, oldParent) => {
		// 	const oldParentIndex = this.parentNodes.indexOf(oldParent);
		// 	const nodeIndex = this.parentNodes.indexOf(node);

		// 	if (oldParentIndex > -1) {
		// 		this.parentNodes.splice(oldParentIndex, 1, node);
		// 	}

		// 	if (nodeIndex > -1) {
		// 		this.parentNodes.splice(nodeIndex, 1, oldParent);
		// 	}
		// };

		if (!(node.left || node.right)) {
			return;
		}

		const parent = node.parent;

		const leftPriority = (node.left && node.left.priority) || 0;
		const rightPriority = (node.right && node.right.priority) || 0;

		const changableNode = leftPriority >= rightPriority ? node.left || node.right : node.right || node.left;

		if (!parent) {
			this.root = changableNode;
		}

		changableNode.swapWithParent();
		// modifyParentNodes(node, parent);
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
