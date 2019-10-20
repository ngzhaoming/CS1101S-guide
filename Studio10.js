//  __| | _____________| |__
// (__   ______________   __)
//    | |              | |
//    | |   Studio 10  | |
//  _ | |______________| | _
// (__   ______________   __)
//    | |              | |

//========================================================================================================================

//Question 2

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

//========================================================================================================================

//Question 3

// part a

function make_2D_zero_array(rows, cols) { 
    const arr = [];
    function iter_r(r) {
        function iter_c(c) { 
            if (c < cols) {
                arr[r][c] = 0;
                iter_c(c + 1); 
            } else { 
                
            }
        }
        
        if (r < rows) { 
            arr[r] = [];
            iter_c(0);
            iter_r(r + 1); 
        } else { 
            
        }
    }
    iter_r(0);
    return arr;
}

// part b

function num_of_live_neighbours(game, n, r, c) { 
    let live_count = 0;
    /* 
        Main reference is the middle cell (r,c) we want to analyse the 8 squares around it, which
        is why the loop starts from -1, which is one cell to the left of the middle cell and one cell
        above the middle cell to 1. This is one cell to the right of the middle cell and one cell
        below the middle cell.
    */
    for (let dr = -1; dr <= 1; dr = dr + 1) {
        for (let dc = -1; dc <= 1; dc = dc + 1) { 
            live_count = live_count +
                        game[(r + dr + n) % n][(c + dc + n) % n];
        } 
    }
    return live_count - game[r][c]; 
}

// part c

function next_generation(game, n) {
    const next = make_2D_zero_array(n, n); // Create a new array to track the new state of each cell
    //Having two for loops to traverse through all the elements in the array
    for (let y = 0; y < n; y = y + 1) {
        for (let x = 0; x < n; x = x + 1) {
            const live_neighbours = num_of_live_neighbours(game, n, y, x);
            if (game[y][x] === 1) { // Checking the scenario the cell is currently alive
                if (live_neighbours < 2 || live_neighbours > 3) {
                    next[y][x] = 0; 
                } else {
                    next[y][x] = 1;
                }
            } else if (live_neighbours === 3) { // Cell status is dead
                next[y][x] = 1;
            } else { // Cell status is dead
                next[y][x] = 0;
            }
        }
    }
    return next; 
}

//========================================================================================================================

//Question 4

const mem = [];
/*
    Read function for memoize. The function body will usually be the same, checking whether a certain index in the array
    has a value already or undefined. If it's there, return the value, if not evaluate the method and write it down so
    that the computed value can be reused again.
*/
function read(n, k) {
    return (mem[n] === undefined) ?
            undefined : mem[n][k];
}

function write(n, k, value) { // Write function to store the evaluated method into the array
    if (mem[n] === undefined) {
        mem[n] = []; // Check whether the 2D array is created array. If not create it so that it can store values
    } else {
        
    }
        mem[n][k] = value;
}
    
// n is the amount in cents, and k is the number of denominations.
function mcc(n, k) {
    if (n >= 0 && k >=0 && read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = (n === 0) ? // Couting valid permutation
            1 : (n < 0 || k === 0) ? // Conditions for invalid permutation
                0 : mcc(n, k - 1) +
                    mcc(n - first_denomination(k), k); // nCr problem, recursively calling the two function
                    // One which reduces the amount based on the denomination of the coin, the coin is being chosen
                    // The other is not choosing this type of coin, resulting in k - 1
    } 
    
    if (n >= 0 && k >= 0) { 
        write(n, k, result); // Recording the result of the current evaluation to be used in subsequent evaluation
    } else { 
        
    } 
    return result;
}


function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ? 5 : 
           kinds_of_coins === 2 ? 10 :
           kinds_of_coins === 3 ? 20 : 
           kinds_of_coins === 4 ? 50 : 
           kinds_of_coins === 5 ? 100 : 0;
}

mcc(365, 5);

//========================================================================================================================

//Question 5

// part a

function max_flies_to_eat(tile_flies) { 
    const rows = array_length(tile_flies); 
    const cols = array_length(tile_flies[0]);
    
    function max_from(r, c) {
        if (c < 0 || c >= cols) {
            return 0;
        } else if (r === rows - 1) {
            return tile_flies[r][c]; 
        } else {
            return tile_flies[r][c] + math_max(max_from(r + 1, c - 1),
                max_from(r + 1, c),
                max_from(r + 1, c + 1));
        }
    }
    let curr_max = 0;
    for (let c = 0; c < cols; c = c + 1) {
           curr_max = math_max(curr_max, max_from(0, c));
      }
    return curr_max;
}

const tile_flies = [[3, 1, 7, 4, 2], 
                    [2, 1, 3, 1, 1], 
                    [1, 2, 2, 1, 8], 
                    [2, 2, 1, 5, 3], 
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]]; 
max_flies_to_eat(tile_flies);

//Order of growth in time: O(3RC)

// part b

let mem = [];

function read(n, k) {
    return (mem[n] === undefined) ?
            undefined : mem[n][k];
}

function write(n, k, value) { 
    if (mem[n] === undefined) {
        mem[n] = []; 
    } else {
        
    }
    
    mem[n][k] = value;
}

function memo_max_flies_to_eat(tile_flies) { 
    const rows = array_length(tile_flies); 
    const cols = array_length(tile_flies[0]);
    
    function max_from(r, c) {
        if (c >= 0 && r >= 0 && read(r, c) !== undefined) {
            return read(r, c); 
        } else {
            let result = 0;
                if (c < 0 || c >= cols) { 
                    result = 0;
                } else if (r === rows - 1) { 
                    result = tile_flies[r][c];
                } else {
                    result = tile_flies[r][c] +
                            math_max(max_from(r + 1, c - 1),
                                     max_from(r + 1, c),
                                     max_from(r + 1, c + 1));
                }

                if (c >= 0 && r >= 0) {
                    write(r, c, result); 
                } else { }
            
            return result;
        }
    }
    
    let curr_max = 0;
    
    for (let c = 0; c < cols; c = c + 1) {
           curr_max = math_max(curr_max, max_from(0, c));
    }

    return curr_max; 
}

//Order of growth in time: Θ(RC)

//========================================================================================================================

// Extra question from studio slide 10

function enhanced_bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let isSwapped = false; // Have a flag to check whether there is any swap
        for (let j = 0; j < i; j = j + 1) { 
            if (A[j] > A[j + 1]) {
                const temp = A[j]; 
                A[j] = A[j + 1]; 
                A[j + 1] = temp;
                isSwapped = true;
            } else {
            
            }
        }   
        
        display(A);
        
        if (!isSwapped) {
            // No swaps done, which means that the list is already sorted
            // This means that you don't have to traverse the list further
            break;
        } else {
            continue;
        }
    }
}

const L = [1, 2, 3, 5, 4];
enhanced_bubblesort_array(L);
