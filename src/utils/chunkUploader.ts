export async function uploadFileInChunks(
  file: File,
  folder: string,
  chunkSizeKB: number = 128,
): Promise<string> {
  let url = "";
  const chunkSize = chunkSizeKB * 1024;
  const totalChunks = Math.ceil(file.size / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("file", chunk, file.name);
    formData.append("dzchunkindex", i.toString());
    formData.append("dztotalchunkcount", totalChunks.toString());

    let res: Response;
    try {
      res = await fetch(
        "https://onpremise-fileuploader.cloudmateria.com/api/bcloud/fileuploader/upload_chunk",
        { method: "POST", body: formData },
      );
    } catch (err) {
      throw new Error(`Network error at chunk ${i + 1}/${totalChunks}: ${err}`);
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Chunk upload failed at ${i + 1}/${totalChunks}: ${text}`,
      );
    }

    try {
      const data = await res.json();
      url = data.url;
    } catch (err) {
      throw new Error(
        `Invalid JSON from server at chunk ${i + 1}/${totalChunks}: ${err}`,
      );
    }
  }
  return url;
}
