export interface ListNode<T> {
    data: T,
    next: ListNode<T> | null
}

export type Nullable<T> = null | T


export class SLL<T = any> {
    public head: ListNode<T> = null as unknown as ListNode<T>
    public tail: ListNode<T> = null as unknown as ListNode<T>
    public size: number = 0


    toString() {
        let $trav = this.head
        if (this.size <= 1) { return `[ ${$trav?.data ?? ``} ]` }

        let str = `[ `

        while ($trav) {
            str += `${$trav.data}, `
            $trav = $trav.next!
        }

        str = `${str.slice(0, -2)} ]`
        return str
    }

    isEmpty(): boolean {
        return this.size === 0
    }

    private checkIndex(index: number): void {
        const indexIsValid = (index >= 0 && index < this.size)
        if (!indexIsValid) throw Error(
            `invalid operation. Trying to add an element after the index ${index} in a list of ${this.size} items is not possible`
        )
    }

    private createNode(data: T): ListNode<T> {
        return {
            data,
            next: null
        }
    }


    private addFirstElement(data: T) {
        const node = this.createNode(data)
        this.head = this.tail = node
        this.size++

        return this
    }


    addFirst(data: T): SLL<T> {
        if (this.isEmpty()) { return this.addFirstElement(data) }
        else {
            const node = this.createNode(data)
            node.next = this.head
            this.head = node
            this.size++;

            return this
        }
    }


    addLast(data: T): SLL<T> {
        if (this.isEmpty()) { return this.addFirstElement(data) }
        else {
            if (!this.tail) throw Error("invalid list")
            this.tail.next = this.createNode(data)
            this.tail = this.tail.next
            this.size++;
            return this
        }
    }

    add(data: T) {
        return this.addLast(data)
    }

    addAfter(index: number, data: T) {
        if (this.isEmpty()) {
            console.info("List is empty so the first element is created")
            return this.addFirstElement(data)
        }
        this.checkIndex(index)

        let idx = index,
            $trav = this.head!

        while (idx > 0) {
            $trav = $trav.next!
            idx--
        }

        let $temp = $trav.next
        if ($temp) {
            const newNode = this.createNode(data)
            newNode.next = $temp
            $trav.next = newNode
            this.size++
            return this
        } else {
            return this.addLast(data)
        }


    }

    peekFirst() {
        if (this.isEmpty()) throw Error("Cannot view the head of an empty list")
        return this.head!.data
    }

    peekLast() {
        if (this.isEmpty()) throw Error("Cannot view the tail of an empty list")
        return this.tail!.data
    }


    peek(index: number) {
        if (this.isEmpty()) throw Error("cannot view element in an empty list")
        if (index === 0) return this.head?.data

        this.checkIndex(index)
        if (index === this.size - 1) return this.peekLast()
        let idx = index,
            $trav = this.head

        while (idx > 0) {
            $trav = $trav?.next!
            idx--
        }

        return $trav!.data
    }


    removeFirst() {
        if (this.isEmpty()) throw Error("cannot remove from an empty list")
        if (this.size === 1) { return this.removeOnlyElement() }
        const data = this.head.data
        this.head = this.head.next!
        this.size--
        return data
    }

    removeLast() {
        if (this.isEmpty()) throw Error("cannot remove from an empty list")
        if (this.size === 1) { return this.removeOnlyElement() }

        let $trav = this.findPreviousNode((node) => node === this.tail)
        if (!$trav?.next) throw Error("no tail")
        let data = $trav.next.data
        $trav.next = $trav.next.next
        this.tail = $trav
        this.size--

        return data
        
    }

    remove() {
        
    }

    removeOnlyElement() {
        let data = this.head.data
        this.head = null as unknown as ListNode<T>
        this.tail = null as unknown as ListNode<T>
        this.size = 0

        return data

    }

    /** This returns the node previous to the node by the predicate to allow for removing actions since this is a singly linked list
     * Returns null if the node is not found
     */
    private findPreviousNode(predicate: (node: ListNode<T>, list: typeof this) => boolean): Nullable<ListNode<T>> {

        if (this.isEmpty()) throw Error("cannot find element in an empty list")

        let $sentinelList = new SLL<T>()
        $sentinelList.add(null as T)
        $sentinelList.head.next = this.head

        let $trav = $sentinelList.head


        while ($trav.next) {
            const condition = predicate($trav.next!, this)
            if (condition === true) {
                return $trav
            }
        }

        return null

    }


    /** Traverses the List and runs the callback function provided on each item */
    //static traverse<T>(list: SLL<T>, callback: () => any) {
    //
    //}


}



