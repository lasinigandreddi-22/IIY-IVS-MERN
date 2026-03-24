console.log("=== Function parameter and Return Types ===");
function add(a: number, b: number): number {
    return a + b;
}
console.log("Addition:",add(10, 20));
function getFullName (firstName: string, lastName: string): string{
    return firstName + " " + lastName;
}
console.log("Full Nmae:",getFullName("Shanmukh","Ganta"));
function isElegible(age: number): boolean {
    return age >= 18;
}
console.log("Elegible:",isElegible(20));
function displayMessage(message: string): void {
    console.log("Message:", message)
}
displayMessage("Welcome to TypeScript");
function greetUser(name?: string): string {
    return name ? "Hello " + name : "Hello Guest";
}
console.log(greetUser("Student"));
console.log(greetUser())