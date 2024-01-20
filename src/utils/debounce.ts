/*
  When you use this debounced function in the context of handling the resize event:

  1. The user starts resizing the window.
  2. The resize event is fired multiple times, rapidly calling your debounced function.
  3. Each call to the debounced function clears the previous timer and sets a new one.
  4. Once the user stops resizing (and no new resize events are fired for the duration 
     of the timeout), the final call to the function is executed.
*/

export function debounce(func: (...args: any[]) => void, timeout = 100) {
  // 'timer' holds the reference to our timeout to clear it if needed
  let timer: ReturnType<typeof setTimeout>;

  // Return a function that will be called every time the debounced function is called
  return (...args: any[]) => {
    // If there's a pending execution (timer is set), cancel it.
    // This ensures that we don't run the function too soon if there are rapid, sequential calls to the debounced function.
    clearTimeout(timer);

    // Set a new timer.
    // If the function is not called again within the 'timeout' period, the inner function will execute.
    timer = setTimeout(() => {
      // Call the original function with the arguments.
      func(...args);
    }, timeout);
  };
}
