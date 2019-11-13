//  __| | _____________| |__
// (__   ______________   __)
//    | |              | |
//    | |   PA 2018    | |
//  _ | |______________| | _
// (__   ______________   __)
//    | |              | |

//========================================================================================================================

// Question 1


// Question 1c
// Due to integer overflow error, you are unable to convert the list into numbers first, add them convert them back into
// list. Instead, you have to do the sum both as a list. Integer can only go as big as 2,147,483,647. In this case, some
// lists have a larger number than that which causes integer overflow.
function big_int_add(x, y) {
    let carry = 0;
    let mutableX = x;
    let mutableY = y;
    let result = list();
    
    //Padding
    if (length(x) < length(y)) {
        const diff = length(y) - length(x);
        for (let i = 0; i < diff; i =  i + 1) {
            mutableX = pair(0,  mutableX);
        }
    } else {
        const diff = length(x) - length(y);
        for (let i = 0; i < diff; i = i + 1) {
            mutableY = pair(0,  mutableY);
        }
    }
    
    //Calculation
    for (let i = length(mutableX) - 1; i >= 0; i = i - 1) {
        const currX = list_ref(mutableX, i);
        const currY = list_ref(mutableY, i);
        let addition = currX + currY + carry;
        carry = 0;
        
        if (addition > 10) {
            addition = addition - 10;
            carry = carry + 1;
        } else {
            
        }
        
        result = pair(addition, result);
        
    }
    
    return result;
}

// Question 1d

function big_int_mult_by_digit(bint, digit) {
    let carry = 0;
    
    function mul(y, num) {
        const result = num * y + carry;
        carry = math_floor(result/10);
        return result % 10;
    }
    
    const l1 = map(x => mul(x, digit), bint);
    return append(l1, list(carry));
}


//========================================================================================================================

// Question 2

// Question 2d
// Notice that most of these functions can be copy into your "cheatsheet" and you can paste them when you need it during
// the practical exam

function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}

function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

function sort_ascending(A) {
   const len = array_length(A);
for (let i = 1; i < len; i = i + 1) {
const x = A[i];
let j = i - 1;
while (j >= 0 && A[j] > x) {
A[j + 1] = A[j]; // shift right
j = j - 1;
}
A[j + 1] = x;
}
}

function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}

function permutations(s) {
    return is_null(s)
    ? list(null)
    : accumulate(append , null ,
    map(x => map(p => pair(x, p),
    permutations(remove(x, s))),
    s));
}

function bubblesort_list(L) {
    const len = length(L);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let p = L; // Notice that the pointer L does NOT change it always point to the first element in the list
        for (let j = 0; j < i; j = j + 1) {
            if (head(p) > head(tail(p))) { // Comparing the current element with the next element
                // Swap block
                const temp = head(p);
                // This two mutated method helps in the swapping of the two elements
                set_head(p, head(tail(p)));
                set_head(tail(p), temp);
            } else {
                
            }
            // Traversing the p pointer down the array
            p = tail(p);
        }
    } 
}

function array_to_int(xs) {
    let result = 0;
    for (let i = 0; i < length(xs); i = i + 1) {
        result = result + math_pow(10, i) * list_ref(xs, i);
    }
    
    return result;
}
    

function build_nth_largest_int(digits, n) {
    
    const originalarray = digits;
    sort_ascending(originalarray);
    
    const sortedlist = array_to_list(originalarray);
    
    const permutationslist = permutations(sortedlist);
    let arrayperm = list_to_array(permutationslist);
    
    let resultList = list();
    
    for (let i = 0; i < array_length(arrayperm); i = i + 1) {
        // Notice that now it's an array with elements as list
        const currVal = array_to_int(arrayperm[i]);
        if (member(currVal, resultList) === null) {
            resultList = append(list(currVal), resultList);
        } else {
            
        }
    }
    
    bubblesort_list(resultList);
    
    let counter = 0;
    if (length(resultList) < n) {
        counter = length(resultList);
    } else {
        counter = n;
    }
    
    return stringify(list_ref(reverse(resultList), counter - 1));
}

//========================================================================================================================

// QUESTION 3

//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================



//===============================================================
// TASK 3A(I)
//===============================================================
function count_lower_neighbors(emap, r, c) {

    // Check whether you are at the corner or edges -> Return 0
    const length = array_length(emap);
    const height = array_length(emap[0]);
    if (r === 0 || c === 0 || r === length - 1 || c === height - 1) {
        return 0;
    } else {
        // Get the peak elevation of the current peak
        const currVal = emap[r][c];
        
        let counter = 0;
        for (let i = -1; i <= 1; i = i + 1) {
            for (let j = -1; j <= 1; j = j + 1) {
                if (emap[r + i][c + j] < currVal) {
                    counter = counter + 1;
                } else {
                    
                }
            }
        }
        
        return counter;
    }
}


