function sortAndDisplay() {
    document.getElementById("errorText").textContent = "";
    document.getElementById("outputText").textContent = "";

    let inputText = document.getElementById("inputBox").value;
    const validate = validateInputFormat(inputText);

    if (!validate.valid) {
        document.getElementById("errorText").textContent = "Please enter names in the format 'First Last'. No special characters apart from hyphen and apostrophe.";
        alert(`Input Error: \n${validate.errors.join("\n")}`)
        return;
    }

    let namesArray = inputText.split(", ");

    namesArray.sort(function(a, b) {
        // Assuming names are in the "first_name last_name" format
        let lastNameA = a.split(" ")[1];
        let lastNameB = b.split(" ")[1];
        return lastNameA.localeCompare(lastNameB);
    });

    let outputText = document.getElementById("outputText");
    outputText.textContent = namesArray.join(", ");

    //document.getElementById("inputBox").value = "";
}

function validateInputFormat(input) {
    // Check if names are in the format 'first_name last_name'
    let nameRegex = /^[a-zA-Zéèâîôüïçñ'-]+ [a-zA-Zéèâîôüïçñ'-]+$/;
    let namesArray = input.split(", ");
    let badNames = [];
    let good = true;

    for (let i = 0; i < namesArray.length; i++) {
        if (!nameRegex.test(namesArray[i])) {
            good = false;
            badNames.push(namesArray[i])
        }
    }
    return { "valid": good, "errors": badNames }
}

function copyToClipboard() {
    let outputText = document.getElementById("outputText");
    let textArea = document.createElement("textarea");
    textArea.value = outputText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    document.body.removeChild(textArea);
}