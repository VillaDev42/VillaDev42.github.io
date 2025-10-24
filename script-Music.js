const btn = document.getElementById("downloadBtn");
const urlInput = document.getElementById("urlInput");
const statusLabel = document.getElementById("status");

// Cambia esta URL por la de tu API expuesta con ngrok
const apiBaseUrl = "https://8b6cfc1a3b20.ngrok-free.app";

btn.addEventListener("click", async () => {
    const youtubeUrl = urlInput.value.trim();
    if (!youtubeUrl) {
        alert("Ingresa un link de YouTube");
        return;
    }

    statusLabel.textContent = "Descargando...";

    try {
        // Llamada POST a la API
        const response = await fetch(`${apiBaseUrl}/api/download/mp3`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: youtubeUrl })
        });

        if (!response.ok) throw new Error("Error al descargar el archivo");

        // Obtener el archivo como blob
        const blob = await response.blob();

        // Obtener el nombre real del archivo desde los headers
        const disposition = response.headers.get("Content-Disposition");
        let fileName = "cancion.mp3"; // fallback por si no viene el header

        if (disposition && disposition.includes("filename=")) {
            fileName = disposition.split("filename=")[1].replace(/"/g, "");
        }

        // Crear link temporal para descargar
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        statusLabel.textContent = "¡Descarga completa!";
    } catch (err) {
        statusLabel.textContent = "Error: " + err.message;
    }
});


