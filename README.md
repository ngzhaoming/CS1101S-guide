# CS1101S AY19/20 Midterms


### Question 1

1) Generally well-done. Just follow the three steps rule in drawing box and pointer diagram.
    
2)  Same as question 1. Just that ```list q``` this time is referencing to the same
    list object so must point to the same list.
    
3)  Trace out the program and draw out the new list first before drawing. The
    map method causes each element in the list to become the original list. 
    Hence, the final result is 
    ```
    list(list(4, 5, 6), list(4, 5, 6), list(4, 5, 6))
    ```
    
4)  Trace out the program to form the new list again. Take note that the 
    accumulate function works from the back of the list. So the element 6 will
    be variable x first. ```pair(y, x)``` with y being the null element.
    
    NOTE: the map function takes in a list and applies the function to each element in the list. The output given will also be a list. In this case, after the first accumulation, the result will be ```list(pair(null, 6))```. From this list, the accumulation function repeats itself recursively, resulting in ```list(pair(pair(null, 6), 5))``` and so forth till the end result is ```list(pair(pair(pair(null, 6), 5), 4))```. Once you are able to derive the final result of the list, drawing it out wouldn't be that hard.
    
---

### Question 2

1)  This question is testing whether you know that two list with the same
    elements are similar only in their elements BUT structurally different.
    Hence, your comparison of ```x``` with ```head(xs)``` has to be a pair / list data 
    structure during the comparison.
    
2)  Question specification states that the ys list that is being append has
    to be structurally different from the original ys list. Hence, we cannot
    use:
    
 	```
    function append(xs, ys) {
    	if (is_null(xs)) {
        	return ys;
        } else {
        	return pair(head(xs), append(tail(xs), ys));
        }
    }
    ```
    Since this will result in ```list ys``` being structually identical. Hence, the only way to do it is to create new pairs from ```list ys``` too so that the final appended list will contains only new pairs.
    
3) At first glance of this question, I would have used take, drop functions to take the elements till the last element. Then use drop function to drop the last element and append them together. Alternatively, I came up with another solution for this which might be more intuitive for some of you:

	```
    function last_comes_first(xs) {
        const last_element = list_ref(xs, length(xs) - 1);
        const remove_last = tail(reverse(xs));
        return append(list(last_element), reverse(remove_last));
    }
	```

      In this function, I use ```list_ref``` to access the last element. Then I used ```reverse	``` and ```tail	``` to remove the last element, before reversing it back and ```append``` the ```last_element``` that I have extracted previously. Notice that this requires good proficiency in the list library functions which you guys should have been familiar with already! 😃

4. Fibonacci sequence
	Fionnacci sequence involving a list. Take note that to find fibonacci, we need the value of the previous two values. Hence, the number of elements in the starting list **MUST** be 2 or more (which is specified in the question). Here is my solution to the question: 
    
    ```
    function fib_list(N) {
        function helper(counter, result) {
            if (counter === N) {
                return result;
            } else {
                const next = list_ref(result, length(result) - 2) 
                    + list_ref(result, length(result) - 1);
                return helper(counter + 1, append(result, list(next)));
            }
        }

    	return helper(2, list(0, 1));
	}
    ```
    
    To explain my thought process, from the given function, it is definite that not enough parameters are given. So in order to add in more parameters into the function, you can either:
	* Create a helper function
	* Use function definition expression (FDE) to include more variables

	In this case, I created a helper function, and notice that I used ```list_ref``` method again to extract the previous two values to be calculated. Although this method is rather inefficient since for every increment of ```N```, I call ```list_ref``` twice which has a runtime of O(n) each.
    
---

### Question 3

For order of growth (OOG) take note that Ω is always finding the lower bound, so any time complexity that is equal or lower than the OOG of the Θ will be true. For Θ, the OOG **MUST** be the same as the given. For *O* this is finding the upper bound, so any time complexity that is equal or higher will be true.

1. Since the OOG of function ```r(n)``` is not given, let's assume it to be ```z```. Since the three parts have ```z``` as the OOG, all will be true.

2. Similar to question 1, this time the OOG of ```r(n)``` is given to be ```g(n)```. Since ```g(n)``` is being referenced for the two parts, they are true.

3.  For this question, you need to understand the magnitude of each OOG. General rule of thumb is:
	```
     Θ(1) -> Θ(log(n)) -> Θ(n) -> Θ(nlog(n)) -> Θ(n^2) -> Θ(2^n)
    ```
    1. Part 1 ask for Θ, which means the OOG **MUST** be equals to the OOG of ```r(n)```, which is false.

    2. Part 2 ask for Ω, which means the OOG can be equal or lower to the OOG of ```r(n)```, which is false.

	3. Part 3 ask for *O*, which means the OOG can be equal or higher to the OOG of ```r(n)```, which is true.


---

### Question 4

Read the question specification **VERY** carefully. Notice that the function ```make_active_list``` is a higher order function. It is defined as:
```
function make_active_list(xs) {
	return x => list_ref(xs, x);
}
```

1. To find the length of the list, your function will need to iterate through each elements in the list. Since we know how ```make_active_list``` is being defined, we need to provide a ```x``` parameter each time it is being called. Also, since there is not enough parameters provided in the defined function, we will have to create a helper function with a counter as the parameter. With this counter, we iterate from ```0``` to ```n```, where ```n``` is the length of the list. At counter ```n``` since there is no element to reference from, the function will give ```null``` and that is the signal for termination of the function.

