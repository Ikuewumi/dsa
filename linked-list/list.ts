class Linode<T = any> {
    val: T | null
    next: Linode<T> | null
    constructor(val: T, next?: Linode<T>) {
        this.val = val
        this.next = next ?? null
    }

    insert(position: number, newValue: T) {
        this.checkIndex(position)
        let $traverser: Linode<T> = this.head,
            index = 0;

        while (index < position && $traverser.next) {
            $traverser = $traverser.next
            index++
        }

        const newNode = new Linode(newValue)
        newNode.next = $traverser.next
        $traverser.next = newNode

        return this

    }

    insertList(position: number, newList: Linode<T>) {
        this.checkIndex(position)
        let $traverser: Linode<T> = this.head,
            index = 0;

        
        while (index < position && $traverser.next) {
            $traverser = $traverser.next
            index++
        }


        newList.tail.next = $traverser.next
        $traverser.next = newList

        return this
    }


    append(newValue: T) {
        this.tail.next = new Linode(newValue)
        return this
    }

    appendList(newList: Linode<T>) {
        this.tail.next = newList
        return this
    }


    /**
    * Prepends a value, and returns a new List
    */
    prepend(newValue: T) {
        const newList = new Linode(newValue)
        newList.next = this
        return newList
    }

    /**
    * Prepends a list, and returns a new List
    */
    prependList(newList: Linode<T>) {
        newList.next = this
        return newList
    }

    createFromArray(array: T[]) {
        if (array.length <= 0) throw Error("The input array must have atleast one item")
        const list = new Linode(array[0])

        for (let i = 1; i < array.length; i++) {
            list.append(array[i])
        }

        return list
    }



    slice(startPosition: number, endPosition?: number) {
        let start = startPosition,
            end = typeof endPosition === "number" ? endPosition : this.length - 1,
            $pointer: Linode<T> = this.head

        this.checkIndex(start)
        this.checkIndex(end)

        if (start === end) {
            console.warn("Cannot get slice since the start and ends are equal")
            return this
        }


        for (let i = 0; i < start; i++) {
            $pointer = $pointer.next!
        }

        const newList = new Linode<T>(null as T)

        for (let i = start; i <= end; i++) {
            newList.append($pointer.val!)
            $pointer = $pointer.next!
        }

        return newList.next!
    }







    delete(position: number) {
        if (!this.next) return this
        if (position === 0) return this.head.next
        this.checkIndex(position) 
        let $slow: Linode<T> = this.head;

        for ( let i = 0; i < position - 1; i++) {
            $slow = $slow.next!;
        }

        $slow.next = $slow?.next?.next ?? null
        return this

    }

    






    private getTailData() {
        let $traverser: Linode<T> = this.head,
            $length = 1;

        while ($traverser.next) {
            $length++;
            $traverser = $traverser.next;
        }

        return {
            tail: $traverser,
            length: $length
        }


    }

    private checkIndex(index: number): void {
        const isInvalid = index < 0 || index > this.length - 1
        if (isInvalid) throw Error("Invalid")

    }


    // TODO - Find a better way to output an object's properties without the functions
    log() {
        console.log(JSON.parse(JSON.stringify(this)))
    }


    get head() {
        return this
    }

    get rest() {
        return this.next
    }

    get tail() {
        return this.getTailData().tail
    }

    get length() {
        return this.getTailData().length
    }

    get isEmpty() {
        return this === null
    }

    get array() {
        let $traverser: Linode<T> = this.head
        const array: T[] = []


        while ($traverser) {
            array.push($traverser.val!)
            $traverser = $traverser.next!
        }

        return array
    }




}









/* const listOne = new Linode<number>(2)
listOne.append(5)
listOne.append(7)

listOne.log()


const listTwo = new Linode<number>(100)
listTwo.append(600)
listTwo.append(900)

listOne.appendList(listTwo)
listOne.log()
listOne.insert(1, 4000);
listOne.log()
listOne.insert(6, 3);
const listThree = listOne.slice(0, 2)
listThree.log()
listThree.delete(2)
listThree.log() */
