console.log('client.js is sourced!');
let currentOperator

// Will take an operator from the buttons in the DOM
let setOperator = (event, op) => {
    event.preventDefault()

    currentOperator = op
    console.log("current operator is...", currentOperator)
}

// Create a function that will perform a GET request to retrieve history
let getHistory = () => {
    console.log("getHistory working...")
    // Axios
    axios({
        method: "GET",
        url: "/getHistory"
    })
        .then((response) => {
            console.log("response.data from /getHistory: ", response.data)
            let history = response.data
            renderHistory(history)

        })
        .catch((error) => {
            console.error("There was an error on GET /getHistory", error)
            // alert("GET /getHistory didn't work Barbie girl...")
        })
}

getHistory()

// Will post new calculation to /postHistory route
let postHistory = (event) => {
    event.preventDefault()
    console.log("New History created...")

    // Create selectors for the two input fields to get values
    let numOne = document.getElementById("numOne").value
    let numTwo = document.getElementById("numTwo").value

    let newHistory = {
        num1: numOne,
        num2: numTwo,
        operator: currentOperator,
    }
    console.log("New history to send...", newHistory)

    // Axios post request and send data
    axios({
        method: "POST",
        url: "/postHistory",
        data: newHistory
    })
        .then((response) => {
            console.log("/postHistory succeeded! Yay! 🍠")

            // Get history and re-render DOM
            getHistory()
            // Clear form after post
            clearForm(event)
        })
        .catch((error) => {
            console.error("There was an error on POST /postHistory", error)
            alert("POST /postHistory didn't work Barbie girl...")
        })
}

// Create a render function to display history on DOM
let renderHistory = (calcHistory) => {
    console.log("renderHistory(), incoming history:", calcHistory)

    // ! Rendering for resultHistory
    // Selector for id "resultHistory"
    // Loop over history
    // Append each history to resultHistory in a div
    // <div>history.num1 history.operator history.num2 = history.result<div>
    let resultHistory = document.getElementById("resultHistory")
    // console.log("resultHistory: ", resultHistory)

    resultHistory.innerHTML = ""

    for (let history of calcHistory) {
        // console.log("current history:", history)
        resultHistory.innerHTML += `
            <div>${history.num1} ${history.operator} ${history.num2} = ${history.result}</div>
        `
    }

    // ! Rendering for recentResult
    let recentResult = document.getElementById("recentResult")
    let lastHistory = calcHistory[calcHistory.length - 1]
    
    // Will only render last history if exists in the history array.
    if (lastHistory) {
        recentResult.innerHTML = `
        <div>${lastHistory.result}</div>
    `
    }

}

let clearForm = (event) => {
    event.preventDefault()
    //selectors for input fields
    document.getElementById("calcForm").reset()
    currentOperator = undefined
}