export async function GET(request) {
    try {
        const folderName = "country";
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

        return Response.json({ imageUrls});
    }
        catch(error){
            response.status(500).json({ error: "INTERNAL SERVER ERROR"})
        }
}