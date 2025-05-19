// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending repair services based on a description of the car's issue.
 *
 * - recommendServices - A function that recommends repair services based on a description of the car's issue.
 * - RecommendServicesInput - The input type for the recommendServices function.
 * - RecommendServicesOutput - The return type for the recommendServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendServicesInputSchema = z.object({
  carType: z.string().describe('The type of car (e.g., sedan, SUV, truck).'),
  issueDescription: z.string().describe('A description of the car issue.'),
});

export type RecommendServicesInput = z.infer<typeof RecommendServicesInputSchema>;

const RecommendServicesOutputSchema = z.object({
  recommendedServices: z
    .array(z.string())
    .describe('A list of recommended repair services based on the issue description.'),
});

export type RecommendServicesOutput = z.infer<typeof RecommendServicesOutputSchema>;

export async function recommendServices(input: RecommendServicesInput): Promise<RecommendServicesOutput> {
  return recommendServicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendServicesPrompt',
  input: {schema: RecommendServicesInputSchema},
  output: {schema: RecommendServicesOutputSchema},
  prompt: `You are an expert automotive technician. Based on the car type and the description of the issue, recommend a list of repair services that the user might need.

Car Type: {{{carType}}}
Issue Description: {{{issueDescription}}}

Consider common issues for the car type provided.

Return a JSON array of strings. Do not provide any explanation, only the array.

Example:
["Oil Change", "Tire Rotation"]
`,
});

const recommendServicesFlow = ai.defineFlow(
  {
    name: 'recommendServicesFlow',
    inputSchema: RecommendServicesInputSchema,
    outputSchema: RecommendServicesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
