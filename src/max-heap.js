const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
	}

	get parentNodes() {
		if(!this.root) {
			return [];
		}
		
		let result = [];
		let roots = [this.root];

		while(roots && roots.length > 0) {
			const newRoots = [...roots];
			roots = [];
			for(let i = 0; i < newRoots.length; i++) {
				const currentRoot = newRoots[i];
				if(!(currentRoot.left && currentRoot.right)) {
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
		
	}

	detachRoot() {
		let root = this.root;

		if(!(root.left && root.right)) {
			this.root = null;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
	}

	insertNode(node) {
		if(!this.root){
			this.root = node;
			return;
		}

		let rootsToHandle = [this.root];
		
		while(rootsToHandle && rootsToHandle.length > 0) {
			const roots = [...rootsToHandle];
			rootsToHandle = [];

			for(let i = 0; i < roots.length; i++) {
				const currentRoot = roots[i];
				
				if(!currentRoot.left){
					currentRoot.appendChild(node);
					return;
				} else {
					rootsToHandle.push(currentRoot.left);
				}

				if(!currentRoot.right) {
					currentRoot.appendChild(node);
					return;
				} else {
					rootsToHandle.push(currentRoot.right);
				}
			}
		}
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
