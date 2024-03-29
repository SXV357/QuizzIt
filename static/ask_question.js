document.addEventListener("DOMContentLoaded", function() {
    var get_response_button = document.querySelector("#getResponseButton") // on the ask questions page
    var fileType = document.getElementById("askQuestionFileSelect");
    var inputField = document.getElementById("questionInput");
    var responseField = document.querySelector(".askQuestionResponse");
    var home = document.querySelector(".toHomePage");

    home.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";
    })

    get_response_button.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedFile = Array.from(fileType.options).filter(option => option.selected).map(option => option.value)[0];
        if (selectedFile === undefined) {
            responseField.innerHTML = "You need to select a file!";
            return;
        } else if (inputField.value === "") {
            responseField.innerHTML = "Make sure you enter a valid query!";
            return;
        }
        responseField.innerHTML = "Waiting on a response..."
        fetch (`http://127.0.0.1:5000/get_model_response?query=${inputField.value}&file=${selectedFile}`, {
            method: "GET"
        }).then((res) => res.json())
        .then((data) => {
            console.log(data["response"]);
            responseField.innerHTML = data["response"];
        })
    })
})