//  __| | _____________| |__
// (__   ______________   __)
//    | |              | |
//    | |   Studio 9   | |
//  _ | |______________| | _
// (__   ______________   __)
//    | |              | |

//========================================================================================================================

//Question 2

function d_reverse(xs) {
    if (is_null(xs) || is_null (tail(xs))) {
        return xs;
    } else {
        const temp = d_reverse(tail(xs));
        set_tail(tail(xs), xs);
        set_tail(xs, null);
        return temp;
    }
}

function d_reverse(xs) {
    function helper(result, ys) {
        if (is_null(ys)) {
            return result;
        } else {
            const rest = tail(ys);
            set_tail(ys, result);
            return helper(ys, rest);
        }
    }

    return helper(null, xs);
}

//========================================================================================================================

//Question 3

function d_filter(pred, xs) { 
    if (is_null(xs)) {
        return xs;
    } else if (pred(head(xs))) {
        set_tail(xs, d_filter(pred, tail(xs)));
        return xs; 
    } else {
        return d_filter(pred, tail(xs)); 
    }
}

//========================================================================================================================

//Question 4

function count_pairs(x) { 
    let pairs = null; 

    function check(y) {
        if (!is_pair(y)) { 
            return undefined;
        } else if (!is_null(member(y, pairs))) { 
            return undefined;
        } else {
            pairs = pair(y, pairs); 
            check(head(y)); 
            check(tail(y));
        } 
    }

    check(x);
    return length(pairs); 
}