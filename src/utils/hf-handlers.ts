import hf from "@/config/huggingFace";
import { convertAudioToBlob, convertImageToBlob } from "./utils";

// image category
export const generateImage = async (input: string, negativeInput: string) => {
  try {
    const output = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: input,
      parameters: {
        negative_prompt: negativeInput,
      },
    });

    return output;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const refineImage = async (prompt: string, imageFile: File) => {
  try {
    if (!imageFile) return;

    const imageBlob = await convertImageToBlob(imageFile);

    const output = await hf.imageToImage({
      inputs: imageBlob,
      parameters: {
        prompt: prompt,
      },
      model: "stabilityai/stable-diffusion-xl-refiner-1.0",
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const detectImage = async (imageFile: File) => {
  try {
    if (!imageFile) return;

    const imageBlob = await convertImageToBlob(imageFile);

    const output = await hf.objectDetection({
      data: imageBlob,
      model: "facebook/detr-resnet-50",
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const answerQuestion = async (question: string, imageFile: File) => {
  try {
    if (!imageFile) return;

    const imageBlob = await convertImageToBlob(imageFile);

    const output = await hf.visualQuestionAnswering({
      model: "dandelin/vilt-b32-finetuned-vqa",
      inputs: {
        question: question,
        image: imageBlob,
      },
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const imageClassification = async (imageFile: File) => {
  try {
    if (!imageFile) return;

    const imageBlob = await convertImageToBlob(imageFile);

    const output = await hf.imageClassification({
      model: "microsoft/resnet-101",
      data: imageBlob,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const imageSegmentation = async (imageFile: File) => {
  try {
    if (!imageFile) return;

    const imageBlob = await convertImageToBlob(imageFile);

    const output = await hf.imageSegmentation({
      model: "facebook/maskformer-swin-tiny-coco",
      data: imageBlob,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const imageToText = async (imageFile: File) => {
  try {
    if (!imageFile) return;

    const imageBlob = await convertImageToBlob(imageFile);

    const output = await hf.imageToText({
      model: "nlpconnect/vit-gpt2-image-captioning",
      data: imageBlob,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

// audio category
export const transcribeAudio = async (audioFile: File) => {
  try {
    if (!audioFile) return;

    const audioBlob = await convertAudioToBlob(audioFile);

    const output = await hf.automaticSpeechRecognition({
      model: "openai/whisper-large-v3",
      data: audioBlob,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const refineAudio = async (audioFile: File) => {
  if (!audioFile) return;

  const output = await hf.audioToAudio({
    model: "speechbrain/mtl-mimic-voicebank",
    data: audioFile,
  });

  return output;
};

export const generateAudio = async (text: string) => {
  try {
    if (!text) return;

    const output = await hf.textToSpeech({
      model: "facebook/mms-tts-eng",
      inputs: text,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const audioClassification = async (audioFile: File) => {
  try {
    if (!audioFile) return;

    const audioBlob = await convertAudioToBlob(audioFile);

    const output = await hf.audioClassification({
      model: "facebook/wav2vec2-base-960h",
      data: audioBlob,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const documentQuestionAnswering = async (
  question: string,
  documentFile: File,
) => {
  try {
    if (!documentFile) return;

    const output = await hf.documentQuestionAnswering({
      model: "mrm8488/t5-base-finetuned-squadv1",
      inputs: {
        question: question,
        image: documentFile,
      },
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const featureExtraction = async (input: string) => {
  try {
    if (!input) return;

    const output = await hf.featureExtraction({
      model: "facebook/deit-base-distilled-patch16-224",
      inputs: input,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const fillMask = async (input: string) => {
  try {
    if (!input) return;

    const output = await hf.fillMask({
      model: "bert-base-uncased",
      inputs: input,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const sentenceSimilarity = async (input: string) => {
  try {
    if (!input) return;

    const output = await hf.sentenceSimilarity({
      model: "facebook/bart-large-mnli",
      inputs: { sentence: input },
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const summarization = async (input: string) => {
  try {
    if (!input) return;

    const output = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: input,
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const questionAnswering = async (question: string, context: string) => {
  try {
    if (!question || !context) return;

    const output = await hf.questionAnswering({
      model: "mrm8488/t5-base-finetuned-squadv1",
      inputs: {
        question: question,
        context: context,
      },
    });

    return output;
  } catch (error) {
    console.error(error);
  }
  return null;
};
