import { beforeEach, describe, expect, test } from "bun:test"
import { type ListNode, type Nullable, SLL } from "./sll"

describe("The Singly Linked List", () => {
    let list: SLL<number>;

    beforeEach(() => {
        list = new SLL()
    })



    test("New List Should be Empty", () => {
        expect(2 + 4).toEqual(6)

        expect(list.size).toBe(0)
        expect(list.head).toBeNull()
        expect(list.tail).toBeNull()
        expect(list.toString()).toBe(`[  ]`)

    })


    test("Adding Items To The List", () => {
        let x = 1,
            tempHead: Nullable<ListNode<number>> = null
        list.add(1)
        // First Element Tests
        expect(list.size).toBe(1)
        expect(list.head).toBe(list.tail)
        expect(list.head?.next).toBeNull()
        expect(list.head?.data).toBe(x)
        expect(list.toString()).toBe(`[ 1 ]`)

        x = 77
        list.add(x)
        // Appending Elements
        expect(list.size).toBe(2)
        expect(list.tail?.data).toBe(x)
        expect(list.tail === list.head).toBe(false)
        expect(list.head?.next).toBe(list.tail)
        expect(list.toString()).toBe(`[ 1, 77 ]`)

        // Prepending Elements 
        tempHead = list.head
        x = 212
        list.addFirst(x)
        expect(list.head?.data).toBe(x)
        expect(list.head?.next).toBe(tempHead)
        expect(list.head === tempHead).toBe(false)

        expect(list.toString()).toBe(`[ 212, 1, 77 ]`)
        tempHead = null


        // Add Element After A Particular Index
        let tempSize = list.size
        list.addAfter(1, 20)
        expect(list.size).toBe(tempSize + 1)
        expect(list.toString()).toBe(`[ 212, 1, 20, 77 ]`)

    })


    test("Reading Items From The Linked List", () => {

        list.add(2).add(4).add(77).add(Infinity).add(100)

        expect(list.peekFirst()).toBe(2)
        expect(list.peekLast()).toBe(100)
        expect(list.peek(3)).toBe(Infinity)
        expect(list.peek.bind(null, 5)).toThrow()

    })


    test("Removing Items From The List", () => {

        list.add(2).add(4).add(77).add(Infinity).add(100)

        expect(list.removeFirst()).toBe(2)
        expect(list.size).toBe(4)
        expect(list.peekFirst()).toBe(4)
        expect(`${list}`).toBe('[ 4, 77, Infinity, 100 ]')

        expect(list.removeLast()).toBe(100)
        expect(list.size).toBe(3)
        expect(`${list}`).toBe('[ 4, 7, Infinity ]')

    })


})
