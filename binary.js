'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  get(key) {
    if (this.key == key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.get(key);
    }
    else if (key > this.key && this.right) {
      return this.right.get(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

const keyValue = (str) => {
  let arrayOfWords = [];
  for(let i = 0; i < str.length; i++) {
    arrayOfWords.push([str[i], str.charCodeAt(i)]);
  }
  return arrayOfWords;
};

// console.log(keyValue('EASYQUESTION'));
//arr = 
// [ [ 'E', 69 ],
//   [ 'A', 65 ],
//   [ 'S', 83 ],
//   [ 'Y', 89 ],
//   [ 'Q', 81 ],
//   [ 'U', 85 ],
//   [ 'E', 69 ],
//   [ 'S', 83 ],
//   [ 'T', 84 ],
//   [ 'I', 73 ],
//   [ 'O', 79 ],
//   [ 'N', 78 ] ]

const easyQuestion = (arr) => {
  let tree = new BinarySearchTree();

  for(let i = 0; i < arr.length; i++) {
    tree.insert(arr[i][1], arr[i][0]);
  }

  return tree;
};

console.log(easyQuestion(keyValue('EASYQUESTION')));

