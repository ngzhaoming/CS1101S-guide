//  __| | _____________| |__
// (__   ______________   __)
//    | |              | |
//    | |   Studio 11  | |
//  _ | |______________| | _
// (__   ______________   __)
//    | |              | |

//========================================================================================================================

//Question 2e

// Notice that in the recursive call, there is a swap in the parameter to so that the starting elements can be different
function interleave_stream_append(s1, s2) { 
    return is_null(s1) ? s2
                       : pair(head(s1), 
                            () => interleave_stream_append(s2,
                                    stream_tail(s1)));
}

function stream_pairs3(s) {
    if (is_null(s) || is_null(stream_tail(s))) {
        return null;
    } else {
        return pair(pair(head(s), head(stream_tail(s))),
                () => interleave_stream_append(
                    stream_map(x => pair(head(s), x),
                            stream_tail(stream_tail(s))),
                        stream_pairs3(stream_tail(s))));
    }
}

const s3 = stream_pairs3(integers);
eval_steam(s3, 50);

//========================================================================================================================

//Question 3

// alt_ones should be: [1, -1, 1, -1, ...]
// Both nullary function reference and pair there heads, thus repeating the pairing of 1 and -1 sequence.
const alt_ones = pair(1, () => pair(-1, () => alt_ones)); 

// The normal zero stream function definition
function zero() {
    return pair(0, zero);
}

const x = zero();

eval_stream(x, 30);

// zeros should be: [0, 0, 0, 0, 0, ...]
const zeros = add_streams(alt_ones, stream_tail(alt_ones)); 

const ones = pair(1, () => ones);
const pos_integers = pair(1, () => add_streams(ones, pos_integers));

// s1 should be: [1, 1, 1, 1, ...]
const s1 = ones; display(eval_stream(s1, 10));

// s2 should be: [1, 2, 3, 4, ...]
const s2 = pos_integers;

//========================================================================================================================

//Question 4

function add_streams_pickle(s1, s2) { 
    return is_null(s1)
        ? s2()
        : is_null(s2())
            ? s1
            : pair(head(s1) + head(s2()),
                   () => add_streams_pickle(stream_tail(s1),
                                     () => stream_tail(s2())));
}

const add_series_pickle = add_streams_pickle; 

function mul_series(s1, s2) {
    return pair(head(s1) * head(s2),
            () => add_series_pickle(
                stream_tail(scale_stream(head(s2), s1)),
                            () => mul_series(stream_tail(s2), s1)));
}