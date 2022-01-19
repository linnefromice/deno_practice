alert("Please acknowledge the message.")
console.log("The message has been acknowledged.")

const shouldProceed = confirm("Do you want to proceed?")
console.log("Should proceed?", shouldProceed)

const _name = prompt("Please enter your name:")
console.log("Name:", _name)

const age = prompt("Please enter your age:", "18")
console.log("Age:", age)

// Please acknowledge the message. [Enter] thx
// The message has been acknowledged.
// Do you want to proceed? [y/N] y
// Should proceed? true
// Please enter your name: haruyama
// Name: haruyama
// Please enter your age: [18] 20
// Age: 20