2. Pseudo-append function. Notice that the solution does not really merge the two list together to form a new list. However, the function just takes into account the two list and allow users to access the elements from these two lists.

	The solution is rather elegant:
    * It takes into consideration the total length of the two list first
    * Then from the index given by the user, it will check whether the index lies between the range of ```0 ≤ index ≤ length(a + b) - 1```. If it is it will give the value based on whether it comes from the first or second list, else it will return ```null```
    
3. The main idea of this question is:
	1. Convert the active list into a list
	2. Map each element in the list with the function first to create a new list with the function applied to each of the element in the list
	3. Then use accumulate to flatten the list and get the result of the list.

	```
	function sum(as, f) {
        return accumulate((x, ys) => f(x) + ys, 0,
        build_list(act_length(as), i => head(as(i))));
	}    
    ```
    
	If you were to read the list library functions, ```build_list``` creates a list from 0 to n - 1. Then from this generated list, it will apply a function with each element (kinda like mapping the elements with the function). Using the function ```make_active_list``` and the list that has elements 0 to n - 1, we are able to access all the elements in the active list, and convert it into a list. From there, just apply map and accumulate to get the final sum result.

---

### Question 5

Binary Arithmetic Expression are like your number bonds where you learnt during your primary school days.

###### Question 5a

As with all BST questions, this involves doing recursive functions and also applying lots of wishful thinking. Assuming that your evaluating BST function is working and use apply that function again to your left subtree and right subtree.

Looking at the constant ```bae2```, we can visualize the BST as such:
```
						[ * ]
                        /   \
                     [ + ] [ 100 ]
                     /   \
                  [ 2 ] [ 3 ]
```

You can see that the operation for each equation will **ALWAYS** be in the center (val) and the left and right subtree will be number. Therefore, the base case is when the center (val) is **NOT** and operation. If it is not an operation, that means it's a number, so just return that number. If not you have to proceed down the BST and evaluate the left and right subtree first.

Also stated in the question, the operation used will either be ```+``` or ```*```, so just check for these two operations. The key here is knowing how to use the relevant head and tail functions to access the middle element, left and right subtree.

###### Question 5b

Reading from the question specification, the function ```negate_BAE``` takes in a BST and returns a BST that when evaluated will give the negated result of the original. This question also tests your mathematical proficiency. How do we negate the sum of two numbers? We have negate both values that are being added. Now how do we negate the multiplication of two numbers? We just need one of the value to be negated and the result will be negated.

Since the structure that needs to be given is a BST, one have to use the ```list``` function to produce the respective modified left and right subtree.

---

### Question 6

This set of questions tests you on your ability to utilize and visualize functions using the substitution model.

###### Question 6a

1. Straightforward question, you can treat the function ```x => 2 * x``` as a "black box" OR presume it to be another variable say ```f``` if FDE are too intimidating to handle. So the function will equate to ```(x => ff(x))(1)```. From there equate the FDE expression with ```x``` taking the value 1 and this evaluates to 4.

2. Again if FDE are too intimidating, try to trace out the program step by step using the substitution model. In this case, we can evaluate the ```twice(x => 2 * x)``` part first which gives us ```thrice(ff(x))(1)```. So from there we know that the new function ```ff(x)``` will be repeated three times. This gives the equation ```(x => ffffff(x))(1)```. From your binary 2s multiplication, this will give 64.

3. Use the substitution model for this one and take note of where the brackets are. In this case, we need to solve for ```thrice(twice)``` first, and we let twice be ```f``` this time. This will equate to ```(fff(x => 2 * x))(1)```. Letting ```g``` be the function ```x => 2 * x``` we have ```gggggggg(1)```. Hence, from your binary 2s multiplication, this evaluates to 256.

###### Question 6b

Tracing the program out with FDE. After the first run of ```mystery``` function, the output will be ```mystery(x => (x => 7 * x)(x => x + 1), 7)```. This will subsequently be evaluated to ```mystery(x => (x => 7 * (x + 1)), 7)```. The subsequent iteration of the code will increase the number of ```(x+1)``` method being called. Hence, the final result have the ```(x + 1)``` method called 8 times, evaluating to ```0 + 8 * 7``` giving 56 as the answer.

###### Question 6c

When I first see the answer for this question, I realized that Martin Henz have brought essence of recursion to the next level.

But on closer inspection together with the answer, it is quite understandable why the function defined for ```d``` is just:

```
function d(f) {
	return d;
}
```

From the LHS:\
The function ```d``` takes in the parameter ```(x => x)``` and returns ```d```. This continues for the next two FDE which evaluates to ```d```.

From the RHS:\
The function ```d``` still takes in the parameter ```(x => x)``` and returns ```d```. Now, the next function ```d``` will take in ```d``` as the parameter. However, the parameter is being ignored and just returns ```d``` too. This continues and the final evaluation will be ```d```.

Since the object ```d``` function is structually similar, this will evaluate into ```true```.

Now think about this function definition for ```d```:
```
function d(f) {
	return f;
}
```
This definition for the function ```d``` does not work since both the LHS and RHS though both will return ```(x => x)```, they are referencing to a different object. Hence, the overall evaluation will be false. From this question, at a glance, only function ```d``` will be referencing to the same object. Hence, your final evaluation has to be whether ```d === d``` which is why the function is defined that way.

---

###### Find me :)
You can find me through [here](https://www.instagram.com/zhaoming_boiboi/).