/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

var isPalindrome = function(head) {
    left = head;
    return isPalindromeSublist(head);
};

function isPalindromeSublist(right) {
    if (!right)
        return true;

    var ips = isPalindromeSublist(right.next);
    if (!ips)
        return false;

    var cisp = left.val == right.val;
    left = left.next;

    return cisp;
}