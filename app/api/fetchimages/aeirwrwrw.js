export default async function handler(req, res) {
    try {
        const folderName = "rock";
        const response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=${folderName}`);
        const data = await response.json();

        const imageUrls = data.map(fileId => {
            console.log("File ID:", fileId); // Log each fileId to verify its value
            // Check if fileId is a valid string
            if (typeof fileId === 'string' && fileId.trim() !== '') {
                return `https://drive.google.com/uc?export=view&id=${fileId.trim()}`;
            } else {
                console.error("Invalid file ID:", fileId);
                return null; // Or handle the error appropriately
            }
        });

        console.log(imageUrls);
        res.json(imageUrls); // Sending imageUrls as JSON response
    } catch (error) {
        console.error("Error fetching image URLs:", error);
        if (res) {
            res.status(500).json({ error: "Internal Server Error" }); // Send error response if res exists
        } else {
            console.error("Response object (res) is undefined");
        }
    }
}
