export async function getAudioUrl(text, voiceType = "A") {
  // voiceType => A (CN female 1), C (CN male), D (CN female 2)

  const introText = "哪一个是...";
  const BASE_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";
  const body = {
    input: {
      text: `${introText}${text}`,
    },
    voice: {
      languageCode: "cmm-CN",
      name: `cmn-CN-Standard-${voiceType}`,
      // ssmlGender: "FEMALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };
  try {
    const response = await fetch(
      `${BASE_URL}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    // Step 1: Extract 'audioContent' from JSON response
    const audioBase64 = json.audioContent;
    // Step 2: Decode Base64 string to binary data
    const binaryString = atob(audioBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    // Step 3: Create a Blob from the binary data
    const audioBlob = new Blob([bytes], { type: "audio/mpeg" });
    // Step 4: Create a URL for the Blob and use it
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log(audioUrl);
    // setSrc(audioUrl);
    return audioUrl;
  } catch (error) {
    console.error(error.message);
  }
}
