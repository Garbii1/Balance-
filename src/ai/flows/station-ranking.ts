// src/ai/flows/station-ranking.ts
'use server';

/**
 * @fileOverview Ranks repair stations based on car type and selected service.
 *
 * - rankStations - A function that ranks stations.
 * - RankStationsInput - The input type for the rankStations function.
 * - RankStationsOutput - The return type for the rankStations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankStationsInputSchema = z.object({
  carType: z.string().describe('The type of car (e.g., sedan, SUV, truck).'),
  service: z.string().describe('The selected repair service (e.g., oil change, tire replacement).'),
  stations: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the station.'),
      name: z.string().describe('The name of the station.'),
      services: z.array(z.string()).describe('The services offered by the station.'),
      carTypes: z.array(z.string()).describe('The car types serviced by the station.'),
    })
  ).describe('A list of repair stations to rank.'),
});
export type RankStationsInput = z.infer<typeof RankStationsInputSchema>;

const RankStationsOutputSchema = z.array(
  z.object({
    id: z.string().describe('The unique identifier of the station.'),
    name: z.string().describe('The name of the station.'),
    rank: z.number().describe('The ranking of the station (higher is better).'),
    reason: z.string().describe('The reason for the station ranking.'),
  })
);
export type RankStationsOutput = z.infer<typeof RankStationsOutputSchema>;

export async function rankStations(input: RankStationsInput): Promise<RankStationsOutput> {
  return rankStationsFlow(input);
}

const rankStationsPrompt = ai.definePrompt({
  name: 'rankStationsPrompt',
  input: {schema: RankStationsInputSchema},
  output: {schema: RankStationsOutputSchema},
  prompt: `You are an expert in matching car repair stations to customers based on their car type and service needs.

You are provided with a list of stations, each with its supported car types and services.

Rank the stations based on how well they match the customer's car type and service needs. Provide a reason for each ranking.

Car Type: {{{carType}}}
Service: {{{service}}}
Stations:{{#each stations}}\n  - Name: {{name}}, ID: {{id}}, Services: {{services}}, Car Types: {{carTypes}}{{/each}}

Output the ranked stations with a rank (higher is better) and a reason for the ranking.
Ensure that the output is a JSON array of objects.
`,
});

const rankStationsFlow = ai.defineFlow(
  {
    name: 'rankStationsFlow',
    inputSchema: RankStationsInputSchema,
    outputSchema: RankStationsOutputSchema,
  },
  async input => {
    const {output} = await rankStationsPrompt(input);
    return output!;
  }
);
