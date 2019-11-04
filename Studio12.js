//  __| | _____________| |__
// (__   ______________   __)
//    | |              | |
//    | |   Studio 12  | |
//  _ | |______________| | _
// (__   ______________   __)
//    | |              | |

//========================================================================================================================

// Question 1

const compose_compound_function = evaluate(parse("(f, g) => x => f(g(x));"), the_empty_environment);
const source_add = (x, y) => x + y;

function is_unary_function(candidate) {
    return is_compound_function(candidate) && length(function_parameters(candidate)) === 1;
}

function overloaded_add(left, right) {
    if (is_unary_function(left) && is_unary_function(right)) {
        return apply(compose_compound_function, list(left, right));
    } else {
        return source_add(left, right);
    }
}

const primitive_functions = list(
       list("display",       display         ),
       list("error",         error           ),
       list("+",             overloaded_add  ),
       list("-",             (x,y) => x - y  ),
       list("*",             (x,y) => x * y  ),
       list("/",             (x,y) => x / y  ),
       list("%",             (x,y) => x % y  ),
       list("===",           (x,y) => x === y),
       list("!==",           (x,y) => x !== y),
       list("<",             (x,y) => x <   y),
       list("<=",            (x,y) => x <=  y),
       list(">",             (x,y) => x >   y),
       list(">=",            (x,y) => x >=  y),
       list("!",              x    =>   !   x)
       );

function square(x) { 
    return x * x;
}
function times_two(x) {
    return x + x; 
}

const square_after_times_two = square + times_two; square_after_times_two(3); // returns 36
const times_two_after_square = times_two + square; times_two_after_square(3); // returns 18

//========================================================================================================================

// Question 2

// Changed by adding another parameter which defines the mutability of the function
function eval_constant_declaration(stmt, env) {
    set_name_value(constant_declaration_name(stmt),
        evaluate(constant_declaration_value(stmt), env),
        env,
        false);
}

function eval_variable_declaration(stmt, env) {
    set_name_value(variable_declaration_name(stmt),
        evaluate(variable_declaration_value(stmt), env),
        env,
        true);
}   

function set_name_value(name, val, env, mutable) {
    function scan(names, vals) {
        return is_null(names)
            ? error("internal error: name not found")
            : name === head(names)
              ? set_head(vals, pair(val, mutable))
              : scan(tail(names), tail(vals));
    } 
    const frame = first_frame(env);
    return scan(frame_names(frame),
                frame_values(frame));
}

//========================================================================================================================

// Question 3

let the_global_environment = setup_environment();

function eval_block(stmt, env) {
    const body = block_body(stmt);
    const locals = local_names(body);
    const temp_values = map(x => no_value_yet,
                            locals);
    const block_env = extend_environment(locals, temp_values, env);
    const res = evaluate(body, block_env);
    // Let this program environment be the global environment for future calls
    if (env === the_global_environment) {
        the_global_environment = block_env;   
    } else {}
    return res;
}

let x = 100;

function change() {
    x = x + 1;
    return x;
}


// Yu Xuan's answer -> Creating a global variable which store the previous bunch of codes.
let storage = "";
    
function read_eval_print_loop(history) {
    
    const prog = prompt("History:" + history + 
                        "\n\n" + "Enter next: ");
    storage = storage + prog;
    display(storage);

    if (prog === null) {
        display("session has ended");
    } else {
        const res = parse_and_eval(storage);
        read_eval_print_loop(history + "\n" + 
                             stringify(storage) + " ===> " +
	                         stringify(user_print(res)));
    }
}