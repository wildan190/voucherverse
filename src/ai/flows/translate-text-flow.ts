
'use server';
/**
 * @fileOverview A Genkit flow for translating text.
 *
 * - translateText - A function that translates text to a target language.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  textToTranslate: z.string().describe('The text to be translated.'),
  targetLanguageCode: z.string().describe('The target language code (e.g., "id" for Indonesian, "en" for English).'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

// Exported wrapper function
export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `Translate the following text into the language specified by the target language code '{{targetLanguageCode}}'.
Text to translate: "{{textToTranslate}}"
Return ONLY the translated text. Do not include any introductory phrases or explanations.`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    const {output} = await translatePrompt(input);
    if (!output) {
        // This case should ideally not happen if the prompt is defined with an output schema
        // and the model successfully adheres to it.
        // However, as a fallback, if output is null/undefined:
        console.error('Translation failed: No output from model for input:', input);
        // Fallback to returning the original text if translation fails critically
        return { translatedText: input.textToTranslate };
    }
    return output;
  }
);
