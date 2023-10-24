export function test() {
  const alphabet = ["A", "B", "C", "D", "E", "F"]
  const numbers = ["1", "2", "3", "4", "5", "6"]
  // const a = alphabet[0]
  // const b = alphabet[1]

  //const [a, b] = alphabet

  const [a, , c, ...rest] = alphabet
  console.log(a)
  //console.log(b)
  console.log(c)
  console.log(rest)

  const newarray = [...alphabet, ...numbers]
  console.log(newarray)

  function sumAndMultiply(a, b) {
    return [a + b, a * b, a / b]
  }

  const array = sumAndMultiply(2, 3)
  const [sum, multiply, division = "No division"] = sumAndMultiply(2, 3)
  console.log(array)
  console.log(sum)
  console.log(multiply)
  console.log(division)

  const personOne = {
    name: "Kyle",
    age: 24,
    address: {
      city: "Somewhere",
      state: "One of them",
    },
  }

  const personTwo = {
    name: "Sally",
    age: 32,
    favoriteFood: "Watermelon",
    address: {
      city: "Somewhere else",
      state: "Another one of them",
    },
  }

  const personThree = {
    age: 32,
    favoriteFood: "Watermelon",
  }

  // const {
  //   name: firstName = "John",
  //   age,
  //   favoriteFood = "Rice",
  //   ...restPerson //add the rest of the properties, leaving out any you already used
  // } = personTwo
  // //console.log(name)
  // console.log(firstName)
  // console.log(age)
  // console.log(favoriteFood)
  // console.log(restPerson)

  const {
    name: firstName = "John",
    address: { city }, //destructure nested objects using key
  } = personTwo
  //console.log(name)
  console.log(firstName)
  console.log(city)

  const personFour = { ...personOne, ...personThree } //add objects of personOne, then OVERWRITE with personThree
  console.log(personFour)

  function printUser(user) {
    console.log(user)
    console.log(`Name is: ${user.name}. Age is ${user.age}.`)
  }

  function printUser({ name, age, favoriteFood = "Watermelon" }) {
    console.log(
      `Name is: ${name}. Age is ${age}. Favorite food is ${favoriteFood}.`
    )
  }

  printUser(personOne)
}
