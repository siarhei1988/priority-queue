class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
		} else {
			if (!this.right) {
				this.right = node;
			}
		}

		node.parent = this;
	}

	removeChild(node) {
		if (!node) {
			return;
		}

		if (this.left !== node && this.right !== node) {
			throw new Error(`The current node does not have the passed node.`);
		}

		if (this.left === node) {
			this.left = null;
		}

		if (this.right === node) {
			this.right = null;
		}

		node.parent = null;
	}

	remove() {
		if (!this.parent) {
			return;
		}

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}

		// save relations for child and parent
		const parentOld = this.parent;
		const childLeft = this.left;
		const childRight = this.right;

		const parentParent = parentOld.parent;
		const parentLeft = parentOld.left;
		const parentRight = parentOld.right;

		if (parentOld.left === this) {
			this.left = parentOld;
			this.right = parentRight;
			parentRight && (parentRight.parent = this);
		} else {
			this.left = parentLeft;
			parentLeft && (parentLeft.parent = this);
			this.right = parentOld;
		}

		this.parent = parentParent;
		parentOld.parent = this;

		parentOld.left = childLeft;
		parentOld.right = childRight;

		if(parentParent && parentParent.left === parentOld){
			parentParent.left = this;
		}

		if(parentParent && parentParent.right === parentOld){
			parentParent.right = this;
		}
	}
}

module.exports = Node;