// TASK 3A(I) TESTS
const emapA1 =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]];
assert("3A(I)_1", () => count_lower_neighbors([[5]], 0, 0), 0, []);
assert("3A(I)_2", () => count_lower_neighbors(emapA1, 0, 0), 0, []);
assert("3A(I)_3", () => count_lower_neighbors(emapA1, 5, 4), 0, []);
assert("3A(I)_4", () => count_lower_neighbors(emapA1, 4, 6), 0, []);
assert("3A(I)_5", () => count_lower_neighbors(emapA1, 1, 1), 1, []);
assert("3A(I)_6", () => count_lower_neighbors(emapA1, 2, 2), 8, []);
assert("3A(I)_7", () => count_lower_neighbors(emapA1, 2, 3), 5, []);
assert("3A(I)_8", () => count_lower_neighbors(emapA1, 4, 4), 6, []);


// //===============================================================
// // TASK 3A(II)
// //===============================================================
function count_peaks(emap) {

    let counter = 0;
    for (let i = 0; i < array_length(emap); i = i + 1) {
        for (let j = 0; j < array_length(emap[0]); j = j + 1) {
            if (count_lower_neighbors(emap, i, j) === 8) {
                counter = counter + 1;
            } else {
                
            }
        }
    }
    
    return counter;
}


// TASK 3A(II) TESTS
const emapA2a =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]]; // 3 peaks
const emapA2b =
[[3, 1, 4, 1, 5, 1, 6, 1],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 7, 1, 8, 1, 9, 1, 0],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [2, 1, 3, 1, 4, 1, 5, 2],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 9, 1, 8, 1, 7, 1, 6],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [8, 1, 9, 1, 8, 1, 9, 1]]; // 9 peaks
assert("3A(II)_1", () => count_peaks([[5]]),
    0, ["count_lower_neighbors"]);
assert("3A(II)_2", () => count_peaks([[2,3,4],[3,5,3],[4,3,2]]),
    1, ["count_lower_neighbors"]);
assert("3A(II)_3", () => count_peaks(emapA2a),
    3, ["count_lower_neighbors"]);
assert("3A(II)_4", () => count_peaks(emapA2b),
    9, ["count_lower_neighbors"]);


// //===============================================================
// // TASK 3B
// //===============================================================
function count_islands(emap) {
    
    const len = array_length(emap);
    const height = array_length(emap[0]);
    
    let visited = [];

    // Generate the visited 2D array -> This is to check whether the cell 
    // has already been checked
    for (let i = 0; i < len; i = i + 1) {
        visited[i] = [];
        for (let j = 0; j < height; j = j + 1) {
            visited[i][j] = false;
        }
    }
    
    // Check whether the neighboring cells are valid    
    function isSafe(emap, row, col, visited) {
        // Check there is no negative / overflow index
        return row >= 0 && row < len && col >= 0 && col < height 
            && emap[row][col] > 0 && !visited[row][col];
    }
    

    // Apply Depth-First search and treat the 2D array as a graph
    function dfs(emap, row, col, visited) {
        // Mark this cell as visited
        visited[row][col] = true;
        for (let i = -1; i <= 1; i = i + 1) {
            for (let j = -1; j <= 1; j = j + 1) {
                if ((i === -1 && j === 0) ||
                    (i === 0 && j === -1) ||
                    (i === 0 && j === 1) ||
                    (i === 1 && j === 0)) {
                        if(isSafe(emap, row + i, col + j, visited)) {
                            dfs(emap, row + i, col + j, visited);
                        } else {
                            
                        }
                    } else {
                        
                    }
            }
        }
        
    }

    
    let counter = 0;
    
    // Trying to check the number of connected graphs
    for (let i = 0; i < len; i = i + 1) {
        for (let j = 0; j < len; j = j + 1) {
            if (emap[i][j] > 0 && !visited[i][j]) {
                // Check
                dfs(emap, i, j, visited);
                counter = counter + 1;
            } else {
                
            }
        }
    }

    return counter;
}

// // TASK 3B TESTS
const emapB1 =
[[2, 1, 0, 2, 1, 1, 3],
 [0, 1, 0, 1, 0, 0, 2],
 [0, 0, 0, 2, 3, 1, 1],
 [1, 0, 2, 0, 0, 0, 0],
 [0, 0, 1, 2, 0, 0, 0],
 [1, 0, 3, 0, 1, 1, 2]]; // 6 islands
const emapB2 =
[[1, 2, 0, 0, 1, 0, 0, 1],
 [1, 2, 2, 3, 1, 0, 2, 1],
 [0, 1, 1, 0, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 3, 3, 0],
 [1, 1, 2, 0, 0, 0, 0, 0],
 [1, 0, 1, 0, 0, 1, 2, 3],
 [1, 3, 2, 1, 1, 0, 1, 1]]; // 5 islands
 
//display(count_islands([[2,1], [1,3]]));
// display(count_islands(emapB1));
// display(count_islands(emapB2));

assert("3B_1", () => count_islands([[0]]), 0, []);
assert("3B_2", () => count_islands([[1]]), 1, []);
assert("3B_3", () => count_islands([[0,0], [0,0]]), 0, []);
assert("3B_4", () => count_islands([[2,1], [1,3]]), 1, []);
assert("3B_5", () => count_islands([[0,1], [0,0]]), 1, []);
assert("3B_6", () => count_islands([[2,0], [0,1]]), 2, []);
assert("3B_7", () => count_islands(emapB1), 6, []);
assert("3B_8", () => count_islands(emapB2), 5, []);


// //===============================================================