export async function fetchHtml (filePath: string): Promise<HTMLDivElement> {

    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load template: ${filePath}`);
    
    const htmlText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;

    return tempDiv
}

