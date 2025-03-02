import { deepEquals } from "./deepEquals"

export class Node<T> {
  data: T
  next: Node<T> | null
  constructor(data: T) {
    this.data = data
    this.next = null
  }
}

export class LinkedList<T> {
  head: Node<T> | null
  length: number

  constructor(...nodes: Node<T>[]) {
    this.length = 0
    this.head = null
    if (nodes.length > 0) {
      nodes.forEach((n) => this.appendNode(n))
    }
  }

  /**
   * Adds a node to the beginning of the list.
   */
  prependNode(node: Node<T>): LinkedList<T> {
    node.next = this.head
    this.head = node
    this.length++

    return this
  }

  /** 
   * Adds a node to the end of the list.
   */
  appendNode(node: Node<T>): LinkedList<T> {
    let current = this.head

    if (current === null) {
      this.head = node
    } else {
      while (current.next !== null) {
        current = current.next
      }
      current.next = node
    }
    this.length++

    return this
  }

  /**
   * Finds a node with the given data.
   * Throws an error if the node is not found.
   */
  findNode(data: T): Node<T> {
    let currNode = this.head

    while (currNode !== null) {
      if (
        currNode.data === data ||
        (typeof currNode.data === "object" && deepEquals(currNode.data, data))
      ) {
        return currNode
      }

      currNode = currNode.next
    }
    throw new Error("Node not found")
  }

  /**
   * Finds a node at a specific index.
   * Throws an error if the index is out of bounds.
   */
  findNodeAt(index: number): Node<T> {
    if (index >= this.length || index < 0 || this.head === null) {
      throw new Error("Index out of bounds")
    }

    if (index === 0) {
      return this.head
    }

    let currNode = this.head

    for (let i = 0; i < index && currNode.next !== null; i++) {
      currNode = currNode.next
    }
    return currNode
  }


  /**
   * Deletes the node at the given index.
   * Throws an error if the node is not found.
   */
  deleteNode(index: number): LinkedList<T> {
    if (index >= this.length || index < 0 || this.head === null) {
      throw new Error("Index out of bounds")
    }
    if (index === 0) {
      this.head = this.head.next
    } else {
      let previousNode = this.findNodeAt(index - 1)
      let nodeToDelete = previousNode.next!
      previousNode.next = nodeToDelete.next
    }
    this.length--
    return this
  }

  
}
