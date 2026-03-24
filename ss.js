console.log("=== Function parameter and Return Types ===");
function add(a, b) {
    return a + b;
}
console.log("Addition:", add(10, 20));
function getFullName(firstName, lastName) {
    return firstName + " " + lastName;
}
console.log("Full Nmae:", getFullName("Shanmukh", "Ganta"));
function isElegible(age) {
    return age >= 18;
}
console.log("Elegible:", isElegible(20));
function displayMessage(message) {
    console.log("Message:", message);
}
displayMessage("Welcome to TypeScript");
function greetUser(name) {
    return name ? "Hello " + name : "Hello Guest";
}
console.log(greetUser("Student"));
console.log(greetUser());
