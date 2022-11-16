/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums0
 * @param {number[]} nums1
 * @return {number}
 */
var findMedianSortedArrays = function (nums0, nums1) {
  const len1 = nums0.length;
  const len2 = nums1.length;
  /* 奇偶场景同时考虑  */
  const left = (len1 + len2 + 1) >> 1;
  const right = (len1 + len2 + 2) >> 1;
  return (findKth(nums0, nums1, left) + findKth(nums0, nums1, right)) / 2;
};
const findKth = function (arr1, arr2, k) {
  console.log('--------------');
  console.log(arr1);
  console.log(arr2);
  console.log(k);
  console.log('--------------');
  let l1 = arr1.length;
  let l2 = arr2.length;
  if (l1 > l2) return findKth(arr2, arr1, k);
  if (l1 === 0) return arr2[k - 1];
  if (k === 1) return Math.min(arr1[0], arr2[0]);
  let idx1 = Math.min(k >> 1, l1 - 1);
  let idx2 = Math.min(k >> 1, l2 - 1);
  if (arr1[idx1] < arr2[idx2]) {
    return findKth(arr1.slice(idx1 + 1, l1), arr2, k - idx1 - 1);
  } else {
    return findKth(arr1, arr2.slice(idx2 + 1, l2), k - idx2 - 1);
  }
};
// @lc code=end

/* test */
/* const arr1 = [1, 1, 2, 4, 5]; */
/* const arr2 = [4, 5, 6, 8, 10, 11]; */
const arr1 = [1, 2];
const arr2 = [3];
console.log(findMedianSortedArrays(arr1, arr2));

/**/
/* 解题思路 */
/**/
/* 题目要求时间复杂度为O(log (m + n)),一般带有log就要想到二分法 */
/**/
/* 求一个有序数组的中位数，有两种情况: */
/**/
/* 数组长度为奇数，中位数是数组的中间数字: arr[Math.floor((arr.length + 1) / 2) - 1] */
/* 数组长度为偶数，中位数是数组的中间两个数字和除以2: (arr[Math.floor((arr.length + 1) / 2) - 1] + arr[Math.floor((arr.length + 2) / 2] - 1) / 2 */
/* 上面【】中减一的原因是数组下标从0开始 */
/**/
/* 设i = Math.floor((arr.length + 1) / 2)，j = Math.floor((arr.length + 2) / 2 */
/**/
/* 可以将找中位数转化成找有序数组第i小和第j小的数字 */
/**/
/* 设p = Math.floor(k / 2) */
/**/
/* 在两个正序数组中找第k小的数字步骤: */
/**/
/* 比较arr1[p - 1]和arr2[p - 1],假设前者小 */
/* 因为两个数组都是正序，所以arr1中下标在[0, p - 1]范围的都不可能是第k小的数，可以排除，arr1剩下下标[p, arr1.length - 1] */
/* 步骤2的[0, p - 1]范围都是比第k小的数字还要小的数字，所以只要在剩下两个数组中找到第k - (p - 1 - 0 + 1)小的数字,新一轮的k = k - (p - 1 - 0 + 1) */
/* 重复上面的步骤，直到k === 1，这时候比较两个剩下的数组中第一个数字大小，取最小的就是结果 */
/* 这个过程中还要考虑特殊情况: */
/**/
/* 其中一个数组的长度小于p:直接取最后一个数字 */
/* 其中一个数组长度等于0: 从另一个数组中取第k小的数字 */
/* arr1[p - 1] === arr2[p - 1]: 随便删去其中一个数组的前p个数(代码中将它放在else中处理) */
/* 代码 */
/**/
/**/
/* /** */
/*  * @param {number[]} nums1 */
/*  * @param {number[]} nums2 */
/*  * @return {number} */
/*  */
/* var findMedianSortedArrays = function(nums1, nums2) { */
/*     let len1 = nums1.length; */
/*     let len2 = nums2.length; */
/*     let left = Math.floor((len1 + len2 + 1) / 2); */
/*     let right = Math.floor((len1 + len2 + 2) / 2); */
/*     return (findkth(nums1, 0, len1 - 1, nums2, 0, len2 - 1, left) + findkth(nums1, 0 , len1 - 1, nums2, 0, len2 - 1, right)) / 2; */
/* }; */
/**/
/* function findkth(arr1, start1, end1, arr2, start2, end2, k) { */
/*     let n = end1 - start1 + 1; */
/*     let m = end2 - start2 + 1; */
/*     if(n > m) return findkth(arr2, start2, end2, arr1, start1, end1, k); */
/*     if(n === 0) return arr2[start2 + k - 1]; */
/*     if(k === 1) return Math.min(arr1[start1], arr2[start2]); */
/*     let i = start1 + Math.min(n, Math.floor(k / 2)) - 1; */
/*     let j = start2 + Math.min(m, Math.floor(k / 2)) - 1; */
/*     if(arr1[i] > arr2[j]) { */
/*         return findkth(arr1, start1, end1, arr2, j + 1, end2, k - (j - start2 + 1)); */
/*     } else { */
/*         return findkth(arr1, i + 1, end1, arr2, start2, end2, k - (i - start1 + 1)); */
/*     } */
/* } */
/**/
