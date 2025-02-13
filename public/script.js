function mostrarModelo(modelPath) {
    const modelView = document.getElementById("model-view");
    const model3D = document.getElementById("model-3d");

    model3D.setAttribute("gltf-model", modelPath);
    modelView.style.display = "block";
}

function cerrarModelo() {
    document.getElementById("model-view").style.display = "none";
    document.getElementById("model-3d").setAttribute("gltf-model", "");
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
});
